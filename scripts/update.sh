#!/bin/bash

# Update CodeSandBox Application
# Run this on your DigitalOcean server to update the application

set -e

echo "==================================="
echo "Updating CodeSandBox"
echo "==================================="
echo ""

# Check if in correct directory
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository"
    echo "Please run this from ~/CodeSandBox directory"
    exit 1
fi

# Pull latest changes
echo "📥 Pulling latest changes from git..."
git pull

# Update backend
echo "🔧 Updating backend..."
cd backend
npm install

# Restart backend
echo "🔄 Restarting backend..."
pm2 restart codesandbox-backend

# Update frontend
echo "🎨 Updating frontend..."
cd ../frontend
npm install

# Rebuild frontend
echo "🏗️  Building frontend..."
npm run build

# Reload Nginx
echo "🌐 Reloading Nginx..."
sudo systemctl reload nginx

echo ""
echo "==================================="
echo "✅ Update Complete!"
echo "==================================="
echo ""
echo "Checking status..."
pm2 status

echo ""
echo "View logs with: pm2 logs codesandbox-backend"
