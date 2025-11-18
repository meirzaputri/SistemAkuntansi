import { createContext, useContext, useEffect, useState } from "react";
import { me, login as loginApi, logout as logoutApi } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await me(token);
        setUser(res.data);
      } catch (err) {
        console.error("Token invalid:", err);
        setUser(null);
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await loginApi({ email, password });
    const accessToken = res.data.access_token;

    localStorage.setItem("token", accessToken);
    setToken(accessToken);

    const meRes = await me(accessToken);
    setUser(meRes.data);

    return res;
  };

  const logout = async () => {
    try {
      await logoutApi(token);
    } catch {}
    localStorage.removeItem("token");
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
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
