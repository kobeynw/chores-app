import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser } from "../api/auth";
import { getProfile } from "../api/user";
import { getChildren } from "../api/child";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [childProfiles, setChildProfiles] = useState([])
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          const profile = await getProfile(storedToken);
          setUser(profile);
          const childProfileData = await getChildren(storedToken);
          setChildProfiles(childProfileData);
        }
      } catch (err) {
        console.log("Failed to retrieve User Profile", err);
        setUser(null);
        setToken(null);
        setChildProfiles([]);
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    await AsyncStorage.setItem("token", res.token);
    setToken(res.token);
    setUser(res.user);
    const childProfileData = await getChildren(res.token);
    setChildProfiles(childProfileData);
  };

  const register = async (email, password) => {
    const res = await registerUser(email, password);
    await AsyncStorage.setItem("token", res.token);
    setToken(res.token);
    setUser(res.user);
    const childProfileData = await getChildren(res.token);
    setChildProfiles(childProfileData);
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
        childProfiles,
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