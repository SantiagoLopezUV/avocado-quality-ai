import { createContext, useContext, useEffect, useState } from "react";
import { loginUser as apiLogin, registerUser as apiRegister } from "../services/api";

const AuthContext = createContext(null);

/**
 * Hook personalizado para usar el contexto de autenticación
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}

/**
 * Provider de autenticación que maneja el estado del usuario logueado
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, verificar si hay un usuario guardado en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("avocado_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parseando usuario guardado:", error);
        localStorage.removeItem("avocado_user");
      }
    }
    setLoading(false);
  }, []);

  /**
   * REGISTRO DE USUARIO
   */
  const register = async (userData) => {
    try {
      // Llamar a la API de registro
      const newUser = await apiRegister(userData);
      
      // Guardar usuario en el estado y localStorage
      const userToStore = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        location: newUser.location,
        document_number: newUser.document_number,
      };
      
      setUser(userToStore);
      localStorage.setItem("avocado_user", JSON.stringify(userToStore));
      
      return { success: true, user: userToStore };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  /**
   * LOGIN DE USUARIO
   */
  const login = async (email, password) => {
    try {
      // Llamar a la API de login
      const response = await apiLogin(email, password);
      
      // Guardar usuario en el estado y localStorage
      // Nota: Tu API solo devuelve user_id y name, idealmente debería devolver más datos
      const userToStore = {
        id: response.user_id,
        name: response.name,
        email: email, // Guardamos el email usado para login
      };
      
      setUser(userToStore);
      localStorage.setItem("avocado_user", JSON.stringify(userToStore));
      
      return { success: true, user: userToStore };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  /**
   * LOGOUT DE USUARIO
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("avocado_user");
  };

  /**
   * ACTUALIZAR DATOS DEL USUARIO EN EL ESTADO
   * (Útil después de editar el perfil)
   */
  const updateUserData = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem("avocado_user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserData,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
