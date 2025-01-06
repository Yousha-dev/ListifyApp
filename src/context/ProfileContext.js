import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    website: '',
    image: null, // Profile image URI
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('profile');
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async (updatedProfile) => {
    try {
      setProfile(updatedProfile);
      await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile));
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const updateProfileImage = async (imageUri) => {
    const updatedProfile = { ...profile, image: imageUri };
    await saveProfile(updatedProfile);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        saveProfile,
        updateProfileImage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
