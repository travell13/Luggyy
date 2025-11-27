import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, MapPin, Calendar, Package, TrendingUp, TrendingDown } from 'lucide-react-native';

export default function HistoryScreen({ navigation }) {
    const [filter, setFilter] = useState('all'); // 'all', 'host', 'user'

    // Mock data - all historical activity
    const history = [
        {
            id: 1,
            type: 'host', // User was the host
            title: 'Secure Student Locker',
            location: 'Gangnam, Seoul',
            guest: 'Alice Kim',
            startDate: '2024-09-01',
            endDate: '2024-10-31',
            price: '60000',
            photo: 'https://via.placeholder.com/300',
        },
        {
            id: 2,
            type: 'user', // User rented storage
            title: 'Campus Storage Room',
            location: 'Sinchon, Seoul',
            host: 'Bob Park',
            startDate: '2024-08-15',
            endDate: '2024-09-30',
            price: '50000',
            photo: 'https://via.placeholder.com/300',
        },
        {
            id: 3,
            type: 'host',
            title: 'Cozy Storage Space',
            location: 'Hongdae, Seoul',
            guest: 'Charlie Lee',
            startDate: '2024-07-01',
            endDate: '2024-08-31',
            price: '50000',
            photo: 'https://via.placeholder.com/300',
        },
        {
            id: 4,
            type: 'user',
            title: 'Downtown Locker',
            location: 'Myeongdong, Seoul',
            host: 'David Choi',
            startDate: '2024-06-01',
            endDate: '2024-07-15',
            price: '45000',
            photo: 'https://via.placeholder.com/300',
        },
    ];

    const filteredHistory = filter === 'all'
        ? history
        : history.filter(item => item.type === filter);

    const HistoryCard = ({ item }) => {
        const isHost = item.type === 'host';

        return (
            <View style={styles.historyCard}>
                <View style={styles.cardHeader}>
                    <View style={[styles.typeBadge, isHost ? styles.typeBadgeHost : styles.typeBadgeUser]}>
                        {isHost ? (
                            <TrendingUp size={14} color="#10b981" />
                        ) : (
                            <TrendingDown size={14} color="#3b82f6" />
                        )}
                        <Text style={[styles.typeText, isHost ? styles.typeTextHost : styles.typeTextUser]}>
                            {isHost ? 'Hosted' : 'Used'}
                        </Text>
                    </View>
                </View>

                <View style={styles.cardContent}>
                    <Image source={{ uri: item.photo }} style={styles.historyImage} />

                    <View style={styles.historyInfo}>
                        <Text style={styles.historyTitle}>{item.title}</Text>

                        <View style={styles.infoRow}>
                            <MapPin size={14} color="#64748b" />
                            <Text style={styles.infoText}>{item.location}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Package size={14} color="#64748b" />
                            <Text style={styles.infoText}>
                                {isHost ? `Guest: ${item.guest}` : `Host: ${item.host}`}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Calendar size={14} color="#64748b" />
                            <Text style={styles.infoText}>
                                {item.startDate} - {item.endDate}
                            </Text>
                        </View>

                        <Text style={styles.priceText}>₩{item.price}</Text>
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
                    <Text style={styles.headerTitle}>History</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Filter Tabs */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
                        onPress={() => setFilter('all')}
                    >
                        <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
                            All
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterTab, filter === 'host' && styles.filterTabActive]}
                        onPress={() => setFilter('host')}
                    >
                        <Text style={[styles.filterText, filter === 'host' && styles.filterTextActive]}>
                            As Host
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterTab, filter === 'user' && styles.filterTabActive]}
                        onPress={() => setFilter('user')}
                    >
                        <Text style={[styles.filterText, filter === 'user' && styles.filterTextActive]}>
                            As User
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {filteredHistory.length > 0 ? (
                        filteredHistory.map(item => (
                            <HistoryCard key={item.id} item={item} />
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Package size={48} color="#94a3b8" />
                            <Text style={styles.emptyStateTitle}>No History</Text>
                            <Text style={styles.emptyStateText}>No activity to show</Text>
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
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 12,
    },
    filterTab: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
    },
    filterTabActive: {
        backgroundColor: '#1e293b',
    },
    filterText: {
        fontSize: 14,
        fontFamily: 'Geist-Regular',
        color: '#64748b',
    },
    filterTextActive: {
        fontFamily: 'Geist-Bold',
        color: '#fff',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    historyCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        overflow: 'hidden',
    },
    cardHeader: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    typeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 20,
        gap: 6,
    },
    typeBadgeHost: {
        backgroundColor: '#ecfdf5',
    },
    typeBadgeUser: {
        backgroundColor: '#eff6ff',
    },
    typeText: {
        fontSize: 12,
        fontFamily: 'Geist-Bold',
    },
    typeTextHost: {
        color: '#10b981',
    },
    typeTextUser: {
        color: '#3b82f6',
    },
    cardContent: {
        flexDirection: 'row',
        padding: 12,
    },
    historyImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
    },
    historyInfo: {
        flex: 1,
        marginLeft: 12,
    },
    historyTitle: {
        fontSize: 16,
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
        fontSize: 12,
        fontFamily: 'Geist-Regular',
        color: '#64748b',
        flex: 1,
    },
    priceText: {
        fontSize: 16,
        fontFamily: 'Geist-Bold',
        color: '#1e293b',
        marginTop: 4,
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
    },
});
