# Setup guide

## Requirements
- Node.js 18 or newer
- npm
- A terminal

## 1. Install dependencies
```bash
npm install
```

## 2. Configure environment variables
If you want to use Firebase-backed features, create a `.env` file in the project root and add the values you need for your Firebase project.

Example:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 3. Start the app
### Web app
```bash
npm run dev
```

### Backend starter
```bash
npm run backend:dev
```

### Mobile starter
```bash
npm run mobile:web
```

## 4. Troubleshooting
- Run `npm install` again if dependencies are missing.
- Check the terminal output for port conflicts.
- Make sure your Firebase config is correct if the backend or app fails to initialize.

