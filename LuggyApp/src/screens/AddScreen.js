import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Listing</Text>
      <Text style={styles.subtext}>Post your storage space</Text>
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
