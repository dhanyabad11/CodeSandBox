#!/bin/bash

# Deploy CodeSandBox Application
# Run this script as the codesandbox user on the server

set -e

echo "==================================="
echo "CodeSandBox Application Deployment"
echo "==================================="
echo ""

# Check if running as codesandbox user
if [ "$USER" != "codesandbox" ]; then
    echo "⚠️  Please run as 'codesandbox' user"
    echo "Run: su - codesandbox"
    exit 1
fi

# Get repository URL
read -p "Enter your GitHub repository URL: " REPO_URL
read -p "Enter your Droplet IP address: " DROPLET_IP

# Clone repository
echo "📥 Cloning repository..."
cd ~
if [ -d "CodeSandBox" ]; then
    echo "⚠️  CodeSandBox directory already exists"
    read -p "Do you want to remove it and re-clone? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf CodeSandBox
        git clone "$REPO_URL"
    else
        cd CodeSandBox
        git pull
    fi
else
    git clone "$REPO_URL"
fi

cd ~/CodeSandBox

# Setup Backend
echo "🔧 Setting up backend..."
cd backend
npm install

# Create .env file
echo "📝 Creating backend .env file..."
cat > .env << EOF
PORT=3000
NODE_ENV=production
REACT_PROJECT_COMMAND=npm create vite@latest sandbox -- --template react
EOF

# Build Docker sandbox image
echo "🐳 Building Docker sandbox image..."
docker build -t sandbox .

# Create projects directory
mkdir -p projects

# Setup Frontend
echo "🎨 Setting up frontend..."
cd ~/CodeSandBox/frontend
npm install

# Create frontend .env
echo "📝 Creating frontend .env file..."
cat > .env << EOF
VITE_BACKEND_URL=http://${DROPLET_IP}
EOF

# Build frontend
echo "🏗️  Building frontend..."
npm run build

# Start backend with PM2
echo "🚀 Starting backend with PM2..."
cd ~/CodeSandBox/backend
pm2 delete codesandbox-backend 2>/dev/null || true
pm2 start src/index.js --name codesandbox-backend
pm2 save

# Setup PM2 startup
echo "⚙️  Setting up PM2 startup..."
pm2 startup | grep "sudo" | bash || true

# Configure Nginx
echo "🌐 Configuring Nginx..."
sudo bash -c "cat > /etc/nginx/sites-available/codesandbox << 'EOF'
server {
    listen 80;
    server_name ${DROPLET_IP};

    # Frontend
    location / {
        root /home/codesandbox/CodeSandBox/frontend/dist;
        try_files \$uri \$uri/ /index.html;
        
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control \"public, immutable\";
        }
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_cache_bypass \$http_upgrade;
    }

    # WebSocket
    location /socket.io {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection \"upgrade\";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    # Editor namespace
    location /editor {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection \"upgrade\";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF"

# Enable site
sudo ln -sf /etc/nginx/sites-available/codesandbox /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
echo "🔄 Restarting Nginx..."
sudo nginx -t
sudo systemctl restart nginx

echo ""
echo "==================================="
echo "✅ Deployment Complete!"
echo "==================================="
echo ""
echo "🌐 Your app is now available at: http://${DROPLET_IP}"
echo ""
echo "Useful commands:"
echo "  - View logs: pm2 logs codesandbox-backend"
echo "  - Restart backend: pm2 restart codesandbox-backend"
echo "  - Check status: pm2 status"
echo "  - Nginx logs: sudo tail -f /var/log/nginx/error.log"
echo ""
echo "To update your app:"
echo "  cd ~/CodeSandBox && git pull"
echo "  cd backend && npm install && pm2 restart codesandbox-backend"
echo "  cd ../frontend && npm install && npm run build"
echo ""
