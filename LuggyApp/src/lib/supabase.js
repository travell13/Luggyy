import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project credentials
// Get these from https://app.supabase.com/project/_/settings/api
const SUPABASE_URL = 'https://hujpbqaimtvjgperlysc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1anBicWFpbXR2amdwZXJseXNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTI2NDksImV4cCI6MjA3OTgyODY0OX0.vghgEy-11IGdzuDMTIbr9pTaMtbNn9pvtgfUshfaIWo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
