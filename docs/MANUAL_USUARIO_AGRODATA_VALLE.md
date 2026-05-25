# MANUAL DE USUARIO
# AgroData Valle — Avocado Quality AI

---

## INFORMACIÓN DEL DOCUMENTO

| Campo | Detalle |
|---|---|
| **Nombre del sistema** | AgroData Valle — Avocado Quality AI |
| **Versión** | 1.0 |
| **Fecha** | Mayo 2026 |
| **Público objetivo** | Agricultores de aguacate del Valle del Cauca |
| **Tipo de documento** | Manual de Usuario Final |

---

---

# 1. PORTADA

**AgroData Valle**
**Plataforma de Inteligencia Artificial para Productores de Aguacate**

*"Tecnología pa' tu aguacatal"*

Desarrollado como proyecto académico para empoderar a los pequeños y medianos productores de aguacate del Valle del Cauca, Colombia. La plataforma combina Visión Artificial (YOLOv8 + CNN) con un marketplace digital para facilitar la comercialización justa y objetiva del aguacate Hass.

**Universidad del Valle — Facultad de Ingeniería**
**Programa de Ingeniería de Sistemas**
**2026**

---

---

# 2. INTRODUCCIÓN

## 2.1 ¿Qué es AgroData Valle?

AgroData Valle es una aplicación web diseñada específicamente para los agricultores de aguacate del Valle del Cauca. La plataforma utiliza Inteligencia Artificial para analizar imágenes de aguacates y determinar automáticamente:

- El **nivel de madurez** del fruto (Verde, Pintón, Maduro, Pasado)
- La **presencia de roña** u otras afectaciones (sano o con manchas)
- El **precio justo sugerido** por kilogramo según el mercado actual
- El **destino de mercado** recomendado (exportación, supermercado, plaza local, etc.)

Adicionalmente, la plataforma incluye **"Mi Plaza"** (La Plazita), un mercado digital donde los agricultores pueden publicar y vender sus lotes de aguacate directamente a compradores, eliminando intermediarios y sus criterios subjetivos de calidad.

## 2.2 ¿Por qué existe esta plataforma?

Los agricultores locales enfrentan pérdidas económicas importantes debido a criterios de calidad **subjetivos** por parte de intermediarios al momento de comprar la cosecha. AgroData Valle actúa como un **auditor imparcial** que:

1. Analiza imágenes en tiempo real con IA.
2. Identifica niveles de afectación por roña de manera objetiva.
3. Genera evidencia técnica para negociaciones más justas.
4. Conecta directamente a productores con compradores.

## 2.3 ¿A quién va dirigido?

- Pequeños y medianos productores de aguacate del Valle del Cauca.
- Compradores e intermediarios que deseen verificar la calidad del fruto.
- Técnicos agrícolas que acompañen procesos de evaluación de cosecha.

## 2.4 ¿Cuánto cuesta?

**La aplicación es completamente gratuita** para todos los agricultores del Valle del Cauca. No se cobra ninguna comisión por publicar ni vender en La Plazita.

---

---

# 3. REQUISITOS DEL SISTEMA

## 3.1 Dispositivos compatibles

| Tipo de dispositivo | Compatible |
|---|---|
| Computador de escritorio (Windows, Mac, Linux) | ✅ Sí |
| Portátil / Laptop | ✅ Sí |
| Tablet Android / iPad | ✅ Sí |
| Teléfono inteligente (Android / iOS) | ✅ Sí |

> La aplicación es **responsiva** (se adapta a cualquier tamaño de pantalla).

## 3.2 Navegadores web compatibles

| Navegador | Versión mínima recomendada |
|---|---|
| Google Chrome | 90 o superior |
| Mozilla Firefox | 88 o superior |
| Microsoft Edge | 90 o superior |
| Safari (Mac / iOS) | 14 o superior |
| Opera | 76 o superior |

> **Recomendado:** Google Chrome actualizado para la mejor experiencia.

## 3.3 Conexión a internet

- Se requiere conexión a internet para usar todas las funciones.
- Una **señal celular normal (3G/4G)** es suficiente.
- No se requiere conexión de alta velocidad.

## 3.4 Requisitos para el análisis de imágenes

- Cámara del teléfono o computador (para capturar fotos).
- Imágenes en formato: **JPG, JPEG, PNG, WEBP**.
- Tamaño máximo por imagen: **5 MB**.
- La foto debe mostrar claramente el aguacate (buena iluminación, foco nítido).

