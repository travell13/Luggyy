import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          'Geist-Regular': require('./assets/fonts/Geist-Regular.ttf'),
          'Geist-Bold': require('./assets/fonts/Geist-Bold.ttf'),
          'GeistMono-Regular': require('./assets/fonts/GeistMono-Regular.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
