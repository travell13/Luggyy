# Supabase Setup Guide for Luggy App

## Overview

This guide will walk you through setting up your Supabase project for the Luggy app, including database tables, authentication, and storage.

## Prerequisites

- Supabase account (sign up at https://supabase.com)
- Your Supabase project already created with credentials in `src/lib/supabase.js`

---

## Step 1: Run Database Migration

### Option A: Using Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**

   - Go to https://app.supabase.com
   - Select your project: `kdfrzrpilylnprjrvadr`

2. **Navigate to SQL Editor**

   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and Paste Migration**

   - Open the file: `supabase/migrations/001_initial_schema.sql`
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click "Run" button

4. **Verify Tables Created**
   - Go to "Table Editor" in left sidebar
   - You should see these tables:
     - `profiles`
     - `storage_listings`
     - `bookings`
     - `chats`
     - `messages`
     - `favorites`
     - `reviews`

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
cd /home/brijesh13/projects/travelAss/Luggyy/LuggyApp
supabase link --project-ref kdfrzrpilylnprjrvadr

# Run migration
supabase db push
```

---

## Step 2: Configure Authentication

1. **Enable Email Authentication**

   - In Supabase Dashboard, go to "Authentication" → "Providers"
   - Ensure "Email" is enabled
   - Configure email templates if desired

2. **Email Verification Settings**

   - Go to "Authentication" → "Settings"
   - Under "Email Auth", you can:
     - Enable/disable email confirmation
     - Set redirect URLs for email confirmation
     - Customize email templates

3. **Optional: Enable Social Auth**

   **For Google OAuth:**

   - Go to "Authentication" → "Providers"
   - Enable "Google"
   - Add your Google OAuth credentials (Client ID & Secret)
   - Set authorized redirect URIs

   **For KakaoTalk (if needed):**

   - Would require custom OAuth2 setup
   - Refer to Supabase OAuth docs

---

## Step 3: Configure Storage Buckets

1. **Navigate to Storage**

   - In Supabase Dashboard, click "Storage" in sidebar

2. **Create Buckets**

   **Create "listing-images" bucket:**

   - Click "Create bucket"
   - Name: `listing-images`
   - Public bucket: ✅ Yes (so images can be publicly accessed)
   - File size limit: 5 MB (adjust as needed)
   - Allowed MIME types: `image/jpeg, image/png, image/webp`

   **Create "avatars" bucket:**

   - Click "Create bucket"
   - Name: `avatars`
   - Public bucket: ✅ Yes
   - File size limit: 2 MB
   - Allowed MIME types: `image/jpeg, image/png, image/webp`

3. **Set Storage Policies**

   Run these SQL commands in SQL Editor:

   ```sql
   -- Policy for listing images
   CREATE POLICY "Anyone can view listing images"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'listing-images');

   CREATE POLICY "Authenticated users can upload listing images"
   ON storage.objects FOR INSERT
   WITH CHECK (
     bucket_id = 'listing-images'
     AND auth.role() = 'authenticated'
   );

   CREATE POLICY "Users can update their own listing images"
   ON storage.objects FOR UPDATE
   USING (
     bucket_id = 'listing-images'
     AND auth.uid()::text = (storage.foldername(name))[1]
   );

   -- Policy for avatars
   CREATE POLICY "Anyone can view avatars"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'avatars');

   CREATE POLICY "Authenticated users can upload avatars"
   ON storage.objects FOR INSERT
   WITH CHECK (
     bucket_id = 'avatars'
     AND auth.role() = 'authenticated'
   );

   CREATE POLICY "Users can update their own avatar"
   ON storage.objects FOR UPDATE
   USING (
     bucket_id = 'avatars'
     AND auth.uid()::text = (storage.foldername(name))[1]
   );
   ```

---

## Step 4: Verify Setup

### Check Tables

```sql
-- Verify all tables exist and have correct structure
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
```

### Check RLS Policies

```sql
-- Verify Row Level Security is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

### Check Triggers

```sql
-- Verify triggers are created
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public';
```

---

## Step 5: Test Authentication

1. **Run the app**

   ```bash
   cd /home/brijesh13/projects/travelAss/Luggyy/LuggyApp
   npx expo start --tunnel
   ```

2. **Test Signup**

   - Open app in Expo Go
   - Navigate to Signup screen
   - Create a test account
   - Check Supabase Dashboard → Authentication → Users
   - Verify profile was auto-created in profiles table

3. **Test Login**
   - Login with the test account
   - Verify the app navigates to main screen

---

## Database Schema Overview

### Core Tables

**profiles** - User profile information

- Automatically created when user signs up
- Stores username, avatar, bio, ratings

**storage_listings** - Storage space listings

- Created by hosts
- Contains location, price, amenities, images

**bookings** - Storage rental bookings

- Connects renters with listings
- Tracks booking status and dates

**chats** - Chat conversations

- One chat per pair of users per listing

**messages** - Individual chat messages

- Belongs to a chat
- Automatically updates chat's last_message

**favorites** - User's saved listings

- Allows users to bookmark listings

**reviews** - Listing reviews

- One review per completed booking
- Automatically updates listing rating

### Key Features

✅ **Row Level Security (RLS)** - All tables secured with policies
✅ **Auto-create profile** - Profile created automatically on signup
✅ **Auto-update ratings** - Listing ratings calculated from reviews
✅ **Auto-update timestamps** - updated_at fields automatically updated
✅ **Chat last message** - Automatically tracked

---

## Troubleshooting

### Issue: Migration fails with "permission denied"

**Solution:** Make sure you're logged in to Supabase and have proper permissions

### Issue: Profile not created after signup

**Solution:** Check that the trigger `on_auth_user_created` exists and is enabled

### Issue: Can't upload images to storage

**Solution:** Verify storage buckets are created and policies are set

### Issue: RLS policies blocking operations

**Solution:** Check auth context with `SELECT auth.uid()` in SQL Editor while logged in

---

## Next Steps

After completing this setup:

1. ✅ Test user registration and login
2. ✅ Test creating a storage listing
3. ✅ Test uploading images
4. ✅ Test the booking flow
5. ✅ Test chat functionality

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
