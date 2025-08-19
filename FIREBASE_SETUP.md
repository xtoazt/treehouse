# 🔥 Firebase Setup Guide for Treehouse

This guide will walk you through setting up Firebase for your Treehouse family tree application step by step.

## 📋 Prerequisites

- Google account
- Node.js installed on your computer
- Treehouse project downloaded/cloned

## 🚀 Step 1: Create a Firebase Project

1. **Go to Firebase Console**
   - Open your web browser and go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Sign in with your Google account

2. **Create New Project**
   - Click "Create a project" or "Add project"
   - Enter project name: `treehouse-family-tree` (or your preferred name)
   - Click "Continue"

3. **Configure Google Analytics** (Optional but recommended)
   - Choose whether to enable Google Analytics
   - If enabled, select your Analytics account or create a new one
   - Click "Create project"

4. **Wait for Project Creation**
   - Firebase will set up your project (this takes 30-60 seconds)
   - Click "Continue" when ready

## 🔐 Step 2: Set Up Authentication

1. **Navigate to Authentication**
   - In the Firebase Console, click on "Authentication" in the left sidebar
   - Click on the "Get started" button

2. **Configure Sign-in Methods**
   - Go to the "Sign-in method" tab
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

3. **Optional: Add Additional Sign-in Methods**
   - For Google Sign-in: Click "Google" → Enable → Select support email → Save
   - For Facebook/Twitter: Follow similar steps if desired

## 🗄️ Step 3: Set Up Firestore Database

1. **Navigate to Firestore**
   - Click on "Firestore Database" in the left sidebar
   - Click "Create database"

2. **Choose Security Rules**
   - Select "Start in test mode" for development
   - **Important**: We'll configure proper security rules later
   - Click "Next"

3. **Choose Location**
   - Select a location closest to your users
   - **Note**: This cannot be changed later
   - Click "Enable"

4. **Wait for Database Creation**
   - Firestore will initialize (takes 1-2 minutes)

## 📁 Step 4: Set Up Storage

1. **Navigate to Storage**
   - Click on "Storage" in the left sidebar
   - Click "Get started"

2. **Configure Security Rules**
   - Choose "Start in test mode"
   - Click "Next"

3. **Choose Location**
   - Use the same location as your Firestore database
   - Click "Done"

## 🔧 Step 5: Get Firebase Configuration

1. **Add Web App**
   - In the Firebase Console overview, click the web icon (`</>`)
   - Enter app nickname: "Treehouse Web App"
   - **Optional**: Check "Set up Firebase Hosting" if you want to deploy later
   - Click "Register app"

2. **Copy Configuration**
   - Firebase will show you a configuration object that looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef123456"
   };
   ```
   - **Copy this entire object** - you'll need it in the next step
   - Click "Continue to console"

## ⚙️ Step 6: Configure Your Treehouse App

1. **Open Firebase Config File**
   - Navigate to your Treehouse project folder
   - Open `src/firebase/config.ts`

2. **Replace Configuration**
   - Replace the placeholder values with your actual Firebase config:
   ```typescript
   const firebaseConfig = {
     apiKey: "your-actual-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-actual-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-actual-sender-id",
     appId: "your-actual-app-id"
   };
   ```

3. **Save the File**
   - Make sure to save the file after making changes

## 🔒 Step 7: Configure Security Rules

### Firestore Rules

1. **Navigate to Firestore Rules**
   - Go to Firestore Database → Rules tab
   - Replace the default rules with these secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Family tree access control
    match /familyTrees/{treeId} {
      allow read, write: if request.auth != null && 
        (resource.data.createdBy == request.auth.uid || 
         request.auth.uid in resource.data.collaborators[].userId);
    }
    
    // Family members within a tree
    match /familyTrees/{treeId}/members/{memberId} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/familyTrees/$(treeId)) &&
        (get(/databases/$(database)/documents/familyTrees/$(treeId)).data.createdBy == request.auth.uid ||
         request.auth.uid in get(/databases/$(database)/documents/familyTrees/$(treeId)).data.collaborators[].userId);
    }
    
    // Photos, stories, events follow the same pattern
    match /photos/{photoId} {
      allow read, write: if request.auth != null;
    }
    
    match /stories/{storyId} {
      allow read, write: if request.auth != null;
    }
    
    match /events/{eventId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

2. **Publish Rules**
   - Click "Publish" to save the rules

### Storage Rules

1. **Navigate to Storage Rules**
   - Go to Storage → Rules tab
   - Replace with these secure rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /photos/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /profiles/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

2. **Publish Rules**
   - Click "Publish"

## 🧪 Step 8: Test Your Setup

1. **Start Your Development Server**
   ```bash
   cd treehouse
   npm start
   ```

2. **Test Authentication**
   - Go to `http://localhost:3000`
   - Try to create a new account
   - Try to sign in with the account

3. **Check Firebase Console**
   - Go to Authentication → Users
   - You should see your test user appear

4. **Test Database Connection**
   - Try creating some family tree data in the app
   - Check Firestore Database to see if data appears

## 🚀 Step 9: Optional - Set Up Hosting

If you want to deploy your app to the web:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your project
   - Choose `build` as your public directory
   - Configure as single-page app: Yes
   - Don't overwrite index.html

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🔧 Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Check that your Firebase config in `src/firebase/config.ts` is correct
   - Ensure all fields are filled with your actual values (not placeholders)

2. **"Missing or insufficient permissions"**
   - Check your Firestore security rules
   - Make sure you're authenticated when trying to access data

3. **"Storage: User does not have permission"**
   - Check your Storage security rules
   - Ensure the user is authenticated

4. **App won't start after adding Firebase config**
   - Check for syntax errors in `config.ts`
   - Ensure all quotes and commas are correct

### Getting Help:

- Check the browser console for error messages
- Review Firebase documentation: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- Check the Treehouse GitHub repository for issues

## 🎉 You're All Set!

Your Firebase backend is now configured and ready to power your Treehouse family tree application! 

### Next Steps:
- Explore the app features
- Invite family members to join
- Start building your family tree
- Upload photos and share stories

### Security Reminders:
- Never commit your Firebase config with real API keys to public repositories
- Regularly review your Firebase usage and billing
- Update security rules as your app grows
- Enable Firebase App Check for additional security in production

---

**Need help?** Create an issue in the Treehouse repository or check the Firebase documentation for more detailed information.