## 3.5 Si se desea instalar localmente (administradores técnicos)

Para desarrolladores o administradores que deseen ejecutar la plataforma en su propio servidor:

| Componente | Requisito |
|---|---|
| Python | 3.12 o superior |
| Node.js | 20 o superior |
| Docker Desktop | Última versión |
| RAM mínima | 4 GB |
| Espacio en disco | 10 GB libres |
| Sistema operativo | Windows (WSL2), macOS, Ubuntu 22.04+ |

---

---

# 4. INSTALACIÓN

## 4.1 Acceso como usuario final (sin instalación)

La aplicación está desplegada en la nube de Azure y **no requiere ninguna instalación**. Solo necesita abrir su navegador web e ingresar a la dirección de la aplicación.

Pasos para acceder:
1. Abrir su navegador web (Chrome, Firefox, Edge, etc.).
2. Escribir la dirección web del sistema en la barra de direcciones.
3. Presionar Enter.
4. La página de inicio de sesión aparecerá automáticamente.

## 4.2 Instalación local con Docker (para administradores)

Si necesita correr el sistema en su propio equipo:

### Paso 1 — Clonar el repositorio

```
git clone <url-del-repositorio>
cd avocado-quality-ai
```

### Paso 2 — Crear el archivo de configuración

Copiar el archivo de ejemplo `.env` y completar con los datos reales:

```
cp .env.example .env
```

Variables requeridas en `.env`:
```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/avocado_quality_ai
SECRET_KEY=su_clave_secreta_aqui
```

### Paso 3 — Levantar los servicios con Docker

```
docker compose up -d --build
```

Este comando inicia automáticamente:
- **Backend (FastAPI)** en el puerto 8000
- **Frontend (React)** en el puerto 5173
- **Base de datos (PostgreSQL)** en el puerto 5432

### Paso 4 — Verificar que funciona

Abrir en el navegador: `http://localhost:5173`

### Comandos útiles de administración

| Comando | Descripción |
|---|---|
| `docker compose up -d --build` | Iniciar todos los servicios |
| `docker compose down` | Detener todos los servicios |
| `docker ps` | Ver contenedores activos |
| `docker logs -f agrodata-api` | Ver registros del backend |
| `docker logs -f agrodata-web` | Ver registros del frontend |

---

---

# 5. INICIO DE SESIÓN

## 5.1 Página principal

Al ingresar a la aplicación, se muestra la pantalla de bienvenida con:
- El logo de AgroData Valle.
- Un mensaje motivador: *"Súmele a su Cultivo con Inteligencia Artificial"*.
- El formulario de inicio de sesión / registro.
- Navegación a: **Diagnóstico**, **Mi Plaza**, **Ayuda**.

## 5.2 Iniciar sesión (cuenta existente)

1. En la pantalla principal, asegurarse de que la pestaña **"Entrar"** esté seleccionada.
2. Escribir el **correo electrónico** registrado.
3. Escribir la **contraseña**.
4. Hacer clic en **"Entrar al Sistema"**.
5. Si los datos son correctos, el sistema redirige automáticamente al **Diagnóstico**.

> **Ojo:** Si el correo o contraseña son incorrectos, aparece el mensaje: *"Error al iniciar sesión"*. Verifique sus datos e intente de nuevo.

## 5.3 Crear una cuenta nueva (Registro)

1. En la pantalla principal, hacer clic en la pestaña **"Registrarse"**.
2. Completar el formulario con los siguientes datos:

| Campo | Descripción | Obligatorio |
|---|---|---|
| Documento de Identidad | Número de cédula (6-10 dígitos) | Sí |
| Nombre Completo | Nombre y apellidos (3-100 caracteres) | Sí |
| Correo Electrónico | Su correo personal o laboral | Sí |
| Teléfono/Celular | Número de 10 dígitos | Sí |
| Ubicación (Municipio) | Seleccionar su municipio del Valle del Cauca | Sí |
| Contraseña | Mínimo 8 caracteres | Sí |

3. Opcionalmente, marcar la casilla **"Registrarme como Agricultor Certificado"** para acceder a todas las funciones de diagnóstico IA y marketplace.
4. Hacer clic en **"Crear Mi Cuenta"**.
5. Al registrarse exitosamente aparece el mensaje: *"¡Cuenta creada con éxito! Ya puede iniciar sesión"*.
6. Ingresar con el correo y contraseña recién creados.

