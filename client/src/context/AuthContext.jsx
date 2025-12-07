import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../constants/api";
import { ADMINLOGIN } from "../constants/routes";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // setup axios interceptor to handle API errors globally
  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Unauthorized - clear user state and redirect user back to login page
          setUser(null);
          navigate(ADMINLOGIN);
        }
        // pass the error down to the promise chain
        // This allows component-level catch blocks to still handle the error if needed
        // Without this, errors would be swallowed by the interceptor
        return Promise.reject(error);
      }
    );

    // removes the interceptor when the component unmounts
    // This prevents memory leaks and interceptor duplication if the component remounts
    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  // validate user session on initial app load
  useEffect(() => {
    const validateSession = async () => {
      // check if there is indicator in local storage
      if (!localStorage.getItem("isAuthenticated")) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get("/v1/auth/validate");

        if (response.data?.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
          localStorage.removeItem("isAuthenticated"); // clear flag if session is invalid
        }
      } catch (error) {
        // session expired or token invalid
        console.error("Session validation failed", error);
        localStorage.removeItem("isAuthenticated");
      } finally {
        setLoading(false);
      }
    };
    validateSession();
  }, []);

  // login function
  const adminLogin = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await api.post("/v1/auth/admin-login", {
        email,
        password,
      });

      // backend will sent cookies which will be automatically stored in the browser cookies
      // set data in user state
      if (response.data?.user) {
        setUser(response.data.user);
        localStorage.setItem("isAuthenticated", true); // set flag for authenticated users
      } else {
        setError("Invalid credentials");
      }
      return response.data.user;
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      setLoading(false);
      throw error;
    }
  };

  // register function
  const register = async (first_name, last_name, email, password, role) => {
    try {
      setError(null);
      setLoading(true);
      const response = await api.post("/v1/auth/register", {
        first_name,
        last_name,
        email,
        password,
        role,
      });

      // set data in user state
      if (response.data?.user) {
        setUser(response.data.user);
        localStorage.setItem("isAuthenticated", true); // set flag for authenticated users
      } else {
        setError("Invalid credentials");
      }
      return response.data.user;
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      setLoading(false);
      throw error;
    }
  };

  // logout function
  const logout = async () => {
    try {
      await api.post("/v1/auth/logout");
    } catch (error) {
      console.error("Logout failed", error.message);
    } finally {
      setUser(null);
      localStorage.removeItem("isAuthenticated"); // remove indicator from local storage
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, adminLogin, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
