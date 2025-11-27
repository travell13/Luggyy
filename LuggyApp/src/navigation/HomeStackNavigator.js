import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import StorageDetailScreen from '../screens/StorageDetailScreen';
import AddListingScreen from '../screens/AddListingScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ManageListingsScreen from '../screens/ManageListingsScreen';
import ActiveStorageScreen from '../screens/ActiveStorageScreen';
import HistoryScreen from '../screens/HistoryScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

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
      <Stack.Screen name="ManageListings" component={ManageListingsScreen} />
      <Stack.Screen name="ActiveStorage" component={ActiveStorageScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}
