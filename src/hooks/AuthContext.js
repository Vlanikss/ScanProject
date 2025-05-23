import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

  const checkAuthStatus = () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const tokenExpire = localStorage.getItem('tokenExpire');
      
      // Проверяем наличие токена и даты
      if (!accessToken || !tokenExpire) {
        console.log("Token or expire date not found");
        setIsLoggedIn(false);
        return false;
      }

      // Парсим дату и проверяем валидность
      const expireDate = new Date(tokenExpire);
      const now = new Date();

      if (isNaN(expireDate.getTime())) {
        console.log("Invalid token expiration date format");
        setIsLoggedIn(false);
        return false;
      }

      if (expireDate <= now) {
        console.log("Token expired");
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpire');
        return false;
      }

      console.log("User is authenticated");
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
      return false;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkAuthStatus();
    setIsLoading(false);
    
    // Добавляем слушатель изменений в localStorage
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        isLoading,
        setIsLoggedIn, 
        checkAuthStatus 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};