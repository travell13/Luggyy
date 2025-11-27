import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatsScreen from '../screens/ChatsScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen';

const Stack = createNativeStackNavigator();

export default function ChatsStackNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'fade',
        animationDuration: 200,
      }}
    >
      <Stack.Screen name="ChatsList" component={ChatsScreen} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
    </Stack.Navigator>
  );
}
