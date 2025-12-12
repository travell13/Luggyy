import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar as RNStatusBar, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { User, Settings, LogOut, ChevronRight, Package, Calendar, Heart, DollarSign, MessageSquare, Bell, Shield, HelpCircle, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen({ navigation }) {
  // Mock data
  const userData = {
    name: 'John Doe',
    initial: 'J',
    rating: 4.9,
    joinDate: 'June 2024',
    totalListings: 3,
    activeBookings: 2,
    totalEarnings: 450000,
    responseRate: 95,
    storageHistory: 8,
    upcomingBookings: 1,
    favoriteListings: 12,
    totalSpent: 240000,
  };

  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    // Navigation is handled automatically by AuthContext state change
  };

  const SettingsItem = ({ icon: Icon, title, onPress }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        <Icon size={20} color="#64748b" />
        <Text style={styles.settingsItemText}>{title}</Text>
      </View>
      <ChevronRight size={20} color="#94a3b8" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{userData.initial}</Text>
              </View>
            </View>
            <Text style={styles.userName}>{userData.name}</Text>
            <View style={styles.userMeta}>
              <Text style={styles.rating}>⭐ {userData.rating}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.joinDate}>Member since {userData.joinDate}</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContent}>
            <Text style={styles.sectionTitle}>My Activity</Text>

            <View style={styles.statsGrid}>
              <TouchableOpacity
                style={styles.statCard}
                onPress={() => navigation.navigate('ManageListings')}
              >
                <Package size={24} color="#1e293b" />
                <Text style={styles.statValue}>{userData.totalListings}</Text>
                <Text style={styles.statLabel}>My Listings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.statCard}
                onPress={() => navigation.navigate('ActiveStorage')}
              >
                <Calendar size={24} color="#1e293b" />
                <Text style={styles.statValue}>{userData.upcomingBookings}</Text>
                <Text style={styles.statLabel}>Active Storage</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statsGrid}>
              <TouchableOpacity
                style={styles.statCard}
                onPress={() => navigation.navigate('History')}
              >
                <Calendar size={24} color="#1e293b" />
                <Text style={styles.statValue}>{userData.storageHistory}</Text>
                <Text style={styles.statLabel}>History</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.statCard}
                onPress={() => navigation.navigate('Favorites')}
              >
                <Heart size={24} color="#1e293b" />
                <Text style={styles.statValue}>{userData.favoriteListings}</Text>
                <Text style={styles.statLabel}>Favorites</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('ManageListings')}
            >
              <Text style={styles.actionButtonText}>Manage My Listings</Text>
              <ChevronRight size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.settingsList}>
              <SettingsItem icon={Settings} title="Account Settings" onPress={() => console.log('Account')} />
              <SettingsItem icon={Bell} title="Notifications" onPress={() => console.log('Notifications')} />
              <SettingsItem icon={Shield} title="Privacy" onPress={() => console.log('Privacy')} />
              <SettingsItem icon={HelpCircle} title="Help & Support" onPress={() => console.log('Help')} />
              <SettingsItem icon={Info} title="About" onPress={() => console.log('About')} />
            </View>
          </View>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
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
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
  dot: {
    fontSize: 14,
    color: '#94a3b8',
  },
  joinDate: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  statsContent: {
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#fff',
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  settingsList: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsItemText: {
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: '#1e293b',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#fef2f2',
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#ef4444',
  },
});
