# Email Verification Setup Guide

## Problem

Email verification links currently redirect to `localhost:3000` instead of opening the mobile app.

## Solution

We've implemented deep linking so email verification links open the Luggy app directly.

---

## What Was Changed

### 1. App Configuration

**File:** `app.json`

- Added `"scheme": "luggyapp"` to enable deep linking

### 2. Deep Linking Handler

**File:** `src/lib/deepLinking.js` (new file)

- Handles email verification links
- Verifies the email token automatically
- Shows success/error alerts

### 3. App Initialization

**File:** `App.js`

- Imports deep linking handler
- Listens for verification links
- Shows confirmation alerts

---

## Supabase Dashboard Configuration

### Step 1: Update Email Template

1. Go to Supabase Dashboard → **Authentication** → **Email Templates**
2. Select **"Confirm signup"** template
3. Find this line:

   ```html
   <a href="{{ .ConfirmationURL }}">Confirm your mail</a>
   ```

4. **Replace it with:**

   ```html
   <a href="luggyapp://confirm?token={{ .Token }}&type=signup"
     >Confirm your mail</a
   >
   ```

5. Click **Save**

### Step 2: Add Redirect URLs (Optional but Recommended)

1. Go to **Authentication** → **URL Configuration**
2. Under **Redirect URLs**, add:
   ```
   luggyapp://*
   exp://127.0.0.1:8081
   ```
3. Click **Save**

---

## Testing Email Verification

### Test Flow:

1. **Sign up** in the app with a real email address
2. **Check your inbox** for verification email from Luggy
3. **Click the "Confirm your mail" link** in the email
4. **App should open automatically** and show:
   - ✅ "Success - Your email has been verified! You can now log in."
5. **Login** with your credentials
6. **You're in!** 🎉

### If app doesn't open:

- On iOS: May need to reload the app after adding the scheme
- On Android: App should work immediately
- The link will work in both Expo Go and standalone builds

---

## Alternative: Disable Email Verification (For Testing Only)

If you want to skip email verification during development:

1. Go to Supabase → **Authentication** → **Settings**
2. Under **Email Auth**, find **"Enable email confirmations"**
3. Toggle it **OFF**
4. Users can now login immediately after signup (no verification needed)

⚠️ **Important:** Re-enable this for production to prevent fake signups!

---

## How It Works

```
User clicks email link
        ↓
luggyapp://confirm?token=abc123
        ↓
Deep link opens app
        ↓
deepLinking.js handles the URL
        ↓
Verifies token with Supabase
        ↓
Shows success alert
        ↓
User can now login!
```

---

## Restart the App

After these changes, restart your Expo development server:

```bash
# Kill the current server (Ctrl+C)
# Then restart:
cd /home/brijesh13/projects/travelAss/Luggyy/LuggyApp
npx expo start --clear
```

---

## Troubleshooting

**Link opens browser instead of app:**

- Make sure `scheme: "luggyapp"` is in app.json
- Restart the Expo server
- Reload the app in Expo Go

**"Invalid token" error:**

- Token may have expired (tokens expire after 24 hours)
- Sign up again and verify immediately

**App doesn't show alert:**

- Check console logs for errors
- Make sure deep linking code is imported in App.js

---

## What's Next

After email verification is working:

1. ✅ Test the full signup → verify → login flow
2. 📱 Test on both iOS and Android (if applicable)
3. 🚀 Move on to building app features!
