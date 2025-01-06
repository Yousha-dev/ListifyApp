# ListifyApp

ListifyApp is a dynamic mobile application designed for auction listings, user profiles, bidding, chatting, and more. It allows users to create new auction listings, browse available items, bid on auctions, save favorite items, and communicate with sellers via chat.

## Features
- User authentication (Login/Registration)
- Browse auction listings by category
- Create and manage auction listings
- Bid on auction items
- Save items to your watchlist
- In-app chat with item listers
- Google Maps integration for item locations
- Camera functionality to capture item images

## Screens
- **Splash Screen**: The app's intro screen
- **Auth Screens**: Login and registration forms
- **Main Screens**: Home, Profile, Add Item, Chat, and Watchlist screens
- **Chat Screens**: View and chat with item listers
- **Home Screens**: Item details and bid functionality

## Tech Stack
- React Native
- React Navigation
- Firebase (for notifications)
- Google Maps API
- React Native Vision Camera
- React Native Image Picker
- Geocoding API

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js**: [Install Node.js](https://nodejs.org/)
- **Watchman**: [Install Watchman](https://facebook.github.io/watchman/docs/install)
- **React Native CLI**: Install it globally via npm:
  ```bash
  npm install -g @react-native-community/cli
  ```
- **Android Studio**: For Android builds
- **Xcode** (macOS only): For iOS builds

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Yousha-dev/ListifyApp.git
   cd ListifyApp
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Initialize the React Native Project** (If Starting a New Project)
   ```bash
   npx @react-native-community/cli init Listify
   ```

4. **Start the Metro Bundler**
   ```bash
   npx react-native start
   ```

5. **Run on Android**
   ```bash
   npx react-native run-android
   ```

6. **Run on iOS** (macOS only)
   ```bash
   npx react-native run-ios
   ```

### Troubleshooting

#### Run Doctor
Check your setup for issues:
```bash
npx react-native doctor
```

#### Clean and Rebuild Android Project
If you encounter Android build issues:
```bash
cd android
./gradlew clean
./gradlew --stop
./gradlew --daemon
cd ..
```

### Firebase Setup
1. Create a Firebase project in the Firebase Console
2. Follow the official React Native Firebase setup guides:
   - [React Native Firebase Android Setup](https://rnfirebase.io/docs/v6.x.x/installation/android)
   - [React Native Firebase iOS Setup](https://rnfirebase.io/docs/v6.x.x/installation/ios)

### Google Maps Setup
1. Go to the Google Cloud Console and enable the Google Maps API
2. Get your API key and configure it in the app for location services

### Camera Implementation
Example of requesting camera permissions:

```javascript
const requestCameraPermission = async () => {
  const permission = await Camera.requestCameraPermission();
  if (permission === 'authorized') {
    setCameraPermission(true);
  } else {
    Alert.alert('Camera permission not granted.');
  }
};
```

## Contributing
We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Add your changes and commit them
4. Push your changes to your forked repository
5. Create a pull request to the main branch

Please ensure your contributions are well-tested and include necessary documentation updates.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
