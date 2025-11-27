import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Calendar, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BookingScreen({ route, navigation }) {
  const { listing } = route.params;
  
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  // Calculate duration in days
  const calculateDays = () => {
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const days = calculateDays();
  const pricePerDay = listing.price / 30; // Assuming listing.price is per month
  const totalPrice = Math.floor(pricePerDay * days);

  const handleConfirmBooking = () => {
    // TODO: Implement booking confirmation logic
    console.log('Booking confirmed:', {
      listing: listing.title,
      checkIn,
      checkOut,
      days,
      totalPrice,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft size={24} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirm Booking</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Listing Info */}
          <View style={styles.listingCard}>
            <Text style={styles.listingTitle}>{listing.title}</Text>
            <Text style={styles.listingLocation}>{listing.distance} from campus</Text>
          </View>

          {/* Date Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Dates</Text>
            
            <View style={styles.dateField}>
              <Text style={styles.fieldLabel}>Check-in</Text>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setShowCheckInPicker(true)}
              >
                <Calendar size={20} color="#1e293b" />
                <Text style={styles.dateButtonText}>
                  {checkIn.toLocaleDateString('en-US', { 
                    weekday: 'short',
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateField}>
              <Text style={styles.fieldLabel}>Check-out</Text>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setShowCheckOutPicker(true)}
              >
                <Calendar size={20} color="#1e293b" />
                <Text style={styles.dateButtonText}>
                  {checkOut.toLocaleDateString('en-US', { 
                    weekday: 'short',
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Duration Info */}
            <View style={styles.durationInfo}>
              <Text style={styles.durationText}>
                {days} night{days !== 1 ? 's' : ''} ({Math.floor(days / 30) > 0 ? `${Math.floor(days / 30)} month${Math.floor(days / 30) !== 1 ? 's' : ''}, ` : ''}{days % 30} day{(days % 30) !== 1 ? 's' : ''})
              </Text>
            </View>
          </View>

          {/* Date Pickers */}
          {showCheckInPicker && (
            <DateTimePicker
              value={checkIn}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowCheckInPicker(false);
                if (selectedDate) {
                  setCheckIn(selectedDate);
                  // Adjust check-out if it's before new check-in
                  if (selectedDate >= checkOut) {
                    const newCheckOut = new Date(selectedDate);
                    newCheckOut.setDate(newCheckOut.getDate() + 1);
                    setCheckOut(newCheckOut);
                  }
                }
              }}
            />
          )}
          {showCheckOutPicker && (
            <DateTimePicker
              value={checkOut}
              mode="date"
              display="default"
              minimumDate={(() => {
                const minDate = new Date(checkIn);
                minDate.setDate(minDate.getDate() + 1);
                return minDate;
              })()}
              onChange={(event, selectedDate) => {
                setShowCheckOutPicker(false);
                if (selectedDate) {
                  setCheckOut(selectedDate);
                }
              }}
            />
          )}

          {/* Price Breakdown */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Details</Text>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>₩{Math.floor(pricePerDay).toLocaleString()} × {days} night{days !== 1 ? 's' : ''}</Text>
              <Text style={styles.priceValue}>₩{totalPrice.toLocaleString()}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₩{totalPrice.toLocaleString()}</Text>
            </View>
          </View>

          {/* Bottom spacing for button */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleConfirmBooking} style={styles.confirmButtonContainer}>
            <LinearGradient
              colors={['rgb(30, 30, 30)', 'rgb(30, 30, 30)', 'rgb(100, 100, 100)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              locations={[0, 0.29, 1]}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              <Check size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  listingCard: {
    margin: 20,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  listingTitle: {
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  listingLocation: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  dateField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dateButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  durationInfo: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  durationText: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    color: '#64748b',
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 15,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
  priceValue: {
    fontSize: 15,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  totalValue: {
    fontSize: 20,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  bottomSpacing: {
    height: 100,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    backgroundColor: '#fff',
  },
  confirmButtonContainer: {
    width: '100%',
  },
  confirmButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#fff',
  },
});
