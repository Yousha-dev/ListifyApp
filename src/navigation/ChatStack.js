import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Chat from '../screens/MainScreens/Chat';
import ChatDetails from '../screens/ChatScreens/ChatDetails';

const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2f95dc',
          shadowColor: 'transparent', // Remove shadow on iOS
          elevation: 0, // Remove shadow on Android
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center', // Center the header title
        ...TransitionPresets.FadeFromBottomAndroid, // Add fade transition
      }}
    >
      <Stack.Screen
        name="ChatHome"
        component={Chat}
        options={{ title: 'Chats' }}
      />
      <Stack.Screen
        name="ChatDetails"
        component={ChatDetails}
        options={{ title: 'Messages' }}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;