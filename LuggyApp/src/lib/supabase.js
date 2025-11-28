import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project credentials
// Get these from https://app.supabase.com/project/_/settings/api
const SUPABASE_URL = 'https://kdfrzrpilylnprjrvadr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkZnJ6cnBpbHlsbnByanJ2YWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNzY2NzUsImV4cCI6MjA3OTY1MjY3NX0.Q85x8pTyLl3gto63JRt7Id4WIuXXpgWnL_gNsCmH0vU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
