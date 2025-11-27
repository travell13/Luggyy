import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Image, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, ArrowRight, MapPin, DollarSign, Camera, Shield, Clock, Package, Calendar, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const STEPS = [
  { id: 1, title: 'Basic Info', icon: Package },
  { id: 2, title: 'Location', icon: MapPin },
  { id: 3, title: 'Pricing', icon: DollarSign },
  { id: 4, title: 'Photos', icon: Camera },
  { id: 5, title: 'Features', icon: Shield },
  { id: 6, title: 'Review', icon: Check },
];

const AMENITIES = [
  { id: '24/7', label: '24/7 Access', icon: Clock },
  { id: 'secure', label: 'Secure Lock', icon: Shield },
  { id: 'climate', label: 'Climate Control', icon: Package },
  { id: 'flexible', label: 'Flexible Terms', icon: Calendar },
];

export default function AddListingScreen({ navigation, route }) {
  // Check if we're in edit mode
  const editMode = route?.params?.editMode || false;
  const existingListing = route?.params?.listing || null;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: existingListing?.title || '',
    description: existingListing?.description || '',
    location: existingListing?.location || '',
    price: existingListing?.price || '',
    availableFrom: existingListing?.availableFrom ? new Date(existingListing.availableFrom) : new Date(),
    availableUntil: existingListing?.availableUntil ? new Date(existingListing.availableUntil) : null,
    photos: existingListing?.photos?.map(uri => ({ uri })) || [],
    amenities: existingListing?.amenities || [],
  });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData({ ...formData, photos: [...formData.photos, ...result.assets] });
    }
  };

  const toggleAmenity = (id) => {
    const amenities = formData.amenities.includes(id)
      ? formData.amenities.filter(a => a !== id)
      : [...formData.amenities, id];
    setFormData({ ...formData, amenities });
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleSubmit = () => {
    if (editMode) {
      console.log('Updating listing:', { ...existingListing, ...formData });
    } else {
      console.log('Creating new listing:', formData);
    }
    navigation.goBack();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Tell us about your storage</Text>
            <TextInput
              style={styles.input}
              placeholder="Title (e.g., Secure Student Locker)"
              value={formData.title}
              onChangeText={(title) => setFormData({ ...formData, title })}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={formData.description}
              onChangeText={(description) => setFormData({ ...formData, description })}
              multiline
              numberOfLines={4}
            />
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Where is it located?</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={20} color="#64748b" />
              <TextInput
                style={styles.inputInline}
                placeholder="Address or nearby landmark"
                value={formData.location}
                onChangeText={(location) => setFormData({ ...formData, location })}
              />
            </View>
            <View style={styles.mapPlaceholder}>
              <MapPin size={40} color="#94a3b8" />
              <Text style={styles.mapPlaceholderText}>Map will appear here</Text>
            </View>
          </View>
        );


      case 3:
        // Calculate duration in days for pricing suggestion
        const calculateDays = () => {
          if (!formData.availableUntil) return null;
          const diffTime = Math.abs(formData.availableUntil - formData.availableFrom);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays;
        };

        const days = calculateDays();

        // Calculate suggested pricing based on duration
        const getSuggestedPricing = () => {
          if (!days) {
            return {
              daily: { min: 3000, max: 10000 },
              monthly: { min: 25000, max: 50000 }
            };
          }

          // Price suggestions based on duration
          if (days <= 7) {
            return {
              daily: { min: 5000, max: 12000 },
              monthly: { min: 30000, max: 60000 }
            };
          } else if (days <= 30) {
            return {
              daily: { min: 4000, max: 10000 },
              monthly: { min: 25000, max: 50000 }
            };
          } else {
            return {
              daily: { min: 3000, max: 8000 },
              monthly: { min: 20000, max: 45000 }
            };
          }
        };

        const suggestedPricing = getSuggestedPricing();

        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Availability & Pricing</Text>

            {/* Storage Availability Dates */}
            <Text style={styles.sectionLabel}>When is it available?</Text>

            <View style={styles.datePickerContainer}>
              <View style={styles.dateField}>
                <Text style={styles.fieldLabel}>Available From</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <Calendar size={20} color="#1e293b" />
                  <Text style={styles.dateButtonText}>
                    {formData.availableFrom.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.dateField}>
                <Text style={styles.fieldLabel}>Available Until</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowEndDatePicker(true)}
                >
                  <Calendar size={20} color="#1e293b" />
                  <Text style={styles.dateButtonText}>
                    {formData.availableUntil
                      ? formData.availableUntil.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })
                      : 'Flexible'
                    }
                  </Text>
                </TouchableOpacity>
                {formData.availableUntil && (
                  <TouchableOpacity
                    style={styles.flexibleButton}
                    onPress={() => setFormData({ ...formData, availableUntil: null })}
                  >
                    <Text style={styles.flexibleButtonText}>Set as Flexible</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Show duration info if dates are set */}
            {days && (
              <View style={styles.durationInfo}>
                <Text style={styles.durationInfoText}>
                  Storage duration: {days} day{days !== 1 ? 's' : ''} ({Math.floor(days / 30)} month{Math.floor(days / 30) !== 1 ? 's' : ''})
                </Text>
              </View>
            )}

            {/* Date Pickers */}
            {showStartDatePicker && (
              <DateTimePicker
                value={formData.availableFrom}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowStartDatePicker(false);
                  if (selectedDate) {
                    setFormData({ ...formData, availableFrom: selectedDate });
                  }
                }}
              />
            )}
            {showEndDatePicker && (
              <DateTimePicker
                value={formData.availableUntil || new Date()}
                mode="date"
                display="default"
                minimumDate={formData.availableFrom}
                onChange={(event, selectedDate) => {
                  setShowEndDatePicker(false);
                  if (selectedDate) {
                    setFormData({ ...formData, availableUntil: selectedDate });
                  }
                }}
              />
            )}

            {/* Pricing Section */}
            <View style={styles.sectionDivider} />
            <Text style={styles.sectionLabel}>Set your price</Text>

            <View style={styles.inputWithIcon}>
              <Text style={styles.currencySymbol}>₩</Text>
              <TextInput
                style={styles.inputInline}
                placeholder="30,000"
                value={formData.price}
                onChangeText={(price) => setFormData({ ...formData, price })}
                keyboardType="numeric"
              />
            </View>
            {days ? (
              <Text style={styles.hint}>
                Suggested total: ₩{Math.floor(suggestedPricing.daily.min * days).toLocaleString()} - ₩{Math.floor(suggestedPricing.daily.max * days).toLocaleString()}
                {'\n'}(₩{suggestedPricing.daily.min.toLocaleString()} - ₩{suggestedPricing.daily.max.toLocaleString()} per day × {days} days)
              </Text>
            ) : (
              <Text style={styles.hint}>
                Set an end date to see pricing suggestions
              </Text>
            )}
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Add photos</Text>
            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
              <Camera size={32} color="#00B4D8" />
              <Text style={styles.photoButtonText}>Choose Photos</Text>
            </TouchableOpacity>
            <View style={styles.photoGrid}>
              {formData.photos.map((photo, index) => (
                <Image key={index} source={{ uri: photo.uri }} style={styles.photoPreview} />
              ))}
            </View>
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select features</Text>
            <View style={styles.amenitiesGrid}>
              {AMENITIES.map((amenity) => {
                const Icon = amenity.icon;
                const isSelected = formData.amenities.includes(amenity.id);
                return (
                  <TouchableOpacity
                    key={amenity.id}
                    style={[styles.amenityCard, isSelected && styles.amenityCardSelected]}
                    onPress={() => toggleAmenity(amenity.id)}
                  >
                    <Icon size={24} color={isSelected ? '#00B4D8' : '#64748b'} />
                    <Text style={[styles.amenityLabel, isSelected && styles.amenityLabelSelected]}>
                      {amenity.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );

      case 6:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Review your listing</Text>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewLabel}>Title</Text>
              <Text style={styles.reviewValue}>{formData.title || 'Not set'}</Text>
            </View>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewLabel}>Location</Text>
              <Text style={styles.reviewValue}>{formData.location || 'Not set'}</Text>
            </View>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewLabel}>Price</Text>
              <Text style={styles.reviewValue}>₩{formData.price || '0'}/month</Text>
            </View>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewLabel}>Photos</Text>
              <Text style={styles.reviewValue}>{formData.photos.length} photos</Text>
            </View>
            <View style={styles.reviewCard}>
              <Text style={styles.reviewLabel}>Features</Text>
              <Text style={styles.reviewValue}>{formData.amenities.length} selected</Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ArrowLeft size={24} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{editMode ? 'Edit Listing' : 'Add Listing'}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          {STEPS.map((step, index) => (
            <View
              key={step.id}
              style={[
                styles.progressDot,
                currentStep >= step.id && styles.progressDotActive,
                currentStep === step.id && styles.progressDotCurrent,
              ]}
            />
          ))}
        </View>
        <Text style={styles.stepIndicator}>
          Step {currentStep} of {STEPS.length}
        </Text>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {renderStepContent()}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          {currentStep < STEPS.length ? (
            <TouchableOpacity onPress={handleNext} style={styles.nextButtonContainer}>
              <LinearGradient
                colors={['rgb(30, 30, 30)', 'rgb(30, 30, 30)', 'rgb(100, 100, 100)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.29, 1]}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>Next</Text>
                <ArrowRight size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSubmit} style={styles.nextButtonContainer}>
              <LinearGradient
                colors={['rgb(30, 30, 30)', 'rgb(30, 30, 30)', 'rgb(100, 100, 100)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.29, 1]}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>{editMode ? 'Update Listing' : 'Submit Listing'}</Text>
                <Check size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          )}
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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
  },
  progressDotActive: {
    backgroundColor: '#1e293b',
  },
  progressDotCurrent: {
    width: 32,
  },
  stepIndicator: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
  stepContent: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  inputInline: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: '#1e293b',
    marginLeft: 12,
  },
  currencySymbol: {
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  pricePeriod: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
    marginLeft: 8,
  },
  hint: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
    marginTop: 8,
  },
  durationSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  durationButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: '#f8fafc',
    alignItems: 'center',
  },
  durationButtonActive: {
    borderColor: '#1e293b',
    backgroundColor: '#fff',
  },
  durationButtonText: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
  durationButtonTextActive: {
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  durationInfo: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  durationInfoText: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    color: '#64748b',
    textAlign: 'center',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 24,
  },
  sectionLabel: {
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  datePickerContainer: {
    gap: 20,
  },
  dateField: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 4,
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
  flexibleButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#1e293b',
    marginTop: 8,
  },
  flexibleButtonText: {
    fontSize: 13,
    fontFamily: 'Geist-Bold',
    color: '#fff',
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  mapPlaceholderText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#94a3b8',
  },
  photoButton: {
    height: 120,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1e293b',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  photoButtonText: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityCard: {
    width: '48%',
    padding: 20,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  amenityCardSelected: {
    borderColor: '#1e293b',
    backgroundColor: '#f1f5f9',
  },
  amenityLabel: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
  amenityLabelSelected: {
    color: '#1e293b',
    fontFamily: 'Geist-Bold',
  },
  reviewCard: {
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewLabel: {
    fontSize: 12,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
    marginBottom: 4,
  },
  reviewValue: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  nextButtonContainer: {
    width: '100%',
  },
  nextButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#fff',
  },
});
