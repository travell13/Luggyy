import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, MapPin, Heart, Eye } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function StorageCard({ title, distance, rating, reviews, price, image, onPress, isFavorite, listing, onToggleFavorite, views }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('StorageDetail', { listing })}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite && onToggleFavorite(listing.id);
          }}
        >
          <Heart
            size={20}
            color={isFavorite ? '#ef4444' : '#fff'}
            fill={isFavorite ? '#ef4444' : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>

        <View style={styles.locationContainer}>
          <MapPin size={12} color="#64748b" />
          <Text style={styles.distanceText}>{distance} away</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.priceText}>₩{price.toLocaleString()}<Text style={styles.periodText}>/mo</Text></Text>
          <View style={styles.metaContainer}>
            <View style={styles.ratingContainer}>
              <Star size={12} color="#1e293b" fill="#1e293b" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
            {views !== undefined && (
              <View style={styles.viewsContainer}>
                <Eye size={12} color="#64748b" />
                <Text style={styles.viewsText}>{views}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  imageContainer: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    padding: 12,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  header: {
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#1e293b',
    fontFamily: 'Geist-Bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  distanceText: {
    color: '#64748b',
    fontSize: 14,
    fontFamily: 'Geist-Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    color: '#0f172a',
    fontSize: 16,
    fontFamily: 'Geist-Bold',
  },
  periodText: {
    color: '#64748b',
    fontSize: 14,
    fontFamily: 'Geist-Regular',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#1e293b',
    fontSize: 14,
    fontFamily: 'Geist-Regular',
  },
  viewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewsText: {
    color: '#64748b',
    fontSize: 13,
    fontFamily: 'Geist-Regular',
  },
});
