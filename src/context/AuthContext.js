import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from AsyncStorage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user from AsyncStorage:', error);
      }
    };

    loadUser();
  }, []);

  // Save user to AsyncStorage when it changes
  const saveUser = async (userData) => {
    try {
      setUser(userData);
      if (userData) {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
      } else {
        await AsyncStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error saving user to AsyncStorage:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: saveUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
