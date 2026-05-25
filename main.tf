# ======================================================
# Infraestructura Azure — Avocado Quality AI
# Terraform ~> azurerm 3.x
# ======================================================
# Recursos gestionados:
#   - Log Analytics Workspace
#   - Container Apps Environment
#   - Container App: avocado-backend  (puerto 8000)
#   - Container App: avocado-frontend (puerto 80)
#
# Recursos pre-existentes referenciados via variables:
#   - Azure PostgreSQL (avocadoquality.postgres.database.azure.com)
#   - Azure Storage Account (agrodatavalle2026)
#
# El backend de estado (azurerm) se configura en el pipeline
# via terraform init -backend-config="..."
# ======================================================

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }

  # Backend vacío: configurado por el pipeline con -backend-config
  backend "azurerm" {}
}

provider "azurerm" {
  features {}
}

# ──────────────────────────────────────────────────────
# Variables
# ──────────────────────────────────────────────────────

variable "resource_group_name" {
  description = "Nombre del resource group en Azure"
  type        = string
  default     = "avocado-quality-rg"
}

variable "location" {
  description = "Región de Azure"
  type        = string
  default     = "East US"
}

variable "dockerhub_username" {
  description = "Usuario de Docker Hub"
  type        = string
}

variable "database_url" {
  description = "Cadena de conexión PostgreSQL de Azure"
  type        = string
  sensitive   = true
}

variable "secret_key" {
  description = "Clave secreta JWT del backend"
  type        = string
  sensitive   = true
}

variable "azure_storage_connection_string" {
  description = "Connection string de Azure Blob Storage"
  type        = string
  sensitive   = true
}

variable "allowed_origins" {
  description = "CORS origins permitidos (JSON array como string)"
  type        = string
  default     = "[\"http://localhost:5173\"]"
}

# ──────────────────────────────────────────────────────
# Resource Group (pre-existente)
# ──────────────────────────────────────────────────────

data "azurerm_resource_group" "rg" {
  name = var.resource_group_name
}

# ──────────────────────────────────────────────────────
# Log Analytics Workspace (requerido por Container Apps)
# ──────────────────────────────────────────────────────

resource "azurerm_log_analytics_workspace" "law" {
  name                = "avocado-quality-law"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

# ──────────────────────────────────────────────────────
# Container Apps Environment
# ──────────────────────────────────────────────────────

resource "azurerm_container_app_environment" "env" {
  name                       = "avocado-quality-env"
  location                   = data.azurerm_resource_group.rg.location
  resource_group_name        = data.azurerm_resource_group.rg.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.law.id
}

# ──────────────────────────────────────────────────────
# Backend — Container App
# ──────────────────────────────────────────────────────

resource "azurerm_container_app" "backend" {
  name                         = "avocado-backend"
  container_app_environment_id = azurerm_container_app_environment.env.id
  resource_group_name          = data.azurerm_resource_group.rg.name
  revision_mode                = "Single"

  # Secretos referenciados en las variables de entorno
  secret {
    name  = "db-url"
    value = var.database_url
  }
  secret {
    name  = "app-secret-key"
    value = var.secret_key
  }
  secret {
    name  = "storage-conn-str"
    value = var.azure_storage_connection_string
  }

  template {
    min_replicas = 1
    max_replicas = 3

    container {
      name   = "backend"
      image  = "${var.dockerhub_username}/avocado-quality-ai:backend"
      cpu    = 0.5
      memory = "1Gi"

      env {
        name        = "DATABASE_URL"
        secret_name = "db-url"
      }
      env {
        name        = "SECRET_KEY"
        secret_name = "app-secret-key"
      }
      env {
        name        = "AZURE_STORAGE_CONNECTION_STRING"
        secret_name = "storage-conn-str"
      }
      env {
        name  = "AZURE_STORAGE_CONTAINER"
        value = "uploads"
      }
      env {
        name  = "ALLOWED_ORIGINS"
        value = var.allowed_origins
      }
    }
  }

  ingress {
    allow_insecure_connections = false
    external_enabled           = true
    target_port                = 8000

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }
}

# ──────────────────────────────────────────────────────
# Frontend — Container App
# ──────────────────────────────────────────────────────

resource "azurerm_container_app" "frontend" {
  name                         = "avocado-frontend"
  container_app_environment_id = azurerm_container_app_environment.env.id
  resource_group_name          = data.azurerm_resource_group.rg.name
  revision_mode                = "Single"

  template {
    min_replicas = 1
    max_replicas = 2

    container {
      name   = "frontend"
      image  = "${var.dockerhub_username}/avocado-quality-ai:frontend-v2"
      cpu    = 0.25
      memory = "0.5Gi"
    }
  }

  ingress {
    allow_insecure_connections = false
    external_enabled           = true
    target_port                = 80

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }
}

# ──────────────────────────────────────────────────────
# Outputs
# ──────────────────────────────────────────────────────

output "backend_url" {
  description = "URL pública del backend (usar como VITE_API_URL)"
  value       = "https://${azurerm_container_app.backend.ingress[0].fqdn}"
}

output "frontend_url" {
  description = "URL pública del frontend"
  value       = "https://${azurerm_container_app.frontend.ingress[0].fqdn}"
}
