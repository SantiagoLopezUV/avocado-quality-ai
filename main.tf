# main.tf
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.4"
    }
  }
}

provider "local" {}

# Simulamos la creación de un servidor creando un recurso local
resource "local_file" "servidor_agro_data_simulado" {
  content  = "=== SERVIDOR AGRO DATA ACTIVO ===\nModelo: YOLOv8 Calidad de Aguacates\nEstado: Desplegado vía Terraform y GitLab CI/CD\n==================================="
  filename = "/tmp/estado_servidor.txt"
}