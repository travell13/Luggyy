import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Edit, Pause, Play, MapPin, DollarSign, Calendar, Package } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function ManageListingsScreen({ navigation }) {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    const fetchListings = async () => {
        try {
            if (!user) return;
            setIsLoading(true);

            const { data, error } = await supabase
                .from('storage_listings')
                .select('*')
                .eq('host_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Map database columns to UI state
            const formattedListings = data.map(item => ({
                id: item.id,
                title: item.title,
                location: item.address,
                price: item.price_per_day.toString(), // UI expects string for now
                status: item.is_available ? 'active' : 'paused',
                // Fallback for dates since they aren't in DB schema yet
                availableFrom: 'Flexible',
                availableUntil: null,
                photos: item.images || [],
                amenities: item.amenities || [],
                bookings: item.total_bookings || 0,
            }));

            setListings(formattedListings);
        } catch (error) {
            console.error('Error fetching listings:', error);
            Alert.alert('Error', 'Failed to load your listings');
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchListings();
        }, [user])
    );

    const toggleListingStatus = (id) => {
        setListings(listings.map(listing => {
            if (listing.id === id) {
                const newStatus = listing.status === 'active' ? 'paused' : 'active';
                Alert.alert(
                    'Status Updated',
                    `Listing "${listing.title}" is now ${newStatus}.`,
                    [{ text: 'OK' }]
                );
                return { ...listing, status: newStatus };
            }
            return listing;
        }));
    };

    const handleEditListing = (listing) => {
        // Navigate to edit screen (could be AddListingScreen with edit mode)
        navigation.navigate('AddListing', { editMode: true, listing });
    };

    const ListingCard = ({ listing }) => {
        const isActive = listing.status === 'active';

        return (
            <View style={styles.listingCard}>
                {/* Image Section */}
                {listing.photos && listing.photos.length > 0 && (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: listing.photos[0] }}
                            style={styles.listingImage}
                        />
                        {/* Status Badge */}
                        <View style={[styles.statusBadge, isActive ? styles.statusActive : styles.statusPaused]}>
                            <View style={[styles.statusDot, isActive ? styles.dotActive : styles.dotPaused]} />
                            <Text style={[styles.statusText, isActive ? styles.statusTextActive : styles.statusTextPaused]}>
                                {isActive ? 'Active' : 'Paused'}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Listing Info */}
                <View style={styles.listingInfo}>
                    <Text style={styles.listingTitle}>{listing.title}</Text>

                    <View style={styles.infoRow}>
                        <MapPin size={14} color="#64748b" />
                        <Text style={styles.infoText}>{listing.location}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <DollarSign size={14} color="#64748b" />
                        <Text style={styles.infoText}>₩{listing.price}/day</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Calendar size={14} color="#64748b" />
                        <Text style={styles.infoText}>
                            {listing.availableFrom}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Package size={14} color="#64748b" />
                        <Text style={styles.infoText}>
                            {listing.bookings} active booking{listing.bookings !== 1 ? 's' : ''}
                        </Text>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => handleEditListing(listing)}
                        >
                            <Edit size={18} color="#1e293b" />
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.statusButton, isActive ? styles.pauseButton : styles.resumeButton]}
                            onPress={() => toggleListingStatus(listing.id)}
                        >
                            {isActive ? (
                                <>
                                    <Pause size={18} color="#ef4444" />
                                    <Text style={styles.pauseButtonText}>Pause</Text>
                                </>
                            ) : (
                                <>
                                    <Play size={18} color="#10b981" />
                                    <Text style={styles.resumeButtonText}>Resume</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
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
                    <Text style={styles.headerTitle}>My Listings</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Stats Summary */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{listings.length}</Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{listings.filter(l => l.status === 'active').length}</Text>
                        <Text style={styles.statLabel}>Active</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{listings.filter(l => l.status === 'paused').length}</Text>
                        <Text style={styles.statLabel}>Paused</Text>
                    </View>
                </View>

                {/* Listings */}
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {listings.length > 0 ? (
                        listings.map(listing => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Package size={48} color="#94a3b8" />
                            <Text style={styles.emptyStateTitle}>No Listings Yet</Text>
                            <Text style={styles.emptyStateText}>Create your first listing to get started</Text>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => navigation.navigate('AddListing')}
                            >
                                <Text style={styles.addButtonText}>Add Listing</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={{ height: 40 }} />
                </ScrollView>
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
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 12,
    },
    statBox: {
        flex: 1,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontFamily: 'Geist-Bold',
        color: '#1e293b',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'Geist-Regular',
        color: '#64748b',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    listingCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
    },
    listingImage: {
        width: '100%',
        height: 180,
        backgroundColor: '#f1f5f9',
    },
    statusBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        gap: 6,
    },
    statusActive: {
        backgroundColor: 'rgba(16, 185, 129, 0.9)',
    },
    statusPaused: {
        backgroundColor: 'rgba(239, 68, 68, 0.9)',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    dotActive: {
        backgroundColor: '#fff',
    },
    dotPaused: {
        backgroundColor: '#fff',
    },
    statusText: {
        fontSize: 12,
        fontFamily: 'Geist-Bold',
    },
    statusTextActive: {
        color: '#fff',
    },
    statusTextPaused: {
        color: '#fff',
    },
    listingInfo: {
        padding: 16,
    },
    listingTitle: {
        fontSize: 18,
        fontFamily: 'Geist-Bold',
        color: '#1e293b',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        fontFamily: 'Geist-Regular',
        color: '#64748b',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    editButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        borderWidth: 2,
        borderColor: '#1e293b',
        borderRadius: 12,
        paddingVertical: 12,
        gap: 8,
    },
    editButtonText: {
        fontSize: 14,
        fontFamily: 'Geist-Bold',
        color: '#1e293b',
    },
    statusButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        paddingVertical: 12,
        gap: 8,
    },
    pauseButton: {
        backgroundColor: '#fef2f2',
        borderWidth: 2,
        borderColor: '#ef4444',
    },
    pauseButtonText: {
        fontSize: 14,
        fontFamily: 'Geist-Bold',
        color: '#ef4444',
    },
    resumeButton: {
        backgroundColor: '#ecfdf5',
        borderWidth: 2,
        borderColor: '#10b981',
    },
    resumeButtonText: {
        fontSize: 14,
        fontFamily: 'Geist-Bold',
        color: '#10b981',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyStateTitle: {
        fontSize: 20,
        fontFamily: 'Geist-Bold',
        color: '#1e293b',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 14,
        fontFamily: 'Geist-Regular',
        color: '#64748b',
        marginBottom: 24,
    },
    addButton: {
        backgroundColor: '#1e293b',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
    addButtonText: {
        fontSize: 14,
        fontFamily: 'Geist-Bold',
        color: '#fff',
    },
});
