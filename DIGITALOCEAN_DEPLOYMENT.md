# Deploy CodeSandBox to DigitalOcean

Complete guide to deploy your CodeSandBox IDE to DigitalOcean using your student credits.

---

## Prerequisites ✅

-   ✅ DigitalOcean account with $200 student credit
-   ✅ GitHub account (to push your code)
-   ✅ Domain name (optional, can use DO IP address)

---

## Architecture Overview

```
DigitalOcean Droplet (Ubuntu 22.04)
├── Docker (for sandbox containers)
├── Node.js (for backend)
├── PM2 (process manager)
├── Nginx (reverse proxy)
└── Your CodeSandBox app
    ├── Backend (Node.js API on port 3000)
    ├── Frontend (Static files served by Nginx)
    └── Projects folder (persistent on disk)
```

---

## Step 1: Create a Droplet

### 1.1 Log into DigitalOcean

-   Go to https://cloud.digitalocean.com
-   Click **Create** → **Droplets**

### 1.2 Choose Configuration

```
Image:            Ubuntu 22.04 LTS
Plan:             Basic
CPU options:      Regular (Disk type: SSD)
Size:             $12/month - 2GB RAM, 1 CPU, 50GB SSD
                  (or $18/month - 2GB RAM, 2 CPU, 60GB SSD for better performance)
Datacenter:       Choose closest to your location
Authentication:   SSH Key (recommended) or Password
Hostname:         codesandbox-server
```

### 1.3 Click **Create Droplet**

Wait 1-2 minutes for creation. Note the **IP address** (e.g., `143.198.123.45`)

---

## Step 2: Connect to Your Droplet

### 2.1 SSH into the server

```bash
# Replace with your droplet's IP
ssh root@143.198.123.45
```

If using SSH key, it will connect automatically. If password, enter the password sent to your email.

---

## Step 3: Initial Server Setup

### 3.1 Update the system

```bash
apt update && apt upgrade -y
```

### 3.2 Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start Docker
systemctl start docker
systemctl enable docker

# Verify installation
docker --version
```

### 3.3 Install Node.js 20

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 3.4 Install PM2 (Process Manager)

```bash
npm install -g pm2
```

### 3.5 Install Nginx

```bash
apt install nginx -y
systemctl start nginx
systemctl enable nginx
```

### 3.6 Create application user (security best practice)

```bash
# Create user
adduser codesandbox
usermod -aG sudo codesandbox
usermod -aG docker codesandbox

# Switch to new user
su - codesandbox
```

---

## Step 4: Push Code to GitHub

**On your local machine:**

```bash
cd /Users/dhanyabad/code2/CodeSandBox

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ready for deployment"

# Create repo on GitHub (go to github.com/new)
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/CodeSandBox.git
git branch -M main
git push -u origin main
```

---

## Step 5: Clone and Setup on Server

**On the DigitalOcean server (as codesandbox user):**

```bash
# Clone your repository
cd ~
git clone https://github.com/YOUR_USERNAME/CodeSandBox.git
cd CodeSandBox

# Setup Backend
cd backend
npm install

# Build the sandbox Docker image
docker build -t sandbox .

# Create projects directory
mkdir -p projects

# Setup environment variables
cat > .env << EOF
PORT=3000
NODE_ENV=production
REACT_PROJECT_COMMAND=npm create vite@latest sandbox -- --template react
EOF

# Test backend (should start without errors)
node src/index.js
# Press Ctrl+C to stop

# Setup Frontend
cd ~/CodeSandBox/frontend
npm install

# Create production .env
cat > .env << EOF
VITE_BACKEND_URL=http://YOUR_DROPLET_IP:3000
EOF

# Build frontend for production
npm run build

# Frontend build is now in: ~/CodeSandBox/frontend/dist
```

---

## Step 6: Configure PM2 for Backend

```bash
cd ~/CodeSandBox/backend

# Start backend with PM2
pm2 start src/index.js --name codesandbox-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Copy and run the command it outputs

