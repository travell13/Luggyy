import { supabase } from './supabase';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { decode } from 'base64-arraybuffer';

/**
 * Upload an image to Supabase storage
 * @param {string} bucket - The storage bucket name ('listing-images' or 'avatars')
 * @param {string} filePath - The local file path from ImagePicker
 * @param {string} userId - The user's ID (for organizing files)
 * @param {string} fileName - Optional custom file name (defaults to timestamp-based name)
 * @returns {Promise<{url: string|null, error: Error|null}>}
 */
export async function uploadImage(bucket, filePath, userId, fileName = null) {
    try {
        // Create a unique filename if not provided
        const timestamp = Date.now();
        const fileExt = filePath.split('.').pop();
        const finalFileName = fileName || `${timestamp}.${fileExt}`;
        const storagePath = `${userId}/${finalFileName}`;

        // Read file as base64 and convert to ArrayBuffer
        const base64 = await FileSystem.readAsStringAsync(filePath, {
            encoding: 'base64',
        });
        const arrayBuffer = decode(base64);

        // Upload to Supabase as ArrayBuffer (avoids Blob issues)
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(storagePath, arrayBuffer, {
                contentType: `image/${fileExt}`,
                upsert: false
            });

        if (error) {
            console.error('Upload error:', error);
            return { url: null, error };
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(storagePath);

        return { url: publicUrl, error: null };
    } catch (error) {
        console.error('Upload exception:', error);
        return { url: null, error };
    }
}

/**
 * Delete an image from Supabase storage
 * @param {string} bucket - The storage bucket name
 * @param {string} filePath - The file path in storage (e.g., 'userId/filename.jpg')
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export async function deleteImage(bucket, filePath) {
    try {
        const { error } = await supabase.storage
            .from(bucket)
            .remove([filePath]);

        if (error) {
            console.error('Delete error:', error);
            return { success: false, error };
        }

        return { success: true, error: null };
    } catch (error) {
        console.error('Delete exception:', error);
        return { success: false, error };
    }
}

/**
 * Pick an image from device gallery
 * @returns {Promise<{uri: string|null, cancelled: boolean}>}
 */
export async function pickImage() {
    try {
        // Request permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to upload images!');
            return { uri: null, cancelled: true };
        }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8, // Compress to 80% quality
        });

        if (result.canceled) {
            return { uri: null, cancelled: true };
        }

        return { uri: result.assets[0].uri, cancelled: false };
    } catch (error) {
        console.error('Image picker error:', error);
        return { uri: null, cancelled: true };
    }
}

/**
 * Upload avatar image for a user
 * @param {string} userId - The user's ID
 * @param {string} imageUri - The local image URI
 * @returns {Promise<{url: string|null, error: Error|null}>}
 */
export async function uploadAvatar(userId, imageUri) {
    return uploadImage('avatars', imageUri, userId, 'avatar.jpg');
}

/**
 * Upload listing image
 * @param {string} userId - The user's ID
 * @param {string} imageUri - The local image URI
 * @param {string} listingId - Optional listing ID for organizing
 * @returns {Promise<{url: string|null, error: Error|null}>}
 */
export async function uploadListingImage(userId, imageUri, listingId = null) {
    const fileName = listingId ? `listing_${listingId}_${Date.now()}.jpg` : null;
    return uploadImage('listing-images', imageUri, userId, fileName);
}

/**
 * Get the public URL for a storage file
 * @param {string} bucket - The storage bucket name
 * @param {string} filePath - The file path in storage
 * @returns {string} Public URL
 */
export function getPublicUrl(bucket, filePath) {
    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
    return publicUrl;
}
