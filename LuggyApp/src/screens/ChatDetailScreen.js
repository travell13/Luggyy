import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Send } from 'lucide-react-native';

export default function ChatDetailScreen({ route, navigation }) {
  const { chat } = route.params;
  const scrollViewRef = useRef(null);
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sent: false,
      text: "Hi! I'm interested in your storage space.",
      timestamp: '10:30 AM',
    },
    {
      id: 2,
      sent: true,
      text: 'Great! I can hold your luggage from Dec 1st',
      timestamp: '10:32 AM',
    },
    {
      id: 3,
      sent: false,
      text: 'Perfect! How many bags can you accommodate?',
      timestamp: '10:33 AM',
    },
    {
      id: 4,
      sent: true,
      text: 'I can store up to 3 large suitcases comfortably',
      timestamp: '10:35 AM',
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sent: false,
        text: message,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <ArrowLeft size={24} color="#1e293b" />
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <View style={styles.headerAvatar}>
                <Text style={styles.headerAvatarText}>{chat.hostInitial}</Text>
              </View>
              <View>
                <Text style={styles.headerName}>{chat.hostName}</Text>
                <Text style={styles.headerListing} numberOfLines={1}>{chat.listingTitle}</Text>
              </View>
            </View>
            <View style={styles.placeholder} />
          </View>

          {/* Messages */}
          <ScrollView 
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageBubble,
                  msg.sent ? styles.sentBubble : styles.receivedBubble,
                ]}
              >
                <Text style={[
                  styles.messageText,
                  msg.sent ? styles.sentText : styles.receivedText,
                ]}>
                  {msg.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  msg.sent ? styles.sentTime : styles.receivedTime,
                ]}>
                  {msg.timestamp}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={1000}
            />
            <TouchableOpacity 
              style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
              onPress={handleSend}
              disabled={!message.trim()}
            >
              <Send size={20} color={message.trim() ? '#fff' : '#94a3b8'} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginRight: 8,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerAvatarText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#2563eb',
  },
  headerName: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  headerListing: {
    fontSize: 12,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
  placeholder: {
    width: 40,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  messagesContent: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#1e293b',
  },
  messageText: {
    fontSize: 15,
    fontFamily: 'Geist-Regular',
    lineHeight: 20,
    marginBottom: 4,
  },
  receivedText: {
    color: '#1e293b',
  },
  sentText: {
    color: '#fff',
  },
  messageTime: {
    fontSize: 11,
    fontFamily: 'Geist-Regular',
  },
  receivedTime: {
    color: '#94a3b8',
  },
  sentTime: {
    color: '#cbd5e1',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: 'Geist-Regular',
    color: '#1e293b',
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#f1f5f9',
  },
});
