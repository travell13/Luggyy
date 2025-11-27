import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Star, MapPin, Heart, Share2, Calendar, Package, Shield, Clock, MessageCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';

const { width } = Dimensions.get('window');

export default function StorageDetailScreen({ route, navigation }) {
  const { listing, isOwnListing } = route.params;
  const [isFavorite, setIsFavorite] = useState(listing.isFavorite);

  // Track view count when user views someone else's listing
  useEffect(() => {
    if (!isOwnListing) {
      // In a real app, this would make an API call to increment the view count
      // For now, we'll just log it
      console.log(`View tracked for listing: ${listing.id}`);
      // Example API call:
      // fetch(`/api/listings/${listing.id}/increment-views`, { method: 'POST' })
    }
  }, [listing.id, isOwnListing]);

  // Mock coordinates - in real app, get from listing data
  const location = {
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const amenities = [
    { icon: Shield, label: 'Verified Host' },
    { icon: Clock, label: '24/7 Access' },
    { icon: Package, label: 'Secure Storage' },
    { icon: Calendar, label: 'Flexible Terms' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Share2 size={20} color="#1e293b" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              size={20}
              color={isFavorite ? '#ef4444' : '#1e293b'}
              fill={isFavorite ? '#ef4444' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Map View */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={location}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={listing.title}
              description={listing.distance}
            />
          </MapView>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Rating */}
          <View style={styles.titleSection}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{listing.title}</Text>
              <View style={styles.ratingBadge}>
                <Star size={16} color="#1e293b" fill="#1e293b" />
                <Text style={styles.ratingText}>{listing.rating}</Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <MapPin size={14} color="#64748b" />
              <Text style={styles.locationText}>{listing.distance} from campus</Text>
            </View>
          </View>

          {/* Host Info - only show if not own listing */}
          {!isOwnListing && (
            <View style={styles.hostSection}>
              <View style={styles.hostAvatar}>
                <Text style={styles.hostInitial}>J</Text>
              </View>
              <View style={styles.hostInfo}>
                <Text style={styles.hostName}>Hosted by John</Text>
                <Text style={styles.hostStats}>Joined in 2023 · 15 reviews</Text>
              </View>
              <TouchableOpacity
                style={styles.chatButton}
                onPress={() => navigation.navigate('Chats', {
                  screen: 'ChatDetail',
                  params: {
                    chat: {
                      id: listing.id,
                      hostName: 'John',
                      hostInitial: 'J',
                      listingTitle: listing.title,
                      lastMessage: '',
                      timestamp: 'Now',
                      unread: 0,
                    }
                  }
                })}
              >
                <MessageCircle size={20} color="#1e293b" />
              </TouchableOpacity>
            </View>
          )}

          {/* Amenities */}
          <View style={styles.amenitiesSection}>
            <Text style={styles.sectionTitle}>What this place offers</Text>
            <View style={styles.amenitiesGrid}>
              {amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <amenity.icon size={20} color="#1e293b" />
                  <Text style={styles.amenityLabel}>{amenity.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About this storage</Text>
            <Text style={styles.description}>
              Secure and convenient storage space perfect for students. Located just {listing.distance} from campus,
              this storage unit offers 24/7 access with verified security measures. Ideal for storing luggage,
              boxes, and personal belongings during breaks or semester transitions.
            </Text>
          </View>

          {/* Reviews Section */}
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <View style={styles.overallRating}>
                <Star size={20} color="#1e293b" fill="#1e293b" />
                <Text style={styles.overallRatingText}>{listing.rating} · 15 reviews</Text>
              </View>
            </View>

            {/* Review Cards */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.reviewsScrollContent}
            >
              {[
                { id: 1, name: 'Sarah Kim', initial: 'S', rating: 5, comment: 'Great storage space! Very secure and convenient location.', date: '2 weeks ago' },
                { id: 2, name: 'Mike Chen', initial: 'M', rating: 5, comment: 'John was very helpful and the space was perfect for my needs.', date: '1 month ago' },
                { id: 3, name: 'Emma Lee', initial: 'E', rating: 4, comment: 'Good value for money. Easy access and clean space.', date: '2 months ago' },
              ].map((review) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewerInfo}>
                      <View style={styles.reviewerAvatar}>
                        <Text style={styles.reviewerInitial}>{review.initial}</Text>
                      </View>
                      <View>
                        <Text style={styles.reviewerName}>{review.name}</Text>
                        <Text style={styles.reviewDate}>{review.date}</Text>
                      </View>
                    </View>
                    <View style={styles.reviewRating}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} color="#1e293b" fill="#1e293b" />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.showAllButton}>
              <Text style={styles.showAllText}>Show all 15 reviews</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar - only show for other people's listings */}
      {!isOwnListing && (
        <View style={styles.bottomBar}>
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>
              <Text style={styles.price}>₩{listing.price.toLocaleString()}</Text>
              <Text style={styles.pricePeriod}>/month</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Chats', {
            screen: 'ChatDetail',
            params: {
              chat: {
                id: listing.id,
                hostName: 'John',
                hostInitial: 'J',
                listingTitle: listing.title,
                lastMessage: '',
                timestamp: 'Now',
                unread: 0,
              }
            }
          })}>
            <LinearGradient
              colors={['rgb(30, 30, 30)', 'rgb(30, 30, 30)', 'rgb(100, 100, 100)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              locations={[0, 0.29, 1]}
              style={styles.bookButton}
            >
              <Text style={styles.bookButtonText}>Chat</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#f1f5f9',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    flex: 1,
    marginRight: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
  hostSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 24,
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  hostInitial: {
    fontSize: 20,
    fontFamily: 'Geist-Bold',
    color: '#2563eb',
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  hostStats: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  amenitiesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  amenityLabel: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#1e293b',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
    lineHeight: 24,
  },
  reviewsSection: {
    marginBottom: 100,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  overallRatingText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  reviewsScrollContent: {
    paddingRight: 20,
  },
  reviewCard: {
    width: 280,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewerInitial: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#2563eb',
  },
  reviewerName: {
    fontSize: 15,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Geist-Regular',
    color: '#94a3b8',
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
    lineHeight: 20,
  },
  showAllButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: 8,
  },
  showAllText: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },
  priceSection: {
    flex: 1,
  },
  priceLabel: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 20,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  pricePeriod: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
  bookButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#fff',
  },
});
