import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, MapPin, Calendar, DollarSign, Package, Eye, Edit } from 'lucide-react-native';

export default function ActiveStorageScreen({ navigation }) {
    // Mock data - user's listings that are currently active and available (not being rented)
    const activeListings = [
        {
            id: 1,
            title: 'Secure Student Locker',
            location: 'Gangnam, Seoul',
            availableFrom: '2024-11-15',
            availableUntil: '2024-12-31',
            price: '30000',
            photo: 'https://via.placeholder.com/300',
            views: 45,
            status: 'active',
        },
        {
            id: 2,
            title: 'Cozy Storage Space',
            location: 'Hongdae, Seoul',
            availableFrom: '2024-11-15',
            availableUntil: null, // Flexible
            price: '25000',
            photo: 'https://via.placeholder.com/300',
            views: 28,
            status: 'active',
        },
    ];

    const ListingCard = ({ listing }) => (
        <View style={styles.listingCard}>
            <Image source={{ uri: listing.photo }} style={styles.listingImage} />

            <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Available</Text>
            </View>

            <View style={styles.listingInfo}>
                <Text style={styles.listingTitle}>{listing.title}</Text>

                <View style={styles.infoRow}>
                    <MapPin size={14} color="#64748b" />
                    <Text style={styles.infoText}>{listing.location}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Calendar size={14} color="#64748b" />
                    <Text style={styles.infoText}>
                        {listing.availableFrom} - {listing.availableUntil || 'Flexible'}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <DollarSign size={14} color="#64748b" />
                    <Text style={styles.infoText}>₩{listing.price}/month</Text>
                </View>

                <View style={styles.infoRow}>
                    <Eye size={14} color="#64748b" />
                    <Text style={styles.infoText}>{listing.views} views</Text>
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() => navigation.navigate('StorageDetail', { listing, isOwnListing: true })}
                    >
                        <Eye size={18} color="#1e293b" />
                        <Text style={styles.viewButtonText}>View Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => navigation.navigate('AddListing', { editMode: true, listing })}
                    >
                        <Edit size={18} color="#1e293b" />
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ArrowLeft size={24} color="#1e293b" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Active Storage</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Content */}
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <Text style={styles.description}>
                        Your active listings that are available for rent
                    </Text>

                    {activeListings.length > 0 ? (
                        activeListings.map(listing => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Package size={48} color="#94a3b8" />
                            <Text style={styles.emptyStateTitle}>No Active Listings</Text>
                            <Text style={styles.emptyStateText}>
                                You don't have any active storage listings right now
                            </Text>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => navigation.navigate('AddListing')}
                            >
                                <Text style={styles.addButtonText}>Create Listing</Text>
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
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    description: {
        fontSize: 14,
        fontFamily: 'Geist-Regular',
        color: '#64748b',
        marginBottom: 20,
    },
    listingCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        overflow: 'hidden',
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
        backgroundColor: 'rgba(16, 185, 129, 0.9)',
        gap: 6,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#fff',
    },
    statusText: {
        fontSize: 12,
        fontFamily: 'Geist-Bold',
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
    viewButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e293b',
        borderRadius: 12,
        paddingVertical: 12,
        gap: 8,
    },
    viewButtonText: {
        fontSize: 14,
        fontFamily: 'Geist-Bold',
        color: '#fff',
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
        textAlign: 'center',
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
