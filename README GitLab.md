# Agro Data - Infraestructura y Despliegue Automatizado (IaC)

Este repositorio contiene la configuración de Infraestructura como Código (IaC) y los pipelines de Integración y Despliegue Continuo (CI/CD) para el proyecto **Agro Data** (Plataforma de detección de calidad de aguacates mediante el modelo YOLOv8).


## Requisitos del Entorno

Para interactuar con este proyecto y su automatización, se requiere la siguiente configuración:

1. Cuenta en GitLab: Con acceso a este repositorio y GitLab CI/CD habilitado (utilizando \*Shared Runners\*).

2. Git instalado:  En su máquina local para el control de versiones.

3. Llaves SSH configuradas: Para garantizar una comunicación y sincronización segura entre el entorno local y el repositorio remoto en GitLab.

4. Terraform (Opcional localmente): No es estrictamente necesario instalar Terraform en su máquina para el despliegue, ya que la arquitectura orquesta su ejecución automáticamente a través de los contenedores Docker en GitLab Runners.

## Cómo ejecutar el pipeline

Este proyecto está construido bajo la metodología **GitOps**, lo que significa que el repositorio es la única fuente de verdad. 
El pipeline de CI/CD está diseñado para ejecutarse de forma automática, sin requerir intervención manual para disparar las pruebas o el despliegue.

### Pasos para la ejecución:

1. Clonar el repositorio:

```bash
git clone git@gitlab.com:<su\_usuario>/avocado-quality-ai.git
cd avocado-quality-ai
```

2. Realizar cualquier actualización en el código fuente del modelo de IA o en el archivo de infraestructura (main.tf)

3. Registrar los cambios y subirlos a la rama 
```bash
git add .
git commit -m "Descripción del cambio realizado"
git push origin main
```

4. Después del push, navegar a Build > Pipelines en GitLab. Ver cómo se dispara automáticamente el flujo de trabajo definido en .gitlab-ci.yml

#### Etapas del Pipeline:

- test: Valida la integridad de la aplicación y pasa las pruebas del modelo YOLOv8 de aguacates.

- deploy_infrastructure: Inicia un contenedor Docker efímero con la imagen hashicorp/terraform:light para aprovisionar el entorno

## Cómo desplegar la infraestructura

La infraestructura de Agro Data está definida de manera puramente declarativa en el archivo main.tf.

Actualmente, para fines de pruebas y optimización de recursos académicos, el proyecto emplea una estrategia de Mocking (Simulacro) de infraestructura.

Utilizamos el provider local de Terraform para desplegar un entorno agnóstico. Esto permite probar el flujo completo de automatización DevOps con la capacidad de migrar a AWS EC2 en el futuro modificando únicamente el bloque del proveedor, sin alterar el Pipeline.

Proceso de despliegue automatizado (ejecutado por el Runner):

***terraform init:*** Inicializa el backend de Terraform y descarga los plugins de los proveedores requeridos.

***terraform plan:*** Genera un plan de ejecución, comparando el estado actual (terraform.tfstate) con el estado deseado.

***terraform apply -auto-approve:*** Aprovisiona la infraestructura. En la configuración actual, despliega el servidor materializándolo en la ruta /tmp/estado_servidor.txt.


### Verificación:
Para comprobar que la infraestructura se desplegó correctamente, se revisan los logs del Job deploy_com_terraform en GitLab. Al final de la ejecución, el sistema imprimirá el estado en vivo del servidor recién aprovisionado.

