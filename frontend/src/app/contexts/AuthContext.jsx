import { createContext, useContext, useEffect, useState } from "react";
import { loginUser as apiLogin, registerUser as apiRegister } from "../services/api";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("avocado_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parseando usuario guardado:", error);
        localStorage.removeItem("avocado_user");
        localStorage.removeItem("avocado_token");
      }
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const newUser = await apiRegister(userData);
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

  const login = async (email, password) => {
    try {
      const response = await apiLogin(email, password);

      // Guardar token JWT en localStorage
      if (response.access_token) {
        localStorage.setItem("avocado_token", response.access_token);
      }

      const userToStore = {
        id: response.user_id,
        name: response.name,
        email: email,
      };
      setUser(userToStore);
      localStorage.setItem("avocado_user", JSON.stringify(userToStore));
      return { success: true, user: userToStore };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("avocado_user");
    localStorage.removeItem("avocado_token"); // ← limpiar token al salir
  };

  const updateUserData = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem("avocado_user", JSON.stringify(updatedUser));
  };

  // Helper para obtener el token desde cualquier componente
  const getToken = () => localStorage.getItem("avocado_token");

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserData,
    getToken,                        // ← nuevo
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}