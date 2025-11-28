import { supabase } from './supabase';

// ============================================
// PROFILES
// ============================================

/**
 * Get user profile by user ID
 */
export async function getProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    
    return { data, error };
}

/**
 * Update user profile
 */
export async function updateProfile(userId, updates) {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
    
    return { data, error };
}

// ============================================
// STORAGE LISTINGS
// ============================================

/**
 * Get all available storage listings
 */
export async function getStorageListings(filters = {}) {
    let query = supabase
        .from('storage_listings')
        .select(`
            *,
            host:profiles!host_id(username, avatar_url, rating)
        `)
        .eq('is_available', true);
    
    // Apply filters
    if (filters.minPrice) {
        query = query.gte('price_per_day', filters.minPrice);
    }
    if (filters.maxPrice) {
        query = query.lte('price_per_day', filters.maxPrice);
    }
    if (filters.storageType && filters.storageType.length > 0) {
        query = query.contains('storage_type', filters.storageType);
    }
    if (filters.sizeCategory) {
        query = query.eq('size_category', filters.sizeCategory);
    }
    
    // Sort
    if (filters.sortBy === 'price_low') {
        query = query.order('price_per_day', { ascending: true });
    } else if (filters.sortBy === 'price_high') {
        query = query.order('price_per_day', { ascending: false });
    } else if (filters.sortBy === 'rating') {
        query = query.order('rating', { ascending: false });
    } else {
        query = query.order('created_at', { ascending: false });
    }
    
    const { data, error } = await query;
    return { data, error };
}

/**
 * Get a single storage listing by ID
 */
export async function getStorageListing(listingId) {
    const { data, error } = await supabase
        .from('storage_listings')
        .select(`
            *,
            host:profiles!host_id(username, full_name, avatar_url, rating, total_reviews)
        `)
        .eq('id', listingId)
        .single();
    
    return { data, error };
}

/**
 * Create a new storage listing
 */
export async function createStorageListing(listing) {
    const { data, error } = await supabase
        .from('storage_listings')
        .insert(listing)
        .select()
        .single();
    
    return { data, error };
}

/**
 * Update a storage listing
 */
export async function updateStorageListing(listingId, updates) {
    const { data, error } = await supabase
        .from('storage_listings')
        .update(updates)
        .eq('id', listingId)
        .select()
        .single();
    
    return { data, error };
}

/**
 * Delete a storage listing
 */
export async function deleteStorageListing(listingId) {
    const { error } = await supabase
        .from('storage_listings')
        .delete()
        .eq('id', listingId);
    
    return { error };
}

/**
 * Get listings by host
 */
export async function getListingsByHost(hostId) {
    const { data, error } = await supabase
        .from('storage_listings')
        .select('*')
        .eq('host_id', hostId)
        .order('created_at', { ascending: false });
    
    return { data, error };
}

// ============================================
// BOOKINGS
// ============================================

/**
 * Create a new booking
 */
export async function createBooking(booking) {
    const { data, error } = await supabase
        .from('bookings')
        .insert(booking)
        .select()
        .single();
    
    return { data, error };
}

/**
 * Get bookings for a user (as renter or host)
 */
export async function getUserBookings(userId) {
    const { data, error } = await supabase
        .from('bookings')
        .select(`
            *,
            listing:storage_listings(*),
            renter:profiles!renter_id(username, avatar_url),
            host:profiles!host_id(username, avatar_url)
        `)
        .or(`renter_id.eq.${userId},host_id.eq.${userId}`)
        .order('created_at', { ascending: false });
    
    return { data, error };
}

/**
 * Update booking status
 */
export async function updateBookingStatus(bookingId, status) {
    const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId)
        .select()
        .single();
    
    return { data, error };
}

// ============================================
// FAVORITES
// ============================================

/**
 * Add listing to favorites
 */
export async function addFavorite(userId, listingId) {
    const { data, error } = await supabase
        .from('favorites')
        .insert({ user_id: userId, listing_id: listingId })
        .select()
        .single();
    
    return { data, error };
}

