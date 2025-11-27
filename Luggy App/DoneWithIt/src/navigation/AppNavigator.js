import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Map, PlusCircle, MessageCircle } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import AddScreen from '../screens/AddScreen';
import ChatsScreen from '../screens/ChatsScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#e2e8f0',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontFamily: 'Geist-Regular',
            fontSize: 12,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Map size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} />,
            tabBarLabel: '',
          }}
        />
        <Tab.Screen
          name="Chats"
          component={ChatsScreen}
          options={{
            tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
