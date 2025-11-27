import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, MapPin, DollarSign, Heart, Package } from 'lucide-react-native';

export default function FavoritesScreen({ navigation }) {
    // Mock data - listings the user has liked
    const [favorites, setFavorites] = useState([
        {
            id: 1,
            title: 'Secure Student Locker',
            location: 'Gangnam, Seoul',
            price: '30000',
            rating: 4.8,
            photo: 'https://via.placeholder.com/300',
            host: 'John Doe',
        },
        {
            id: 2,
            title: 'Downtown Storage Room',
            location: 'Hongdae, Seoul',
            price: '45000',
            rating: 4.9,
            photo: 'https://via.placeholder.com/300',
            host: 'Jane Smith',
        },
        {
            id: 3,
            title: 'Campus Storage Space',
            location: 'Sinchon, Seoul',
            price: '35000',
            rating: 4.7,
            photo: 'https://via.placeholder.com/300',
            host: 'Bob Park',
        },
    ]);

    const handleUnlike = (id) => {
        setFavorites(favorites.filter(item => item.id !== id));
    };

    const FavoriteCard = ({ item }) => (
        <TouchableOpacity
            style={styles.favoriteCard}
            onPress={() => navigation.navigate('StorageDetail', { storageId: item.id })}
        >
            <Image source={{ uri: item.photo }} style={styles.favoriteImage} />

            <TouchableOpacity
                style={styles.heartButton}
                onPress={() => handleUnlike(item.id)}
            >
                <Heart size={20} color="#ef4444" fill="#ef4444" />
            </TouchableOpacity>

            <View style={styles.favoriteInfo}>
                <Text style={styles.favoriteTitle}>{item.title}</Text>

                <View style={styles.infoRow}>
                    <MapPin size={14} color="#64748b" />
                    <Text style={styles.infoText}>{item.location}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.infoText}>{item.host}</Text>
                </View>

                <View style={styles.priceContainer}>
                    <DollarSign size={16} color="#1e293b" />
                    <Text style={styles.priceText}>₩{item.price}</Text>
                    <Text style={styles.pricePeriod}>/month</Text>
                </View>
            </View>
        </TouchableOpacity>
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
                    <Text style={styles.headerTitle}>Favorites</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Content */}
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <Text style={styles.description}>
                        {favorites.length} saved listing{favorites.length !== 1 ? 's' : ''}
                    </Text>

                    {favorites.length > 0 ? (
                        favorites.map(item => (
                            <FavoriteCard key={item.id} item={item} />
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Heart size={48} color="#94a3b8" />
                            <Text style={styles.emptyStateTitle}>No Favorites Yet</Text>
                            <Text style={styles.emptyStateText}>
                                Start exploring and save your favorite listings
                            </Text>
                            <TouchableOpacity
                                style={styles.exploreButton}
                                onPress={() => navigation.navigate('HomeMain')}
                            >
                                <Text style={styles.exploreButtonText}>Explore Listings</Text>
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
        fontFamily: 'Geist-Bold',
        color: '#1e293b',
        marginBottom: 20,
    },
    favoriteCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        overflow: 'hidden',
    },
    favoriteImage: {
        width: '100%',
        height: 180,
        backgroundColor: '#f1f5f9',
    },
    heartButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    favoriteInfo: {
        padding: 16,
    },
    favoriteTitle: {
        fontSize: 18,
        fontFamily: 'Geist-Bold',
        color: '#1e293b',
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 6,
    },
    infoText: {
        fontSize: 14,
        fontFamily: 'Geist-Regular',
        color: '#64748b',
    },
    ratingText: {
        fontSize: 14,
        fontFamily: 'Geist-Regular',
        color: '#64748b',
    },
    dot: {
        fontSize: 14,
        color: '#94a3b8',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    priceText: {
        fontSize: 20,
        fontFamily: 'Geist-Bold',
        color: '#1e293b',
        marginLeft: 4,
    },
    pricePeriod: {
        fontSize: 14,
        fontFamily: 'Geist-Regular',
        color: '#64748b',
        marginLeft: 4,
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
    exploreButton: {
        backgroundColor: '#1e293b',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
    exploreButtonText: {
        fontSize: 14,
        fontFamily: 'Geist-Bold',
        color: '#fff',
    },
});