/**
 * Remove listing from favorites
 */
export async function removeFavorite(userId, listingId) {
    const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('listing_id', listingId);
    
    return { error };
}

/**
 * Get user's favorite listings
 */
export async function getFavorites(userId) {
    const { data, error } = await supabase
        .from('favorites')
        .select(`
            *,
            listing:storage_listings(
                *,
                host:profiles!host_id(username, avatar_url)
            )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    
    return { data, error };
}

/**
 * Check if listing is favorited by user
 */
export async function isFavorite(userId, listingId) {
    const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('listing_id', listingId)
        .maybeSingle();
    
    return { isFavorite: !!data, error };
}

// ============================================
// CHATS & MESSAGES
// ============================================

/**
 * Get or create a chat between two users
 */
export async function getOrCreateChat(participant1Id, participant2Id, listingId = null) {
    // Try to find existing chat
    const { data: existingChat } = await supabase
        .from('chats')
        .select('*')
        .or(`and(participant_1_id.eq.${participant1Id},participant_2_id.eq.${participant2Id}),and(participant_1_id.eq.${participant2Id},participant_2_id.eq.${participant1Id})`)
        .maybeSingle();
    
    if (existingChat) {
        return { data: existingChat, error: null };
    }
    
    // Create new chat
    const { data, error } = await supabase
        .from('chats')
        .insert({
            participant_1_id: participant1Id,
            participant_2_id: participant2Id,
            listing_id: listingId
        })
        .select()
        .single();
    
    return { data, error };
}

/**
 * Get all chats for a user
 */
export async function getUserChats(userId) {
    const { data, error } = await supabase
        .from('chats')
        .select(`
            *,
            participant_1:profiles!participant_1_id(id, username, avatar_url),
            participant_2:profiles!participant_2_id(id, username, avatar_url),
            listing:storage_listings(id, title, images)
        `)
        .or(`participant_1_id.eq.${userId},participant_2_id.eq.${userId}`)
        .order('last_message_at', { ascending: false, nullsFirst: false });
    
    return { data, error };
}

/**
 * Send a message in a chat
 */
export async function sendMessage(chatId, senderId, messageText) {
    const { data, error } = await supabase
        .from('messages')
        .insert({
            chat_id: chatId,
            sender_id: senderId,
            message_text: messageText
        })
        .select()
        .single();
    
    return { data, error };
}

/**
 * Get messages for a chat
 */
export async function getChatMessages(chatId) {
    const { data, error } = await supabase
        .from('messages')
        .select(`
            *,
            sender:profiles!sender_id(username, avatar_url)
        `)
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });
    
    return { data, error };
}

/**
 * Mark messages as read
 */
export async function markMessagesAsRead(chatId, userId) {
    const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('chat_id', chatId)
        .neq('sender_id', userId)
        .eq('is_read', false);
    
    return { error };
}

// ============================================
// REVIEWS
// ============================================

/**
 * Create a review for a booking
 */
export async function createReview(bookingId, reviewerId, rating, comment) {
    const { data, error } = await supabase
        .from('reviews')
        .insert({
            booking_id: bookingId,
            reviewer_id: reviewerId,
            rating,
            comment
        })
        .select()
        .single();
    
    return { data, error };
}

/**
 * Get reviews for a listing
 */
export async function getListingReviews(listingId) {
    const { data, error } = await supabase
        .from('reviews')
        .select(`
            *,
            reviewer:profiles!reviewer_id(username, avatar_url),
            booking:bookings(start_date, end_date)
        `)
        .eq('listing_id', listingId)
        .order('created_at', { ascending: false });
    
    return { data, error };
}

/**
 * Update host response to a review
 */
export async function updateReviewResponse(reviewId, hostResponse) {
    const { data, error } = await supabase
        .from('reviews')
        .update({ host_response: hostResponse })
        .eq('id', reviewId)
        .select()
        .single();
    
    return { data, error };
}
