// Servicio centralizado para todas las llamadas a la API
const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

/**
 * Función auxiliar para manejar respuestas de la API
 */
async function handleResponse(response) {
  const data = await response.json().catch(() => null);
  
  if (!response.ok) {
    // Si el backend devuelve un mensaje de error en "detail"
    const errorMessage = data?.detail || "Error en la solicitud";
    throw new Error(errorMessage);
  }
  
  return data;
}

/**
 * REGISTRO DE USUARIO
 * POST /users/register
 * 
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.document_number - Documento de identidad (opcional)
 * @param {string} userData.name - Nombre completo
 * @param {string} userData.email - Correo electrónico
 * @param {string} userData.phone - Teléfono (opcional)
 * @param {string} userData.location - Ubicación/municipio (opcional)
 * @param {string} userData.password - Contraseña
 * 
 * @returns {Promise<Object>} Usuario creado
 */
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
}

/**
 * LOGIN DE USUARIO
 * POST /users/login
 * 
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña
 * 
 * @returns {Promise<Object>} Datos del login: { message, user_id, name }
 */
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}

/**
 * OBTENER USUARIO POR ID
 * (Pendiente: necesitarás crear este endpoint en tu backend)
 * GET /users/{user_id}
 * 
 * @param {string} userId - UUID del usuario
 * @returns {Promise<Object>} Datos completos del usuario
 */
export async function getUserById(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    throw error;
  }
}

/**
 * ACTUALIZAR PERFIL DE USUARIO
 * (Pendiente: necesitarás crear este endpoint en tu backend)
 * PUT /users/{user_id}
 * 
 * @param {string} userId - UUID del usuario
 * @param {Object} updateData - Datos a actualizar
 * @returns {Promise<Object>} Usuario actualizado
 */
export async function updateUser(userId, updateData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
}
/**
 * SOLICITAR RECUPERACIÓN DE CONTRASEÑA
 * POST /auth/forgot-password
 * 
 * @param {string} email - Correo electrónico del usuario
 * @returns {Promise<Object>} Respuesta con token (para simular envío de email)
 */
export async function forgotPassword(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error solicitando reset de contraseña:", error);
    throw error;
  }
}

/**
 * RESTABLECER CONTRASEÑA CON TOKEN
 * POST /auth/reset-password
 * 
 * @param {string} token - Token de recuperación
 * @param {string} newPassword - Nueva contraseña
 * @returns {Promise<Object>} Mensaje de confirmación
 */
export async function resetPassword(token, newPassword) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, new_password: newPassword }),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error restableciendo contraseña:", error);
    throw error;
  }
}