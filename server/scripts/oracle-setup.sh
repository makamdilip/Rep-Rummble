#!/bin/bash
# ===========================================
# Oracle Cloud VM Setup Script for Rep Rumble
# Run this on your Oracle Cloud VM
# ===========================================

echo "🚀 Setting up Rep Rumble Backend on Oracle Cloud..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 for process management
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install Git
sudo apt install -y git

# Create app directory
mkdir -p ~/apps
cd ~/apps

# Clone your repo (replace with your repo URL)
echo "📥 Cloning repository..."
git clone https://github.com/YOUR_USERNAME/Rep-Rummble.git
cd Rep-Rummble/server

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Create .env file
echo "📝 Creating .env file..."
cat > .env << 'EOF'
# Server Configuration
PORT=5001
NODE_ENV=production
CLIENT_URL=https://your-frontend.vercel.app

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rep-rumble

# Authentication
JWT_SECRET=your-super-secure-secret-key
JWT_EXPIRE=7d

# OpenAI
OPENAI_API_KEY=sk-your-openai-key

# Firebase (optional - add your config)
# FIREBASE_PROJECT_ID=
# FIREBASE_PRIVATE_KEY=
# FIREBASE_CLIENT_EMAIL=
EOF

echo "⚠️  IMPORTANT: Edit ~/apps/Rep-Rummble/server/.env with your actual values!"

# Open firewall port
echo "🔓 Opening firewall port 5001..."
sudo iptables -I INPUT -p tcp --dport 5001 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT

# Start with PM2
echo "🚀 Starting server with PM2..."
pm2 start dist/server.js --name rep-rumble-api

# Save PM2 config
pm2 save

# Setup PM2 to start on boot
pm2 startup

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file: nano ~/apps/Rep-Rummble/server/.env"
echo "2. Restart server: pm2 restart rep-rumble-api"
echo "3. View logs: pm2 logs rep-rumble-api"
echo ""
echo "Your API will be available at: http://YOUR_VM_IP:5001"
