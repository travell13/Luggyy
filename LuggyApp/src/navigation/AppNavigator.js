import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Map, MessageCircle } from 'lucide-react-native';

import AuthStackNavigator from './AuthStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import ChatsStackNavigator from './ChatsStackNavigator';
import MapScreen from '../screens/MapScreen';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1e293b',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          height: 80,
          paddingBottom: 20,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontFamily: 'Geist-Regular',
          fontSize: 11,
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Home size={24} color={color} strokeWidth={2} />,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Map size={24} color={color} strokeWidth={2} />,
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <MessageCircle size={24} color={color} strokeWidth={2} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  // TODO: Replace with actual auth state management (e.g., AsyncStorage, Context)
  // Set to true to test main app, false to test login screens
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthStackNavigator />
      ) : (
        <MainTabNavigator />
      )}
    </NavigationContainer>
  );
}
