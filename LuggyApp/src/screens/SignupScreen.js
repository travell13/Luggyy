import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar as RNStatusBar, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // TODO: Implement actual signup logic
    console.log('Signup:', name, email, password);
    // For now, navigate to main app
    // navigation.navigate('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Luggy Logo with Gradient */}
          <View style={styles.logoContainer}>
            <MaskedView
              maskElement={
                <Text style={styles.logoText}>Luggy</Text>
              }
            >
              <LinearGradient
                colors={['rgb(30, 30, 30)', 'rgb(30, 30, 30)', 'rgb(100, 100, 100)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.29, 1]}
                style={styles.logoGradient}
              >
                <Text style={[styles.logoText, { opacity: 0 }]}>Luggy</Text>
              </LinearGradient>
            </MaskedView>
          </View>

          {/* Input Fields */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity onPress={handleSignup} style={styles.signupButtonContainer}>
            <LinearGradient
              colors={['#00D9FF', '#00B4D8', '#0077B6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signupButton}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          {/* Social Login Buttons */}
          <TouchableOpacity style={styles.kakaoButton} onPress={() => console.log('KakaoTalk signup')}>
            <Text style={styles.kakaoButtonText}>Continue with KakaoTalk</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton} onPress={() => console.log('Google signup')}>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 72,
    fontFamily: 'Geist-Bold',
    fontWeight: '600',
    letterSpacing: -2,
  },
  logoGradient: {
    height: 100,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
    marginTop: 8,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Geist-Regular',
    color: '#1e293b',
    backgroundColor: '#f8fafc',
  },
  signupButtonContainer: {
    marginBottom: 24,
  },
  signupButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signupButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#000',
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 12,
    fontFamily: 'Geist-Regular',
    color: '#94a3b8',
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  kakaoButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#000',
  },
  googleButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: 'Geist-Bold',
    color: '#1e293b',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Geist-Regular',
    color: '#64748b',
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Geist-Bold',
    color: '#0077B6',
  },
});
