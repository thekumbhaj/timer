# Timer App

A React Native application built with Expo for managing multiple timers with categories, themes, and history tracking.

## Features

### Timer Management
- Create multiple timers with custom names and durations
- Start, pause, and reset timers
- Visual progress bar with color indicators
- Percentage completion display
- Timer completion notifications

### Categories
- Predefined categories: Work, Personal, Study, Exercise
- Category-based organization of timers
- Category filtering
- Expandable/collapsible category sections
- Bulk actions per category (Start All, Pause All, Reset All)

### Theme Support
- Light and dark mode support
- Automatic theme switching
- Consistent color scheme across the app
- Theme-aware UI components

### History Tracking
- Automatic timer completion logging
- Detailed history view with completion times
- Category-based history filtering
- History export functionality
- Clear history option

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your Android device (for testing)

## Setup Instructions

### 1. Install Node.js and npm
1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the installation wizard
3. Verify installation by opening Command Prompt and running:
   ```bash
   node --version
   npm --version
   ```

### 2. Install Project Dependencies
1. Clone the repository:
   ```bash
   git clone (https://github.com/thekumbhaj/timer)
   cd timer-app
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### 3. Install Expo Go
1. On your Android device, open the Google Play Store
2. Search for "Expo Go"
3. Install the Expo Go app

### 4. Run the Application
1. Start the Expo development server:
   ```bash
   npx expo start
   ```
2. You'll see a QR code in your terminal
3. On your Android device:
   - Open the Expo Go app
   - Tap "Scan QR Code"
   - Scan the QR code from your terminal
4. The app will load on your device

## Development Assumptions

1. **Timer Management**
   - Timers are stored locally using AsyncStorage
   - Timer duration is specified in seconds
   - Only one timer can be active at a time
   - Timer state persists between app restarts

2. **Categories**
   - Categories are predefined and cannot be modified
   - Each timer must belong to a category
   - Categories are used for both organization and filtering

3. **Theme Support**
   - Theme preference is not persisted between sessions
   - Theme colors are consistent across all components
   - Theme switching is immediate and affects all screens

4. **History**
   - History entries include:
     - Timer name
     - Category
     - Duration
     - Completion timestamp
   - History can be filtered by category
   - History can be exported as JSON

## Troubleshooting

### Common Issues

1. **Metro Bundler fails to start**
   - Clear Metro cache:
     ```bash
     npx expo start --clear
     ```

2. **App not loading on device**
   - Ensure your phone and computer are on the same network
   - Try switching between LAN and Tunnel connection in Expo
   - Restart the Expo development server

3. **Dependencies issues**
   - Clear npm cache:
     ```bash
     npm cache clean --force
     ```
   - Delete node_modules and reinstall:
     ```bash
     rm -rf node_modules
     npm install
     ```

4. **App crashes on startup**
   - Clear Expo Go app data
   - Restart the Expo development server
   - Rebuild the app:
     ```bash
     npx expo start --clear
     ```

## Development Tips

1. **Hot Reloading**
   - Changes to your code will automatically reload in the app
   - Shake your device to open the developer menu

2. **Debugging**
   - Use the Expo developer menu on your device
   - Enable remote debugging in the developer menu
   - View console logs in the terminal

3. **Testing on Different Devices**
   - Install Expo Go on multiple devices
   - Scan the QR code on each device
   - Test on different screen sizes and orientations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
