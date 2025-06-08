import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        // TODO: fetch user profile from backend using token
        setUser({}); // Replace with real user data if needed
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    await AsyncStorage.setItem("token", res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const register = async (email, password) => {
    const res = await registerUser(email, password);
    await AsyncStorage.setItem("token", res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isLoggedIn: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);