### Municipios disponibles para registro
Cali, Palmira, Tuluá, Buga, Cartago, Buenaventura, Jamundí, Yumbo, Candelaria, Pradera, Florida, Sevilla, Caicedonia, Ginebra, El Cerrito, Otro municipio del Valle.

## 5.4 Recuperar contraseña olvidada

1. En la pantalla de inicio de sesión, hacer clic en **"¿Olvidó su clave?"**.
2. Escribir el **correo electrónico** con el que se registró.
3. Hacer clic en **"Enviar Código de Recuperación"**.
4. El sistema genera un **token de recuperación** (en producción se envía al correo; en modo demo se muestra en pantalla).
5. Copiar el token haciendo clic en **"Copiar Token"**.
6. Hacer clic en **"Continuar al Restablecimiento"**.
7. En la página de restablecimiento, pegar el token y crear la nueva contraseña.

> **Importante:** El token expira en **5 minutos**. Si expira, repetir el proceso.

## 5.5 Cerrar sesión

Desde cualquier página del sistema:
1. Hacer clic en el botón **"🚪 Salir"** (esquina superior derecha).
2. Aparece un modal de confirmación: *"¿Está seguro que desea salir?"*
3. Confirmar haciendo clic en **"Sí, salir"**.

---

---

# 6. DESCRIPCIÓN DE FUNCIONALIDADES

## 6.1 Diagnóstico IA — "Revise Su Cosecha"

**Ruta:** `/dashboard` | **Acceso:** Público y usuarios registrados

### ¿Qué hace?
Permite subir una foto de un aguacate para obtener un análisis automático de calidad usando dos modelos de Inteligencia Artificial:
- **Modelo de detección de roña**: Identifica manchas y afectaciones en la cáscara.
- **Modelo de madurez**: Clasifica el nivel de madurez del fruto.

### Información que entrega el análisis

| Dato | Descripción |
|---|---|
| **Estado de Salud** | Porcentaje de salud y clasificación: "Sano y Limpio" o "Afectado (Con Roña)" |
| **Enfermedades** | Número de manchas detectadas o "Ninguna detectada" |
| **Madurez** | Verde / Pintón / Maduro / Pasado |
| **Panel de Confianza** | Porcentaje de certeza del modelo de roña y del modelo de madurez |
| **Precio Sugerido** | Precio por kilogramo en COP, calculado automáticamente |
| **Precio Base del Mercado** | Precio de referencia del mercado en ese momento |
| **Destino de Mercado** | Recomendación de a qué mercado dirigir el producto |
| **Recomendación** | Texto con consejo personalizado según el resultado |

### Imagen anotada
Después del análisis, la imagen mostrada incluye los **bounding boxes** (recuadros) que marcan exactamente dónde detectó la IA las manchas o afectaciones.

### Acciones disponibles tras el análisis
- **Compartir por WhatsApp**: Envía el resultado completo por mensaje de WhatsApp al número registrado en el perfil.
- **Copiar al portapapeles**: Copia el resumen en texto para pegarlo en cualquier otra aplicación.
- **Publicar en Mi Plaza**: (Requiere sesión iniciada) Permite publicar el lote analizado directamente en el marketplace.
- **Guardar en Lote**: (Requiere sesión iniciada) Asigna el análisis a un lote existente o crea uno nuevo.
- **Cerrar diagnóstico**: Limpia la pantalla para hacer un nuevo análisis.

---

## 6.2 Mis Lotes — Gestión de cosechas

**Ruta:** `/batches` | **Acceso:** Solo usuarios registrados

### ¿Qué hace?
Permite organizar y gestionar los análisis de aguacates en **lotes** (grupos), para llevar un control ordenado de la cosecha y facilitar su publicación masiva en el marketplace.

### Funciones disponibles

#### Ver lista de lotes
- Muestra todos los lotes creados por el usuario.
- Cada lote muestra: nombre, fecha de creación, número de análisis incluidos.

#### Crear un lote nuevo
1. Hacer clic en **"+ Nuevo Lote"**.
2. Escribir el nombre del lote (Ej: "Cosecha Mayo 2026", "Parcela Norte").
3. Confirmar con Enter o haciendo clic en el botón de crear.

