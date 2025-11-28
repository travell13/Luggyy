-- Storage bucket policies for Luggy app
-- Run this AFTER creating the storage buckets in Supabase dashboard

-- ============================================
-- LISTING IMAGES BUCKET POLICIES
-- ============================================

-- Anyone can view listing images
CREATE POLICY "Anyone can view listing images"
ON storage.objects FOR SELECT
USING (bucket_id = 'listing-images');

-- Authenticated users can upload listing images
-- Images should be organized by user ID: user_id/filename.jpg
CREATE POLICY "Authenticated users can upload listing images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'listing-images' 
    AND auth.role() = 'authenticated'
);

-- Users can update their own listing images
CREATE POLICY "Users can update their own listing images"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'listing-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own listing images
CREATE POLICY "Users can delete their own listing images"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'listing-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ============================================
-- AVATARS BUCKET POLICIES
-- ============================================

-- Anyone can view avatars
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Authenticated users can upload avatars
-- Avatars should be named: user_id/avatar.jpg
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.role() = 'authenticated'
);

-- Users can update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);
