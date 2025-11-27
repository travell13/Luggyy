import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map View</Text>
      <Text style={styles.subtext}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  text: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtext: {
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
});
