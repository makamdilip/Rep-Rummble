# Rep Rumble - Setup Guide

Complete guide for setting up the Rep Rumble development environment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Development Workflow](#development-workflow)

---

## Prerequisites

### Required Software

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **npm** 10+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **MongoDB** (local or Atlas account)

### Optional Tools

- **VS Code** - Recommended editor
- **MongoDB Compass** - Database GUI
- **Postman** - API testing
- **Docker** - Containerization (optional)

### Verify Installation

```bash
node --version  # Should be 20+
npm --version   # Should be 10+
git --version
```

---

## Project Structure

```
Rep-Rummble/
├── client/                      # Frontend (implicit root)
│   ├── src/
│   │   ├── components/
│   │   │   ├── features/       # Feature-specific components
│   │   │   │   ├── auth/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── nutrition/
│   │   │   │   ├── workout/
│   │   │   │   └── leaderboard/
│   │   │   ├── ui/             # Reusable UI components
│   │   │   └── common/         # Shared components
│   │   ├── context/            # React Context providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API services
│   │   │   ├── api/            # Backend API calls
│   │   │   └── external/       # External APIs (AI, etc)
│   │   ├── firebase/           # Firebase configuration
│   │   ├── utils/              # Helper functions
│   │   ├── types/              # TypeScript types
│   │   ├── pages/              # Page components
│   │   └── styles/             # Global styles
│   ├── public/                 # Static assets
│   └── index.html              # HTML entry point
├── server/                      # Backend API
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── models/             # Mongoose models
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Express middleware
│   │   ├── services/           # Business logic
│   │   ├── config/             # Configuration
│   │   └── server.ts           # Server entry point
│   └── tests/                  # Backend tests
├── .github/workflows/          # CI/CD workflows
├── .env.example                # Frontend env template
├── server/.env.example         # Backend env template
├── package.json                # Frontend dependencies
├── server/package.json         # Backend dependencies
└── README.md                   # Main documentation
```

---

## Frontend Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/Rep-Rummble.git
cd Rep-Rummble
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all frontend dependencies including:
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Firebase
- Framer Motion
- And more...

### Step 3: Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and add your keys:

```bash
# Google Gemini AI API Key
# Get from: https://makersuite.google.com/app/apikey
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration
# Get from: Firebase Console > Project Settings
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# USDA FoodData Central API Key (optional)
# Get from: https://fdc.nal.usda.gov/api-key-signup.html
VITE_USDA_API_KEY=your_usda_api_key_here
```

### Step 4: Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable **Authentication** > **Email/Password**
4. Enable **Firestore Database**
5. Get your configuration from **Project Settings**
6. Add to `.env` file

### Step 5: Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click **Get API Key**
4. Copy the key to `.env`

### Step 6: Run the Frontend

```bash
npm run dev
```

The app will start at: `http://localhost:5173`

---

## Backend Setup

### Step 1: Navigate to Server Directory

```bash
cd server
```

### Step 2: Install Backend Dependencies

```bash
npm install
```

This installs:
- Express
- Mongoose
- JWT authentication
- TypeScript
- And more...

### Step 3: Configure Backend Environment

```bash
# Copy the example file
cp .env.example .env
```

Edit `server/.env`:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/rep-rumble
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rep-rumble

# JWT Configuration
# Generate with: openssl rand -base64 32
JWT_SECRET=your_generated_secret_here
JWT_EXPIRE=7d

# CORS Settings
CLIENT_URL=http://localhost:5173

# Optional: AI Services
GEMINI_API_KEY=your_gemini_api_key
USDA_API_KEY=your_usda_api_key
```

### Step 4: Generate JWT Secret

```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and add to `JWT_SECRET` in `.env`

---

## Database Setup

### Option 1: Local MongoDB

#### Install MongoDB

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Ubuntu:**
```bash
sudo apt-get install -y mongodb
```

**Windows:**
Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

#### Start MongoDB

```bash
# macOS/Linux
mongod --dbpath ~/data/db

# Or as a service
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Ubuntu
```

#### Verify Connection

```bash
mongosh
> show dbs
> exit
```

### Option 2: MongoDB Atlas (Cloud)

#### Step 1: Create Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (M0 Free tier)

#### Step 2: Configure Network Access

1. Go to **Network Access**
2. Click **Add IP Address**
3. Add your current IP or **Allow Access from Anywhere** (for development)

#### Step 3: Create Database User

1. Go to **Database Access**
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Set username and password
5. Give **Read and write to any database** permission

#### Step 4: Get Connection String

1. Click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `rep-rumble`
6. Add to `server/.env` as `MONGODB_URI`

Example:
```
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/rep-rumble?retryWrites=true&w=majority
```

---

## Running the Application

### Development Mode (Both Frontend & Backend)

#### Terminal 1 - Frontend:
```bash
# From project root
npm run dev
```

#### Terminal 2 - Backend:
```bash
# From project root
npm run server:dev

# Or from server directory
cd server
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

### Build for Production

#### Frontend:
```bash
npm run build
npm run preview  # Preview production build
```

#### Backend:
```bash
cd server
npm run build
npm start
```

---

## Development Workflow

### Code Style

The project uses:
- **ESLint** for linting
- **TypeScript** for type safety
- **Prettier** (recommended) for formatting

```bash
# Run linter
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

### Git Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Description of changes"

# Push to remote
git push origin feature/your-feature-name

# Create pull request on GitHub
```

### Testing API Endpoints

Use Postman or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Environment-Specific Configuration

```bash
# Development
NODE_ENV=development npm run dev

# Production
NODE_ENV=production npm run build
```

---

## Troubleshooting

### Frontend Issues

**Port already in use:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Dependencies issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Clear build cache
rm -rf dist
npm run build
```

### Backend Issues

**MongoDB connection failed:**
- Verify MongoDB is running: `mongosh`
- Check connection string in `.env`
- Verify network access in Atlas

**Port 5000 already in use:**
```bash
# Change port in server/.env
PORT=5001
```

**Module not found errors:**
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

### Database Issues

**Can't connect to local MongoDB:**
```bash
# Start MongoDB service
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

**Atlas connection timeout:**
- Check network access whitelist
- Verify username/password
- Check connection string format

---

## Next Steps

1. ✅ **Complete setup** - Follow all steps above
2. 📖 **Read documentation** - Check README.md
3. 🎨 **Explore components** - Browse src/components/
4. 🔧 **Test features** - Try all app functionality
5. 🚀 **Deploy** - See DEPLOYMENT.md when ready

---

## Additional Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Community
- GitHub Issues: Report bugs and request features
- Discussions: Ask questions and share ideas

---

## Getting Help

If you encounter issues:

1. Check this SETUP.md file
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md)
3. Search existing [GitHub Issues](https://github.com/yourusername/Rep-Rummble/issues)
4. Create a new issue with:
   - Detailed description
   - Steps to reproduce
   - Error messages
   - Environment info (OS, Node version, etc.)

---

Happy coding! 💪🔥
