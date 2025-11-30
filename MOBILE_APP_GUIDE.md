# Rep Rumble Mobile App Setup Guide

Your web app has been successfully configured to build as a mobile app using **Capacitor**!

## What's Been Set Up

1. **Capacitor installed** - Native mobile wrapper for your React app
2. **Android platform added** - Ready to build Android APK
3. **iOS platform added** - Ready for iOS development (requires Xcode)
4. **Build scripts added** to package.json

## Project Structure

```
Rep-Rummble/
├── android/          # Android native project
├── ios/              # iOS native project
├── dist/             # Built web app (gets copied to mobile)
├── capacitor.config.ts  # Capacitor configuration
└── src/              # Your React source code
```

## Building for Android (APK)

### Prerequisites

You need to install **Android Studio** first:

1. Download from: https://developer.android.com/studio
2. Install Android Studio
3. During installation, make sure to install:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (for emulator)

### Steps to Build APK

1. **Sync your code with Android:**
   ```bash
   npm run mobile:sync
   ```

2. **Open Android Studio:**
   ```bash
   npm run mobile:android
   ```

   Or manually:
   ```bash
   npx cap open android
   ```

3. **In Android Studio:**
   - Wait for Gradle sync to complete
   - Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
   - APK will be generated at: `android/app/build/outputs/apk/debug/app-debug.apk`

4. **Alternative: Command Line Build**

   If you have Android SDK installed, you can build from terminal:
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

   APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

## Building for iOS

### Prerequisites

- macOS required
- Xcode installed from App Store
- Apple Developer account (for device testing)

### Steps to Build for iOS

1. **Install CocoaPods:**
   ```bash
   sudo gem install cocoapods
   ```

2. **Sync and update iOS dependencies:**
   ```bash
   npm run mobile:sync
   cd ios/App
   pod install
   cd ../..
   ```

3. **Open Xcode:**
   ```bash
   npm run mobile:ios
   ```

4. **In Xcode:**
   - Select your development team
   - Choose a device or simulator
   - Click the Play button to build and run

## NPM Scripts Available

```bash
# Build web app and sync with mobile platforms
npm run mobile:build

# Sync web assets to mobile platforms
npm run mobile:sync

# Open Android Studio
npm run mobile:android

# Open Xcode (macOS only)
npm run mobile:ios
```

## Development Workflow

1. **Make changes to your React code** in `src/`
2. **Test in browser** with `npm run dev`
3. **Build for mobile:**
   ```bash
   npm run mobile:sync
   ```
4. **Open in Android Studio/Xcode** and run

## Testing the APK

Once you have the APK file:

1. **Install on physical device:**
   - Enable Developer Mode and USB Debugging on your Android phone
   - Connect via USB
   - Use `adb install app-debug.apk`
   - Or copy APK to phone and install directly

2. **Test on emulator:**
   - Create an Android Virtual Device in Android Studio
   - Drag and drop APK onto emulator

## Configuration

### App Details

Edit [capacitor.config.ts](capacitor.config.ts):

```typescript
const config: CapacitorConfig = {
  appId: 'com.reprumble.app',      // Change package name here
  appName: 'Rep Rumble',            // Change app name here
  webDir: 'dist'                    // Built web assets directory
};
```

### Permissions

Android permissions are in: `android/app/src/main/AndroidManifest.xml`
iOS permissions are in: `ios/App/App/Info.plist`

## Common Issues

### Android Build Fails
- Make sure Android Studio is installed
- Run `cd android && ./gradlew clean` then try again
- Check Java version: `java -version` (need Java 11+)

### iOS Build Fails
- Run `pod install` in `ios/App/` directory
- Clean build folder in Xcode: Product → Clean Build Folder
- Make sure Xcode Command Line Tools are installed

### App Doesn't Update
- Always run `npm run mobile:sync` after making web changes
- In Android Studio: Build → Clean Project → Rebuild Project

## Next Steps

1. Install Android Studio if not already installed
2. Run `npm run mobile:sync` to sync your latest web build
3. Run `npm run mobile:android` to open in Android Studio
4. Build the APK and test on your device!

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Studio Guide](https://developer.android.com/studio/intro)
- [iOS Development Guide](https://capacitorjs.com/docs/ios)
