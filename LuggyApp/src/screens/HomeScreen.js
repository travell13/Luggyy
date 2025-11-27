import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TextInput, TouchableOpacity, StatusBar as RNStatusBar, Platform, BackHandler } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, SlidersHorizontal, User } from 'lucide-react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import StorageCard from '../components/StorageCard';
import Slider from '@react-native-community/slider';

// Gradient Text Component
const GradientText = ({ children, style }) => (
  <MaskedView
    maskElement={
      <Text style={[styles.sectionTitle, style]}>{children}</Text>
    }
  >
    <LinearGradient
      colors={['rgb(30, 30, 30)', 'rgb(30, 30, 30)', 'rgb(100, 100, 100)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.29, 1]}
    >
      <Text style={[styles.sectionTitle, style, { opacity: 0 }]}>{children}</Text>
    </LinearGradient>
  </MaskedView>
);

const MOCK_STORAGE_SPOTS = [
  {
    id: '1',
    title: 'Secure Student Locker',
    distance: '0.2km',
    rating: 4.8,
    reviews: 124,
    price: 30000,
    image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?w=800&q=80',
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Spacious Basement Storage',
    distance: '0.5km',
    rating: 4.9,
    reviews: 89,
    price: 45000,
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80',
    isFavorite: true,
  },
  {
    id: '3',
    title: 'Near Campus Center',
    distance: '0.8km',
    rating: 4.7,
    reviews: 56,
    price: 35000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Climate Controlled Unit',
    distance: '1.2km',
    rating: 5.0,
    reviews: 42,
    price: 55000,
    image: 'https://images.unsplash.com/photo-1565514020176-db7933f383e2?w=800&q=80',
    isFavorite: false,
  },
];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Filter state
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('distance'); // distance, price-low, price-high, rating
  
  // Handle back button when search is focused
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isSearchFocused) {
        setIsSearchFocused(false);
        return true; // Prevent default behavior (exit app)
      }
      return false; // Let default behavior happen
    });

    return () => backHandler.remove();
  }, [isSearchFocused]);
  
  // Filter and sort listings
  const getFilteredListings = () => {
    let filtered = [...MOCK_STORAGE_SPOTS];
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.distance.toLowerCase().includes(query)
      );
    }
    
    // Price filter
    filtered = filtered.filter(item => 
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    
    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
      default:
        filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
    }
    
    return filtered;
  };

  const filteredListings = getFilteredListings();
  const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < 100000;

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => setIsSearchFocused(true)}
          activeOpacity={0.7}
        >
          <Search size={20} color="#64748b" />
          <Text style={[styles.searchPlaceholder, searchQuery && { color: '#1e293b' }]}>
            {searchQuery || 'Search by location or title'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <User size={20} color="#1e293b" />
        </TouchableOpacity>
      </View>

      <GradientText>Popular hosts</GradientText>
      
      {filteredListings.length === 0 && (
        <Text style={styles.noResults}>No listings found. Try adjusting your filters.</Text>
      )}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <FlatList
          data={filteredListings}
          renderItem={({ item }) => (
            <StorageCard
              listing={item}
              title={item.title}
              distance={item.distance}
              rating={item.rating}
              reviews={item.reviews}
              price={item.price}
              image={item.image}
              isFavorite={item.isFavorite}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
        />
        
        {/* Floating Action Button */}
        <TouchableOpacity 
          style={styles.fabContainer}
          onPress={() => navigation.navigate('AddListing')}
        >
          <LinearGradient
            colors={['rgb(30, 30, 30)', 'rgb(30, 30, 30)', 'rgb(100, 100, 100)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0.29, 1]}
            style={styles.fab}
          >
            <Text style={styles.fabIcon}>+</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Filter Modal */}
        {showFilterModal && (
          <View style={styles.modalOverlay}>
            <TouchableOpacity 
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={() => setShowFilterModal(false)}
            />
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filters</Text>
                <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Price Range</Text>
                <View style={styles.priceRangeDisplay}>
                  <Text style={styles.priceValue}>₩{priceRange[0].toLocaleString()}</Text>
                  <Text style={styles.priceValue}>₩{priceRange[1].toLocaleString()}</Text>
                </View>
                {/* Price buttons */}
                <View style={styles.priceButtons}>
                  <TouchableOpacity 
                    style={styles.pricePreset}
                    onPress={() => setPriceRange([0, 30000])}
                  >
                    <Text style={styles.pricePresetText}>Under ₩30k</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.pricePreset}
                    onPress={() => setPriceRange([30000, 50000])}
                  >
                    <Text style={styles.pricePresetText}>₩30-50k</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.pricePreset}
                    onPress={() => setPriceRange([50000, 100000])}
                  >
                    <Text style={styles.pricePresetText}>Over ₩50k</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.resetButton}
                  onPress={() => setPriceRange([0, 100000])}
                >
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.applyButton}
                  onPress={() => setShowFilterModal(false)}
                >
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Sort Modal */}
        {showSortModal && (
          <View style={styles.modalOverlay}>
            <TouchableOpacity 
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={() => setShowSortModal(false)}
            />
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Sort by</Text>
                <TouchableOpacity onPress={() => setShowSortModal(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              {[
                { value: 'distance', label: 'Nearest first' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'rating', label: 'Highest rated' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.sortOption, sortBy === option.value && styles.sortOptionActive]}
                  onPress={() => {
                    setSortBy(option.value);
                    setShowSortModal(false);
                  }}
                >
                  <Text style={[styles.sortOptionText, sortBy === option.value && styles.sortOptionTextActive]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Expanded Search Overlay */}
        {isSearchFocused && (
          <View style={styles.searchOverlay}>
            <View style={styles.searchBlur}>
              <SafeAreaView style={styles.searchExpandedContainer}>
                <View style={styles.searchExpandedHeader}>
                  <View style={styles.searchExpandedBar}>
                    <Search size={20} color="#64748b" />
                    <TextInput
                      style={styles.searchExpandedInput}
                      placeholder="Search by location or title"
                      placeholderTextColor="#94a3b8"
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      autoFocus
                    />
                  </View>
                  <TouchableOpacity onPress={() => setIsSearchFocused(false)}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </View>

                {/* Filters Section */}
                <View style={styles.filtersSection}>
                  <Text style={styles.filtersSectionTitle}>Filters</Text>
                  
                  {/* Price Filter */}
                  <View style={styles.filterGroup}>
                    <Text style={styles.filterGroupLabel}>Price Range</Text>
                    <View style={styles.priceRangeDisplay}>
                      <Text style={styles.priceValue}>₩{priceRange[0].toLocaleString()}</Text>
                      <Text style={styles.priceValue}>₩{priceRange[1].toLocaleString()}</Text>
                    </View>
                    
                    <Text style={styles.sliderLabel}>Minimum Price</Text>
                    <Slider
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={100000}
                      step={5000}
                      value={priceRange[0]}
                      onValueChange={(value) => setPriceRange([value, priceRange[1]])}
                      minimumTrackTintColor="#1e293b"
                      maximumTrackTintColor="#e5e7eb"
                      thumbTintColor="#1e293b"
                    />
                    
                    <Text style={styles.sliderLabel}>Maximum Price</Text>
                    <Slider
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={100000}
                      step={5000}
                      value={priceRange[1]}
                      onValueChange={(value) => setPriceRange([priceRange[0], value])}
                      minimumTrackTintColor="#1e293b"
                      maximumTrackTintColor="#e5e7eb"
                      thumbTintColor="#1e293b"
                    />
                  </View>

                  {/* Sort Options */}
                  <View style={styles.filterGroup}>
                    <Text style={styles.filterGroupLabel}>Sort by</Text>
                    {[
                      { value: 'distance', label: 'Nearest first' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' },
                      { value: 'rating', label: 'Highest rated' },
                    ].map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={[styles.sortOptionInline, sortBy === option.value && styles.sortOptionInlineActive]}
                        onPress={() => setSortBy(option.value)}
                      >
                        <Text style={[styles.sortOptionInlineText, sortBy === option.value && styles.sortOptionInlineTextActive]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Reset Button */}
                  <TouchableOpacity 
                    style={styles.resetAllButton}
                    onPress={() => {
                      setPriceRange([0, 100000]);
                      setSortBy('distance');
                      setSearchQuery('');
                    }}
                  >
                    <Text style={styles.resetAllButtonText}>Reset All Filters</Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  headerContainer: {
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
    paddingHorizontal: 20,
    height: 56,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    color: '#1e293b',
    fontSize: 16,
    fontFamily: 'Geist-Regular',
  },
  searchPlaceholder: {
    flex: 1,
    color: '#94a3b8',
    fontSize: 16,
    fontFamily: 'Geist-Regular',
  },
  profileButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  // Expanded Search Overlay
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
  },
  searchBlur: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchExpandedContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  searchExpandedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  searchExpandedBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    gap: 12,
  },
  searchExpandedInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: '#1e293b',
  },
  cancelText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  filtersSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  filtersSectionTitle: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  filterGroup: {
    marginBottom: 24,
  },
  filterGroupLabel: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  pricePresetActive: {
    backgroundColor: '#1e293b',
    borderColor: '#1e293b',
  },
  pricePresetTextActive: {
    color: '#fff',
  },
  sortOptionInline: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    marginBottom: 8,
  },
  sortOptionInlineActive: {
    backgroundColor: '#1e293b',
  },
  sortOptionInlineText: {
    fontSize: 15,
    fontFamily: 'Geist-Regular',
    color: '#1e293b',
  },
  sortOptionInlineTextActive: {
    color: '#fff',
    fontFamily: 'Geist-Bold',
  },
  resetAllButton: {
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    marginTop: 8,
  },
  resetAllButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#64748b',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  sortButtonText: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
  noResults: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 32,
    color: '#1e293b',
    marginBottom: 12,
    fontFamily: 'Geist-Bold',
    fontWeight: '600',
    letterSpacing: -1.5,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Geist-Regular',
    lineHeight: 32,
  },
  // Modal styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  modalClose: {
    fontSize: 28,
    color: '#94a3b8',
    fontFamily: 'Geist-Regular',
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  priceRangeDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceValue: {
    fontSize: 18,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
    marginBottom: 8,
  },
  priceButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  pricePreset: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  pricePresetText: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#64748b',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#fff',
  },
  sortOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#f8fafc',
  },
  sortOptionActive: {
    backgroundColor: '#1e293b',
  },
  sortOptionText: {
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: '#1e293b',
  },
  sortOptionTextActive: {
    color: '#fff',
    fontFamily: 'Geist-Bold',
  },
});