# Check status
pm2 status
pm2 logs codesandbox-backend
```

---

## Step 7: Configure Nginx

### 7.1 Create Nginx configuration

```bash
sudo nano /etc/nginx/sites-available/codesandbox
```

### 7.2 Add this configuration:

```nginx
server {
    listen 80;
    server_name YOUR_DROPLET_IP;  # or your-domain.com

    # Frontend - Serve static React app
    location / {
        root /home/codesandbox/CodeSandBox/frontend/dist;
        try_files $uri $uri/ /index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket for Socket.IO
    location /socket.io {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }

    # Editor namespace WebSocket
    location /editor {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 7.3 Enable the site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/codesandbox /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Step 8: Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Step 9: Update Frontend Configuration

### 9.1 On your local machine:

Update frontend to use your server's IP:

```bash
cd frontend
```

Create `.env.production`:

```bash
echo "VITE_BACKEND_URL=http://YOUR_DROPLET_IP" > .env.production
```

Rebuild and redeploy:

```bash
npm run build

# Upload to server
scp -r dist/* codesandbox@YOUR_DROPLET_IP:~/CodeSandBox/frontend/dist/
```

Or push to GitHub and pull on server:

```bash
git add .
git commit -m "Update backend URL for production"
git push

# On server
cd ~/CodeSandBox/frontend
git pull
npm run build
sudo systemctl restart nginx
```

---

## Step 10: Test Your Deployment

### 10.1 Visit your application

```
http://YOUR_DROPLET_IP
```

### 10.2 Test features:

-   ✅ Create a new project
-   ✅ Edit files in Monaco editor
-   ✅ Open terminal
-   ✅ Run npm commands in terminal
-   ✅ Preview React app on port 5173

### 10.3 Check logs if issues:

```bash
# Backend logs
pm2 logs codesandbox-backend

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Docker logs
docker ps
docker logs <container-id>
```

---

## Step 11: (Optional) Setup Domain Name

If you have a domain name:

### 11.1 Point domain to DigitalOcean

Add A record in your domain's DNS:

```
Type: A
Host: @
Value: YOUR_DROPLET_IP
TTL: 3600
```

For subdomain (e.g., `ide.yourdomain.com`):

```
Type: A
Host: ide
Value: YOUR_DROPLET_IP
TTL: 3600
```

### 11.2 Update Nginx configuration

```bash
sudo nano /etc/nginx/sites-available/codesandbox
```

Change:

```nginx
server_name ide.yourdomain.com;
```

Restart Nginx:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## Step 12: (Optional) Setup SSL Certificate

Get free SSL from Let's Encrypt:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d ide.yourdomain.com

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

Your site will now be available at: `https://ide.yourdomain.com`

---

## Maintenance & Management

### View Backend Logs

```bash
pm2 logs codesandbox-backend
```

### Restart Backend

```bash
pm2 restart codesandbox-backend
```

### Update Code

```bash
cd ~/CodeSandBox
git pull

# Update backend
cd backend
npm install
pm2 restart codesandbox-backend

# Update frontend
cd ../frontend
npm install
npm run build
sudo systemctl reload nginx
```

### Monitor Resources

```bash
# CPU, Memory, Disk
htop

# Disk usage
df -h

# Check projects folder size
du -sh ~/CodeSandBox/backend/projects/

# Docker containers
docker ps
docker stats
```

### Backup Projects

```bash
# Backup projects folder
tar -czf projects-backup-$(date +%Y%m%d).tar.gz ~/CodeSandBox/backend/projects/

# Copy to local machine
scp codesandbox@YOUR_DROPLET_IP:~/projects-backup-*.tar.gz ~/backups/
```

---

## Cost Estimate

With $200 student credit:

| Plan   | RAM | CPU   | Storage | Cost/Month | Months with $200 |
| ------ | --- | ----- | ------- | ---------- | ---------------- |
| Basic  | 2GB | 1 CPU | 50GB    | $12        | 16 months        |
| Better | 2GB | 2 CPU | 60GB    | $18        | 11 months        |
| Good   | 4GB | 2 CPU | 80GB    | $24        | 8 months         |

**Recommendation:** Start with $12/month plan, upgrade if needed.

---

## Troubleshooting

### Backend won't start

```bash
# Check logs
pm2 logs codesandbox-backend

# Check if port 3000 is in use
sudo lsof -i :3000

# Restart
pm2 restart codesandbox-backend
```

### Docker permission denied

```bash
# Add user to docker group
sudo usermod -aG docker codesandbox
# Log out and log back in
```

### Frontend shows API errors

```bash
# Check CORS settings in backend
# Make sure VITE_BACKEND_URL is correct in frontend/.env

# Rebuild frontend
cd ~/CodeSandBox/frontend
npm run build
```

### WebSocket connection failed

```bash
# Check Nginx configuration
sudo nginx -t

# Check firewall
sudo ufw status

# Check backend is running
pm2 status
```

---

## Security Checklist

-   ✅ Use SSH keys (not passwords)
-   ✅ Enable UFW firewall
-   ✅ Keep system updated (`apt update && apt upgrade`)
-   ✅ Use non-root user for application
-   ✅ Setup SSL certificate
-   ✅ Regular backups
-   ✅ Monitor logs for suspicious activity

---

## Next Steps

1. ✅ Follow this guide to deploy
2. ✅ Test all functionality
3. ⏳ (Optional) Setup custom domain
4. ⏳ (Optional) Setup SSL
5. ⏳ (Optional) Setup automated backups
6. ⏳ (Optional) Add monitoring (UptimeRobot, etc.)

---

**Need help? Check:**

-   Backend logs: `pm2 logs codesandbox-backend`
-   Nginx logs: `sudo tail -f /var/log/nginx/error.log`
-   Docker: `docker ps` and `docker logs <container-id>`

Good luck with your deployment! 🚀
