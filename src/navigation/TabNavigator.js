import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Animated } from 'react-native';
import AddItem from '../screens/MainScreens/AddItem';
import HomeStack from './HomeStack';
import ChatStack from './ChatStack';
import Profile from '../screens/MainScreens/Profile';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          if (route.name === 'HomeStack') {
            iconSource = require('../assets/icons/home.png');
          } else if (route.name === 'ChatStack') {
            iconSource = require('../assets/icons/chat.png');
          } else if (route.name === 'Add') {
            iconSource = require('../assets/icons/add.png');
          } else if (route.name === 'Profile') {
            iconSource = require('../assets/icons/profile.png');
          }
          return (
            <Animated.View style={{ transform: [{ scale: focused ? 1.2 : 1 }] }}>
              <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />
            </Animated.View>
          );
        },
        headerShown: false, // Hide the header
      })}
      tabBarOptions={{
        activeTintColor: '#2f95dc',
        inactiveTintColor: '#ccc',
        style: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 10,
          height: 60,
          paddingBottom: 10,
        },
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
      <Tab.Screen name="ChatStack" component={ChatStack} options={{ title: 'Chat' }} />
      <Tab.Screen name="Add" component={AddItem} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;