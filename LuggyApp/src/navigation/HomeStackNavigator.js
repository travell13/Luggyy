import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import StorageDetailScreen from '../screens/StorageDetailScreen';
import AddListingScreen from '../screens/AddListingScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'fade',
        animationDuration: 200,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="StorageDetail" component={StorageDetailScreen} />
      <Stack.Screen name="AddListing" component={AddListingScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
