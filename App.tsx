/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AuthProvider } from './src/context/AuthContext';

import { FirebaseNotificationInit } from './src/utils/FirebaseNotificationHandler';
import SplashScreen from './src/screens/SplashScreen';
<<<<<<< HEAD
import Home from './src/screens/MainScreens/Home';
import { ProfileProvider } from './src/context/ProfileContext';
import TabNavigator from './src/navigation/TabNavigator';
=======
import { ProfileProvider } from './src/context/ProfileContext';
import TabNavigator from './src/navigation/TabNavigator';
import AppNavigator from './src/navigation/AppNavigator';
>>>>>>> 020c6d6 (Initial commit of ListifyApp)

function App(): React.JSX.Element {

  useEffect(() => {
    FirebaseNotificationInit();
}, []);

const Stack = createStackNavigator();

  return (
    <AuthProvider>
      <ProfileProvider>
            <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS, // Add slide transition
              }}
            >
              <Stack.Screen name="Splash" component={SplashScreen} />
<<<<<<< HEAD
              <Stack.Screen name="App" component={TabNavigator} />
=======
              <Stack.Screen name="App" component={AppNavigator} />
>>>>>>> 020c6d6 (Initial commit of ListifyApp)
            </Stack.Navigator>
          </NavigationContainer>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
