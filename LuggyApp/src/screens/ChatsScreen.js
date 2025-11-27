import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MessageCircle, Search } from 'lucide-react-native';

// Mock chat data
const MOCK_CHATS = [
  {
    id: 1,
    hostName: 'John Kim',
    hostInitial: 'J',
    lastMessage: 'Great! I can hold your luggage from Dec 1st',
    timestamp: '2m ago',
    unread: 2,
    listingTitle: 'Secure Student Locker',
  },
  {
    id: 2,
    hostName: 'Sarah Lee',
    hostInitial: 'S',
    lastMessage: 'Yes, 24/7 access is available',
    timestamp: '1h ago',
    unread: 0,
    listingTitle: 'Campus Storage',
  },
  {
    id: 3,
    hostName: 'Mike Park',
    hostInitial: 'M',
    lastMessage: 'Thanks for your interest!',
    timestamp: '3h ago',
    unread: 0,
    listingTitle: 'Downtown Storage',
  },
];

export default function ChatsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Messages</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color="#1e293b" />
          </TouchableOpacity>
        </View>

        {/* Chat List */}
        <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
          {MOCK_CHATS.length > 0 ? (
            MOCK_CHATS.map((chat) => (
              <TouchableOpacity
                key={chat.id}
                style={styles.chatCard}
                onPress={() => navigation.navigate('ChatDetail', { chat })}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{chat.hostInitial}</Text>
                </View>
                
                <View style={styles.chatInfo}>
                  <View style={styles.chatHeader}>
                    <Text style={styles.hostName}>{chat.hostName}</Text>
                    <Text style={styles.timestamp}>{chat.timestamp}</Text>
                  </View>
                  <Text style={styles.listingTitle} numberOfLines={1}>{chat.listingTitle}</Text>
                  <Text style={styles.lastMessage} numberOfLines={1}>{chat.lastMessage}</Text>
                </View>

                {chat.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{chat.unread}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MessageCircle size={48} color="#cbd5e1" />
              <Text style={styles.emptyTitle}>No messages yet</Text>
              <Text style={styles.emptySubtitle}>Start chatting with hosts about their storage listings</Text>
            </View>
          )}
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
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatList: {
    flex: 1,
  },
  chatCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontFamily: 'Geist-Bold',
    color: '#2563eb',
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  hostName: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Geist-Regular',
    color: '#94a3b8',
  },
  listingTitle: {
    fontSize: 13,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  unreadText: {
    fontSize: 11,
    fontFamily: 'Geist-Bold',
    color: '#fff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 120,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
});
