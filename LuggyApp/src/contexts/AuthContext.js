import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';
import * as Linking from 'expo-linking';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Handle Deep Links (Magic Links / Email Confirmation)
    useEffect(() => {
        // Log the redirect URL for the user to configure in Supabase
        const redirectUrl = Linking.createURL('/auth/callback');
        console.log('--------------------------------------------------');
        console.log('PLEASE ADD THIS URL TO SUPABASE REDIRECT URLS:');
        console.log(redirectUrl);
        console.log('--------------------------------------------------');

        const handleDeepLink = (event) => {
            const url = event.url;
            if (!url) return;

            // Extract tokens from the URL fragment (Supabase sends #access_token=...&refresh_token=...)
            // Example: luggyapp://auth/callback#access_token=...&refresh_token=...&...
            if (url.includes('access_token') && url.includes('refresh_token')) {
                const getParameterByName = (name, urlString) => {
                    name = name.replace(/[\[\]]/g, '\\$&');
                    const regex = new RegExp('[#&]' + name + '(=([^&#]*)|&|#|$)');
                    const results = regex.exec(urlString);
                    if (!results) return null;
                    if (!results[2]) return '';
                    return decodeURIComponent(results[2].replace(/\+/g, ' '));
                };

                const accessToken = getParameterByName('access_token', url);
                const refreshToken = getParameterByName('refresh_token', url);

                if (accessToken && refreshToken) {
                    supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    }).then(({ error }) => {
                        if (error) console.error('Error setting session from deep link:', error);
                    });
                }
            }
        };

        // Handle app launch from link
        Linking.getInitialURL().then((url) => {
            if (url) handleDeepLink({ url });
        });

        // Handle links while app is open
        const subscription = Linking.addEventListener('url', handleDeepLink);

        return () => {
            subscription.remove();
        };
    }, []);

    const value = {
        user,
        session,
        loading,
        signUp: async (email, password, username) => {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username,
                    },
                    emailRedirectTo: Linking.createURL('/auth/callback'),
                },
            });
            return { data, error };
        },
        signIn: async (email, password) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            return { data, error };
        },
        signOut: async () => {
            const { error } = await supabase.auth.signOut();
            return { error };
        },
        signInWithGoogle: async () => {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            return { data, error };
        },
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
