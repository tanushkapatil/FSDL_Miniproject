import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext(null);

const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const json = atob(padded);

    return JSON.parse(json);
  } catch {
    return null;
  }
};

const isTokenExpired = (payload) => {
  if (!payload || !payload.exp) {
    return false;
  }

  return payload.exp * 1000 < Date.now();
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setIsLoadingAuth(false);
      return;
    }

    const decoded = decodeToken(storedToken);

    if (!decoded || isTokenExpired(decoded)) {
      localStorage.removeItem("token");
      setIsLoadingAuth(false);
      return;
    }

    setToken(storedToken);
    setUser({
      id: decoded.id || decoded._id || null,
      role: decoded.role || "user",
      name: decoded.name || "",
      email: decoded.email || "",
    });
    setIsAuthenticated(true);
    setIsLoadingAuth(false);
  }, []);

  const login = async ({ email, password }) => {
    const response = await axiosClient.post("/auth/login", { email, password });
    const nextToken = response.data?.token;
    const nextUser = response.data?.user;

    if (!nextToken || !nextUser) {
      throw new Error("Invalid login response from server");
    }

    localStorage.setItem("token", nextToken);
    setToken(nextToken);
    setUser(nextUser);
    setIsAuthenticated(true);

    return nextUser;
  };

  const register = async (payload) => {
    return axiosClient.post("/auth/register", payload);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      isLoadingAuth,
      login,
      register,
      logout,
    }),
    [user, token, isAuthenticated, isLoadingAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
