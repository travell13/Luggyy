import * as Linking from 'expo-linking';
import { supabase } from './supabase';

/**
 * Handle deep link for email confirmation
 */
export async function handleDeepLink(url) {
    try {
        const { path, queryParams } = Linking.parse(url);
        
        // Handle direct verification token
        if (path === 'confirm' && queryParams?.token) {
            const { error } = await supabase.auth.verifyOtp({
                token_hash: queryParams.token,
                type: 'signup'
            });
            
            if (error) {
                console.error('Email verification error:', error);
                return { success: false, error };
            }
            
            return { success: true };
        }
        
        // Handle hash fragment tokens (access_token, refresh_token)
        if (path === 'confirm' || url.includes('#access_token=')) {
            // Extract hash params if present
            const hashIndex = url.indexOf('#');
            if (hashIndex !== -1) {
                const hashString = url.substring(hashIndex + 1);
                const hashParams = new URLSearchParams(hashString);
                const accessToken = hashParams.get('access_token');
                const refreshToken = hashParams.get('refresh_token');
                
                if (accessToken && refreshToken) {
                    // Set the session with these tokens
                    const { error } = await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken
                    });
                    
                    if (error) {
                        console.error('Session setup error:', error);
                        return { success: false, error };
                    }
                    
                    return { success: true };
                }
            }
            
            // If no hash params, email is already verified, just confirm success
            return { success: true };
        }
        
        return { success: false };
    } catch (error) {
        console.error('Deep link handling error:', error);
        return { success: false, error };
    }
}

/**
 * Initialize deep linking listener
 */
export function initDeepLinking(callback) {
    // Handle initial URL if app was opened from a link
    Linking.getInitialURL().then(url => {
        if (url) {
            handleDeepLink(url).then(callback);
        }
    });
    
    // Listen for deep links while app is open
    const subscription = Linking.addEventListener('url', ({ url }) => {
        handleDeepLink(url).then(callback);
    });
    
    return () => subscription.remove();
}