#### Ver detalle de un lote
1. Hacer clic sobre cualquier lote en la lista.
2. Se muestra la vista detallada con todos los análisis incluidos.
3. Cada análisis muestra:
   - Imagen del aguacate analizado (con click para ampliar).
   - Nivel de madurez (Verde / Maduro / Sobremaduro) con etiqueta de color.
   - Nivel de daño (Sin daños / Daño leve / Moderado / Severo) con etiqueta de color.
   - Fecha y hora del análisis (hora Colombia, UTC-5).

#### Eliminar un análisis individual del lote
1. En la vista detalle, hacer clic en el botón de eliminar del análisis.
2. Confirmar la eliminación en el modal que aparece.

#### Publicar un lote en Mi Plaza
1. En la vista detalle del lote, hacer clic en **"Publicar en Mi Plaza"**.
2. El sistema selecciona automáticamente el análisis de mejor calidad del lote para usar como referencia.
3. Completar el formulario de publicación: título, cantidad en kg, precio por kg, descripción.
4. Confirmar la publicación.

#### Eliminar un lote completo
1. Hacer clic en el ícono de eliminar del lote en la lista.
2. Confirmar en el modal de confirmación.
3. **Advertencia:** Esta acción es irreversible. Se eliminan el lote y todos sus análisis asociados.

---

## 6.3 Mi Plaza — Marketplace de Aguacates ("La Plazita")

**Ruta:** `/marketplace` | **Acceso:** Público para ver; registrado para publicar

### ¿Qué hace?
Es el mercado digital donde los agricultores publican sus lotes de aguacate para que compradores los encuentren y contacten directamente.

### Funciones disponibles

#### Ver publicaciones
- Muestra todos los lotes activos publicados por agricultores del Valle del Cauca.
- Cada publicación muestra:
  - Título del lote.
  - Nombre del agricultor y municipio.
  - Cantidad disponible en kg.
  - Precio por kg en COP.
  - Puntuación de calidad IA (porcentaje).
  - Nivel de madurez.
  - Estado de salud (daños).
  - Calificación de compradores (estrellas de 1 a 5).
  - Teléfono de contacto.

#### Filtrar publicaciones
Se puede filtrar la lista por:
- **Todos**: muestra todas las publicaciones.
- **Sanos**: solo aguacates sin daños detectados por IA.
- **Con Roña**: solo aguacates con algún nivel de afectación.
- **Maduros**: solo aguacates en estado maduro.

#### Ver detalle de una publicación
1. Hacer clic sobre cualquier tarjeta de publicación.
2. Se abre un panel lateral con información completa:
   - Todos los datos del lote.
   - Imágenes del análisis IA con los bounding boxes.
   - Resultados técnicos del análisis (confianza, detecciones, etc.).
   - Datos de contacto del agricultor (teléfono).

#### Ampliar imágenes
- Hacer clic sobre cualquier imagen en el detalle de publicación para verla en pantalla completa.
- Hacer clic fuera de la imagen o en la "X" para cerrar la vista ampliada.

#### Calificar una publicación (sistema de estrellas)
1. Abrir el detalle de una publicación.
2. Hacer clic en el número de estrellas deseado (1 a 5 estrellas).
3. La calificación se guarda automáticamente.
4. Si ya calificó antes, puede actualizar su calificación haciendo clic en otra estrella.

#### Publicar su propio lote (usuarios registrados)
**Opción A — Desde el Diagnóstico:**
1. Realizar un análisis de imagen en el Dashboard.
2. Al obtener los resultados, hacer clic en **"🛒 Publicar en Mi Plaza"**.
3. Completar el formulario con título, cantidad (kg), precio/kg y descripción opcional.
4. Confirmar con **"✅ Confirmar y Publicar"**.

**Opción B — Desde Mis Lotes:**
1. Ir a Mis Lotes y abrir el lote que desea publicar.
2. Hacer clic en **"Publicar en Mi Plaza"**.
3. Completar y confirmar el formulario.

**Opción C — Desde Mi Plaza (publicar lote existente):**
1. En la página de Mi Plaza, hacer clic en **"+ Publicar Lote"**.
2. Seleccionar el lote de la lista de sus lotes.
3. Completar el formulario y publicar.

#### Eliminar su publicación (usuarios registrados)
1. En la vista de Mi Plaza, las publicaciones propias muestran un botón de eliminar.
2. Confirmar la eliminación.

---

## 6.4 Mi Perfil

**Ruta:** `/profile` | **Acceso:** Solo usuarios registrados

