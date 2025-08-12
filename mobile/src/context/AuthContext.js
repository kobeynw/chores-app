import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser } from "../api/auth";
import { getProfile } from "../api/user";
import { getChildren } from "../api/child";
import useActionCable from '../websocket/useActionCable';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [childProfiles, setChildProfiles] = useState([])
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        setLoading(true);
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          const res = await getProfile(storedToken);
          setUser(res?.user);
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

  useActionCable({
    parentId: user?.id,
    isLoggedIn: !!token,
    onMessage: (message) => {
      console.log('WebSocket message received:', message);

      if (message.event === 'child_created') {
        setChildProfiles((prev) => {
          const exists = prev.some(child => child.id === message.child.id);
          if (exists) return prev;
          return [...prev, message.child];
        });
      }

      // TODO: Add data syncing for other actions
    }
  });

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await loginUser(email, password);
      await AsyncStorage.setItem("token", res.token);
      setToken(res?.token);
      setUser(res?.user);
      const childProfileData = await getChildren(res.token);
      setChildProfiles(childProfileData);
    } catch (err) {
      console.log("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, passcode) => {
    try {
      setLoading(true);
      const res = await registerUser(email, password, passcode);
      await AsyncStorage.setItem("token", res.token);
      setToken(res?.token);
      setUser(res?.user);
      const childProfileData = await getChildren(res.token);
      setChildProfiles(childProfileData);
    } catch (err) {
      console.log("Register failed:", err);
    } finally {
      setLoading(false);
    }
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