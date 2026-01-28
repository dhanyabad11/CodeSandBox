#!/bin/bash

# DigitalOcean Server Setup Script for CodeSandBox
# Run this on your DigitalOcean droplet after SSH

set -e

echo "==================================="
echo "CodeSandBox DigitalOcean Setup"
echo "==================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (or use sudo)"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl start docker
    systemctl enable docker
    echo "✅ Docker installed"
else
    echo "✅ Docker already installed"
fi

# Install Node.js 20
echo "📗 Installing Node.js 20..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    echo "✅ Node.js installed"
else
    echo "✅ Node.js already installed"
fi

# Install PM2
echo "⚙️  Installing PM2..."
npm install -g pm2
echo "✅ PM2 installed"

# Install Nginx
echo "🌐 Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    apt install nginx -y
    systemctl start nginx
    systemctl enable nginx
    echo "✅ Nginx installed"
else
    echo "✅ Nginx already installed"
fi

# Install other useful tools
echo "🛠️  Installing additional tools..."
apt install -y git curl wget htop ufw

# Create application user
echo "👤 Creating application user..."
if id "codesandbox" &>/dev/null; then
    echo "✅ User 'codesandbox' already exists"
else
    adduser --disabled-password --gecos "" codesandbox
    usermod -aG sudo codesandbox
    usermod -aG docker codesandbox
    echo "✅ User 'codesandbox' created"
fi

# Configure firewall
echo "🔥 Configuring firewall..."
ufw --force enable
ufw allow 22
ufw allow 80
ufw allow 443
ufw allow 3000
echo "✅ Firewall configured"

# Print versions
echo ""
echo "==================================="
echo "Installation Complete! ✅"
echo "==================================="
echo ""
echo "Installed versions:"
echo "Docker: $(docker --version)"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "PM2: $(pm2 --version)"
echo "Nginx: $(nginx -v 2>&1)"
echo ""
echo "Next steps:"
echo "1. Switch to codesandbox user: su - codesandbox"
echo "2. Clone your repository"
echo "3. Follow the DIGITALOCEAN_DEPLOYMENT.md guide"
echo ""
