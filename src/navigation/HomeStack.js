import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from '../screens/MainScreens/Home';
import ItemDetails from '../screens/HomeScreens/ItemDetails';
import ItemBid from '../screens/HomeScreens/ItemBid';

const Stack = createStackNavigator();

const HomeStack = () => {
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
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="ItemDetails"
        component={ItemDetails}
        options={{ title: 'Details' }}
      />
      <Stack.Screen
        name="ItemBid"
        component={ItemBid}
        options={{ title: 'Bid' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;