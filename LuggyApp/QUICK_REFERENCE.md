# Supabase Quick Reference

## Files Created

### SQL Migrations

- **001_initial_schema.sql** - All database tables, RLS policies, triggers, and indexes
- **002_storage_policies.sql** - Storage bucket policies for images and avatars

### Utility Files

- **src/lib/supabase.js** - Supabase client configuration ✅
- **src/lib/storage.js** - Image upload/download helpers
- **src/lib/database.js** - Database CRUD operations

### Documentation

- **SUPABASE_SETUP.md** - Complete setup guide

---

## Setup Checklist

### 1. Run Database Migration

```
1. Go to https://app.supabase.com
2. Open SQL Editor
3. Copy contents of: supabase/migrations/001_initial_schema.sql
4. Paste and run
5. Verify tables created in Table Editor
```

### 2. Create Storage Buckets

```
1. Go to Storage in Supabase dashboard
2. Create bucket: "listing-images" (public)
3. Create bucket: "avatars" (public)
4. Run: supabase/migrations/002_storage_policies.sql
```

### 3. Enable Authentication

```
1. Go to Authentication → Providers
2. Enable "Email"
3. (Optional) Enable "Google" for OAuth
```

---

## Database Schema

### Tables

- `profiles` - User profiles (auto-created on signup)
- `storage_listings` - Storage space listings
- `bookings` - Rental bookings
- `chats` - Chat conversations
- `messages` - Chat messages
- `favorites` - Saved listings
- `reviews` - Listing reviews

### Storage Buckets

- `listing-images` - Photos of storage spaces
- `avatars` - User profile pictures

---

## Usage Examples

### Upload Avatar

```javascript
import { pickImage, uploadAvatar } from "./src/lib/storage";
import { useAuth } from "./src/contexts/AuthContext";

const { user } = useAuth();
const { uri } = await pickImage();
if (uri) {
  const { url, error } = await uploadAvatar(user.id, uri);
  if (url) {
    await updateProfile(user.id, { avatar_url: url });
  }
}
```

### Create Storage Listing

```javascript
import { createStorageListing } from "./src/lib/database";

const newListing = {
  host_id: user.id,
  title: "Spacious Storage Room",
  description: "Climate-controlled storage",
  address: "123 Main St, Seoul",
  price_per_day: 5000,
  size_category: "medium",
  storage_type: ["indoor", "climate-controlled"],
  amenities: ["24/7 access", "CCTV"],
  images: [imageUrl1, imageUrl2],
};

const { data, error } = await createStorageListing(newListing);
```

### Get Listings with Filters

```javascript
import { getStorageListings } from "./src/lib/database";

const filters = {
  minPrice: 3000,
  maxPrice: 10000,
  storageType: ["indoor"],
  sortBy: "price_low",
};

const { data, error } = await getStorageListings(filters);
```

### Create Booking

```javascript
import { createBooking } from "./src/lib/database";

const booking = {
  listing_id: listingId,
  renter_id: user.id,
  host_id: listing.host_id,
  start_date: "2025-12-01",
  end_date: "2025-12-31",
  total_days: 30,
  price_per_day: listing.price_per_day,
  total_price: listing.price_per_day * 30,
  items_description: "Suitcases and boxes",
};

const { data, error } = await createBooking(booking);
```

### Send Message

```javascript
import { getOrCreateChat, sendMessage } from "./src/lib/database";

// Get or create chat
const { data: chat } = await getOrCreateChat(userId, hostId, listingId);

// Send message
const { data: message } = await sendMessage(
  chat.id,
  userId,
  "Hi! Is this space still available?"
);
```

---

## Next Steps

1. ✅ Run migration in Supabase dashboard
2. ✅ Create storage buckets
3. ✅ Test signup/login
4. ⏭️ Integrate database functions into screens
5. ⏭️ Test creating listings
6. ⏭️ Test booking flow

---

## Troubleshooting

**Can't create profile**
→ Check that trigger `on_auth_user_created` exists

**Can't upload images**
→ Verify storage buckets exist and policies are set

**Permission denied on queries**
→ Check RLS policies and that user is authenticated

**Need help?**
→ See SUPABASE_SETUP.md for detailed guide