### ¿Qué hace?
Permite ver y actualizar la información personal del usuario, cambiar la contraseña y revisar notificaciones del sistema.

### Funciones disponibles

#### Ver información del perfil
Muestra:
- Foto de perfil.
- Nombre completo.
- Correo electrónico.
- Teléfono/celular.
- Municipio (ubicación).

#### Cambiar foto de perfil
1. Hacer clic en la foto de perfil o en el botón de cambiar foto.
2. Seleccionar una imagen desde el dispositivo.
3. Formatos aceptados: JPEG, PNG, WEBP.
4. Tamaño máximo: 5 MB.
5. La foto se sube automáticamente.

#### Editar información del perfil
1. Hacer clic en **"Editar Perfil"**.
2. Modificar los campos deseados: nombre, correo, teléfono, municipio.
3. Hacer clic en **"Guardar"**.
4. Validaciones:
   - El nombre no puede estar vacío.
   - El correo debe tener formato válido (ejemplo@correo.com).
   - El teléfono solo puede contener números, `+`, `-` y espacios.

#### Cambiar contraseña
1. Hacer clic en **"Cambiar Contraseña"**.
2. Ingresar la contraseña actual.
3. Ingresar la nueva contraseña (mínimo 8 caracteres).
4. Repetir la nueva contraseña para confirmar.
5. Hacer clic en **"Guardar nueva contraseña"**.

#### Panel de notificaciones
1. Hacer clic en el ícono de la campana (🔔) o el contador de notificaciones.
2. Se despliega el panel con las notificaciones recientes.
3. Tipos de notificaciones:
   - **Calificaciones** (⭐ amarillo): Alguien calificó uno de sus lotes publicados.
   - **Lotes** (verde): Eventos relacionados con sus lotes.
4. Se muestra el tiempo relativo (Ej: "Hace 5 minutos", "Ayer").
5. Hacer clic en **"Marcar todo como leído"** para limpiar el contador.

---

## 6.5 Centro de Ayuda

**Ruta:** `/help` | **Acceso:** Público

### ¿Qué hace?
Ofrece información de contacto, guías de uso paso a paso y respuestas a las preguntas más frecuentes.

### Secciones

#### Contacto
- **WhatsApp:** +57 300 123 4567 — Respuesta rápida.
- **Teléfono:** Llamada directa de soporte.
- **Correo electrónico:** Soporte por email.

#### Guías rápidas
1. **Usar el Diagnóstico IA**: Cómo tomar una buena foto y obtener el análisis.
2. **Vender en Mi Plaza**: Cómo publicar un lote para venta.
3. **Actualizar tu Perfil**: Cómo editar datos personales.

#### Preguntas frecuentes (FAQ)
Sección de preguntas y respuestas expandibles sobre el uso de la plataforma.

---

---

# 7. CAPTURAS DE PANTALLA — DESCRIPCIÓN DE INTERFACES

## 7.1 Pantalla de Inicio de Sesión

La pantalla de bienvenida se divide en dos secciones:
- **Izquierda:** Mensaje motivacional con título "Súmele a su Cultivo con Inteligencia Artificial", descripción del sistema y avatares de agricultores vallunos.
- **Derecha:** Formulario de inicio de sesión/registro con pestañas "Entrar" / "Registrarse", campos de datos y botón principal de acción en verde.
- El fondo es de color verde claro (#e8f5e9), coherente con la identidad agrícola.
- Disponible en **modo claro y modo oscuro** (botón de alternancia en la esquina superior derecha).

## 7.2 Dashboard — Diagnóstico IA

La pantalla de diagnóstico se divide en dos columnas:
- **Columna izquierda:** Zona de carga de imagen con área de arrastre, botón "Analizar Ahora" y consejos de fotografía.
- **Columna derecha:** Panel de resultados con barras de progreso para el estado de salud, tarjetas de información por categoría (madurez, enfermedades, precios) y botones de acción (compartir, publicar, guardar).
- La barra de navegación superior muestra: Diagnóstico (activo), Mi Plaza, Ayuda, Mis Lotes, Mi Perfil y el botón Salir.

## 7.3 Mis Lotes

- Vista de lista con tarjetas para cada lote.
- Cada tarjeta muestra nombre del lote, número de análisis y fecha.
- Botón "Nuevo Lote" destacado en verde.
- Vista de detalle: muestra una cuadrícula de imágenes de aguacates con etiquetas de madurez y daño codificadas por color.

## 7.4 Mi Plaza — Marketplace

- Cuadrícula de tarjetas de productos con imagen de aguacate, nombre del agricultor, precio, calificación con estrellas, municipio y botón de contacto.
- Filtros en la parte superior: Todos / Sanos / Con Roña / Maduros.
- Panel lateral de detalle al hacer clic en una tarjeta, con toda la información del lote y las imágenes de análisis.
- Sistema de calificación con estrellas interactivas en el panel de detalle.

## 7.5 Mi Perfil

- Tarjeta principal con foto de perfil (círculo), nombre y datos del usuario.
- Sección de edición de datos en formulario.
- Panel de notificaciones desplegable con íconos de colores según el tipo.
- Sección de cambio de contraseña con campos de texto tipo password.

---

---

# 8. GUÍA PASO A PASO DE USO

## 8.1 Flujo básico: Primer uso desde cero

### Paso 1 — Crear cuenta
1. Abrir la aplicación en el navegador.
2. Ir a la pestaña "Registrarse".
3. Completar todos los campos obligatorios.
4. Hacer clic en "Crear Mi Cuenta".
5. Esperar el mensaje de confirmación.

### Paso 2 — Iniciar sesión
1. En la pestaña "Entrar", digitar correo y contraseña.
2. Hacer clic en "Entrar al Sistema".
3. El sistema redirige al Dashboard.

### Paso 3 — Realizar el primer diagnóstico
1. En el Dashboard, hacer clic en el área de carga de imagen.
2. Seleccionar una foto del aguacate desde el dispositivo.
3. Verificar que la imagen sea clara.
4. Hacer clic en "🔬 Analizar Ahora".
5. Esperar mientras la IA procesa (puede tomar unos segundos).
6. Revisar los resultados: salud, madurez, precio sugerido.

### Paso 4 — Guardar el análisis en un lote
1. Tras el análisis, aparece el panel "¿A qué lote deseas asignarlo?".
2. Seleccionar "Crear nuevo lote..." y darle un nombre (Ej: "Parcela Norte - Mayo").
3. Hacer clic en "📂 Guardar en lote".
4. Aparece la confirmación de guardado.

### Paso 5 — Publicar en Mi Plaza
1. Con el resultado del análisis visible, hacer clic en "🛒 Publicar en Mi Plaza".
2. Revisar los datos precargados (calidad IA, madurez, estado).
3. Agregar: título del anuncio, cantidad en kg, precio por kg.
4. Agregar descripción opcional.
5. Hacer clic en "✅ Confirmar y Publicar".
6. Hacer clic en "Ver Mi Plaza →" para ver la publicación activa.

---

## 8.2 Flujo: Gestionar varios análisis en un lote

1. Ir al Dashboard.
2. Subir y analizar la primera foto → guardar en "Nuevo lote: Cosecha Junio".
3. Subir y analizar la segunda foto → guardar en el mismo lote "Cosecha Junio".
4. Repetir para todas las fotos del lote.
5. Ir a **Mis Lotes** para ver el lote completo con todos los análisis.
6. Revisar cada aguacate individualmente: imagen, madurez y nivel de daño.
7. Desde el detalle del lote, hacer clic en **"Publicar en Mi Plaza"** para publicar el lote completo.

---

## 8.3 Flujo: Buscar aguacates para comprar en Mi Plaza

1. Ir a **Mi Plaza** (no es necesario iniciar sesión para ver).
2. Usar los filtros para encontrar lo que necesita:
   - "Sanos" → solo frutos sin afectaciones detectadas.
   - "Maduros" → frutos listos para consumo o comercialización inmediata.
3. Hacer clic sobre una publicación para ver el detalle.
4. Revisar la información técnica: puntuación IA, imágenes del análisis.
5. Contactar al vendedor usando el número de teléfono mostrado.
6. Calificar al vendedor después de la transacción (requiere sesión iniciada).

---

## 8.4 Flujo: Actualizar información de contacto

1. Iniciar sesión e ir a **Mi Perfil**.
2. Hacer clic en **"Editar Perfil"**.
3. Actualizar el teléfono y/o ubicación.
4. Hacer clic en **"Guardar"**.

> **Importante:** El número de teléfono actualizado en el perfil es el que se muestra a los compradores en Mi Plaza.

---

## 8.5 Flujo: Compartir resultado por WhatsApp

1. Realizar un análisis en el Dashboard.
2. Al obtener los resultados, hacer clic en **"💬 Compartir por WhatsApp"**.
3. Se abre WhatsApp con el mensaje precargado:
   - Madurez, Estado de salud, Enfermedades, Precio sugerido, Destino de mercado.
4. Seleccionar el contacto al que desea enviar.
5. Enviar el mensaje.

---

---

# 9. MANEJO DE ERRORES FRECUENTES

## 9.1 Errores en el análisis de imágenes

### Error: "Imagen no válida — No se detectó ningún aguacate"

**Causa:** La IA no pudo detectar un aguacate en la imagen o la confianza del modelo fue muy baja.

**Solución:**
- Tomar la foto con mejor iluminación (luz natural o foco directo).
- Asegurarse de que el aguacate ocupe la mayor parte de la imagen.
- Evitar fondos con muchos objetos o colores similares al aguacate.
- Enfocar bien antes de tomar la foto (esperar a que la cámara enfoque).
- Evitar fotos borrosas o movidas.
- Hacer clic en "Intentar con otra foto" y subir una imagen nueva.

---

### Error: "Error en el servidor de IA"

**Causa:** El servidor de procesamiento tuvo un problema temporal.

**Solución:**
- Esperar 30 segundos y volver a intentar.
- Verificar la conexión a internet.
- Si persiste, contactar soporte.

---

## 9.2 Errores en inicio de sesión y registro

### Error: "Error al iniciar sesión"

**Causa posible 1:** Correo o contraseña incorrectos.
- Verificar que no haya errores de tipeo en el correo.
- Recordar que la contraseña distingue mayúsculas y minúsculas.
- Si no recuerda la contraseña, usar "¿Olvidó su clave?".

**Causa posible 2:** La cuenta no existe.
- Ir a la pestaña "Registrarse" para crear una cuenta nueva.

---

### Error: "Error de conexión con el servidor"

**Causa:** Sin conexión a internet o el servidor está temporalmente inactivo.

**Solución:**
- Verificar la señal de wifi o datos móviles.
- Recargar la página (F5 o el botón de recarga del navegador).
- Intentar de nuevo en unos minutos.

---

### Error durante el registro: campos de formulario

| Mensaje de error | Causa | Solución |
|---|---|---|
| "Documento inválido" | El número tiene menos de 6 o más de 10 dígitos | Ingresar solo dígitos numéricos del documento |
| "Nombre inválido" | Nombre muy corto (menos de 3 caracteres) | Ingresar nombre y apellidos completos |
| "Número de 10 dígitos" | Teléfono con formato incorrecto | Ingresar 10 dígitos sin espacios ni guiones |
| "Mínimo 8 caracteres" | Contraseña demasiado corta | Crear contraseña de 8 caracteres o más |

---

## 9.3 Errores al publicar en Mi Plaza

### Error: "Error al publicar"

**Causa:** Falta completar algún campo obligatorio o hay un problema de conexión.

**Solución:**
- Verificar que los campos "Título", "Cantidad (kg)" y "Precio/kg" estén completos.
- Asegurarse de que los valores numéricos sean mayores a 0.
- Verificar la conexión a internet.
- Intentar de nuevo.

---

## 9.4 Errores al subir foto de perfil

### Error: "Solo se permiten imágenes JPEG, PNG o WEBP"

**Causa:** Se intentó subir un archivo en formato no admitido (PDF, GIF, BMP, etc.).

**Solución:** Convertir la imagen al formato JPG, PNG o WEBP antes de subirla.

---

### Error: "La imagen supera los 5 MB"

**Causa:** La foto es demasiado pesada.

**Solución:**
- En el teléfono, usar la opción de "calidad media" o "comprimir" al tomar la foto.
- Usar una herramienta online gratuita para reducir el tamaño (ejemplo: compressjpeg.com).
- Tomar la foto con menor resolución.

---

## 9.5 Errores al cambiar contraseña

### Error: "La nueva contraseña y su confirmación no coinciden"

**Causa:** Los campos "Nueva contraseña" y "Confirmar contraseña" tienen textos distintos.

**Solución:** Escribir la nueva contraseña dos veces exactamente igual, prestando atención a mayúsculas y espacios.

---

### Error: "La contraseña actual es incorrecta"

**Causa:** El campo "Contraseña actual" no coincide con la contraseña guardada.

**Solución:** Ingresar exactamente la contraseña con la que inició sesión. Si la olvidó, cerrar sesión y usar "¿Olvidó su clave?".

---

## 9.6 La aplicación no carga o se ve mal

**Síntomas:** La página aparece en blanco, sin estilos, o los botones no responden.

**Solución paso a paso:**
1. Recargar la página: presionar **Ctrl + F5** (Windows/Linux) o **Cmd + Shift + R** (Mac).
2. Limpiar el caché del navegador: Configuración → Historial → Borrar datos de navegación.
3. Intentar con otro navegador (Chrome, Firefox, Edge).
4. Verificar la conexión a internet.
5. Si ninguna de las anteriores funciona, contactar al equipo de soporte.

---

---

# 10. INFORMACIÓN DE SOPORTE

## 10.1 Canales de contacto

| Canal | Detalle | Horario |
|---|---|---|
| **WhatsApp** | +57 300 123 4567 | Lunes a sábado, 7am - 6pm |
| **Teléfono** | +57 300 123 4567 | Lunes a sábado, 8am - 5pm |
| **Correo electrónico** | soporte@agrodatavalle.co | Respuesta en 24-48 horas |

Acceso rápido al soporte: en la barra de navegación, hacer clic en **"Ayuda"** → sección **"¿Necesitás ayuda? ¡Contactanos!"**.

## 10.2 Información del proyecto

| Campo | Detalle |
|---|---|
| **Nombre del proyecto** | AgroData Valle — Avocado Quality AI |
| **Tipo** | Proyecto académico |
| **Tecnología de IA** | YOLOv8 (Ultralytics) + CNN personalizada |
| **Backend** | Python 3.12 + FastAPI |
| **Frontend** | React 18 + Vite + Tailwind CSS |
| **Base de datos** | PostgreSQL 17 (Azure) |
| **Almacenamiento de imágenes** | Azure Blob Storage |
| **Infraestructura** | Azure Container Apps (Colombia/Canadá Central) |
| **CI/CD** | GitLab CI → Docker Hub → Azure |

## 10.3 Preguntas frecuentes rápidas

**¿La app funciona en teléfono?**
Sí, la aplicación es completamente responsiva y funciona en cualquier teléfono inteligente con navegador web.

**¿Necesito instalar algo?**
No. Solo necesita abrir su navegador y entrar a la dirección web.

**¿Mis datos están seguros?**
Sí. El sistema usa cifrado JWT para autenticación y las contraseñas se almacenan con hash (bcrypt). Solo los compradores interesados en su producto pueden ver su número de teléfono.

**¿Cuántos análisis puedo hacer?**
No hay límite de análisis. Puede analizar todos los aguacates que necesite.

**¿El precio sugerido es obligatorio?**
No. El precio es una recomendación basada en la calidad detectada por la IA y el mercado actual. El agricultor puede poner el precio que quiera al publicar en Mi Plaza.

**¿Cómo contacto a un comprador?**
Al publicar en Mi Plaza, los compradores ven su número de teléfono y lo contactan directamente por llamada o WhatsApp.

**¿Qué pasa si cierro el navegador en medio del diagnóstico?**
El diagnóstico activo se guarda temporalmente en el navegador. Si vuelve a abrir la misma página, el resultado del último análisis puede seguir visible.

## 10.4 Glosario

| Término | Definición |
|---|---|
| **IA / Inteligencia Artificial** | Sistema computacional que analiza imágenes y toma decisiones automáticas |
| **YOLOv8** | Modelo de IA especializado en detectar objetos en imágenes en tiempo real |
| **CNN** | Red Neuronal Convolucional; tipo de IA para análisis de imágenes |
| **Roña** | Enfermedad fúngica que produce manchas oscuras en la cáscara del aguacate |
| **Bounding Box** | Recuadro dibujado por la IA para marcar exactamente dónde está un defecto |
| **Confianza / Confidence** | Porcentaje que indica qué tan segura está la IA de su resultado |
| **Lote** | Grupo de análisis de aguacates organizados bajo un mismo nombre |
| **Marketplace / Mi Plaza** | Mercado digital dentro de la app para comprar y vender aguacates |
| **Token** | Código de seguridad temporal para recuperar contraseñas |
| **COP** | Pesos colombianos (moneda) |
| **JWT** | Tecnología de seguridad que protege la sesión del usuario |

---

