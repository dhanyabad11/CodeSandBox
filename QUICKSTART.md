# Quick Start - Deploy to DigitalOcean 🚀

Follow these steps to deploy your CodeSandBox to DigitalOcean in ~15 minutes!

---

## Part 1: Prepare Your Code (On Your Mac)

### 1. Push code to GitHub

```bash
cd /Users/dhanyabad/code2/CodeSandBox

# Initialize git (if not done)
git init
git add .
git commit -m "Ready for DigitalOcean deployment"

# Create repo on GitHub: https://github.com/new
# Name it: CodeSandBox
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/CodeSandBox.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username!**

---

## Part 2: Create DigitalOcean Droplet

### 1. Go to DigitalOcean

-   Login to https://cloud.digitalocean.com
-   Click **Create** → **Droplets**

### 2. Configure Droplet

```
Image:       Ubuntu 22.04 LTS
Plan:        Basic - $12/month (2GB RAM, 1 CPU, 50GB SSD)
Datacenter:  Choose closest to you
Auth:        SSH Key (recommended) or Password
Hostname:    codesandbox
```

### 3. Click "Create Droplet"

-   Wait 1-2 minutes
-   **Note the IP address** (example: `143.198.123.45`)

---

## Part 3: Setup Server

### 1. SSH into your droplet

```bash
ssh root@YOUR_DROPLET_IP
```

### 2. Run setup script

```bash
# Download and run the setup script
curl -o setup.sh https://raw.githubusercontent.com/YOUR_USERNAME/CodeSandBox/main/scripts/setup-server.sh

# Make it executable
chmod +x setup.sh

# Run it
./setup.sh
```

This installs: Docker, Node.js, PM2, Nginx, and configures firewall.

### 3. Switch to application user

```bash
su - codesandbox
```

---

## Part 4: Deploy Application

### Method A: Automated (Recommended)

```bash
# Download and run deploy script
curl -o deploy.sh https://raw.githubusercontent.com/YOUR_USERNAME/CodeSandBox/main/scripts/deploy.sh

chmod +x deploy.sh
./deploy.sh

# Follow the prompts:
# - Enter your GitHub repo URL
# - Enter your droplet IP
```

The script will:

-   Clone your repo
-   Install dependencies
-   Build frontend
-   Start backend with PM2
-   Configure Nginx
-   Start your app

### Method B: Manual

```bash
# 1. Clone repository
cd ~
git clone https://github.com/YOUR_USERNAME/CodeSandBox.git
cd CodeSandBox

# 2. Setup backend
cd backend
npm install
docker build -t sandbox .
mkdir -p projects

cat > .env << EOF
PORT=3000
NODE_ENV=production
REACT_PROJECT_COMMAND=npm create vite@latest sandbox -- --template react
EOF

# 3. Setup frontend
cd ../frontend
npm install

cat > .env << EOF
VITE_BACKEND_URL=http://YOUR_DROPLET_IP
EOF

npm run build

# 4. Start backend with PM2
cd ../backend
pm2 start src/index.js --name codesandbox-backend
pm2 save
pm2 startup  # Follow the instructions it prints

# 5. Configure Nginx (run as root)
exit  # Exit to root user
nano /etc/nginx/sites-available/codesandbox
```

Copy the Nginx config from `DIGITALOCEAN_DEPLOYMENT.md` (Step 7.2)

```bash
# Enable site
ln -s /etc/nginx/sites-available/codesandbox /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

---

## Part 5: Test Your App

### 1. Open in browser

```
http://YOUR_DROPLET_IP
```

### 2. Test features

-   ✅ Create a new project
-   ✅ Edit files
-   ✅ Open terminal
-   ✅ Run `npm install` in terminal
-   ✅ Run `npm run dev`
-   ✅ View preview

### 3. If something doesn't work

```bash
# Check backend logs
pm2 logs codesandbox-backend

# Check Nginx
sudo tail -f /var/log/nginx/error.log

# Check if backend is running
pm2 status

# Restart everything
pm2 restart codesandbox-backend
sudo systemctl restart nginx
```

---

## Part 6: (Optional) Setup Domain & SSL

### If you have a domain:

1. **Add DNS A Record:**

    ```
    Type: A
    Host: @ (or ide)
    Value: YOUR_DROPLET_IP
    TTL: 3600
    ```

2. **Update Nginx:**

    ```bash
    sudo nano /etc/nginx/sites-available/codesandbox
    # Change: server_name ide.yourdomain.com;
    sudo systemctl restart nginx
    ```

3. **Install SSL:**
    ```bash
    sudo apt install certbot python3-certbot-nginx -y
    sudo certbot --nginx -d ide.yourdomain.com
    ```

Now access at: `https://ide.yourdomain.com`

---

## Useful Commands

```bash
# View backend logs
pm2 logs codesandbox-backend

# Restart backend
pm2 restart codesandbox-backend

# Check status
pm2 status

# Update application (when you push changes)
cd ~/CodeSandBox
./scripts/update.sh

# Backup projects
./scripts/backup.sh

# View nginx logs
sudo tail -f /var/log/nginx/error.log

# Check disk space
df -h

# Check projects size
du -sh ~/CodeSandBox/backend/projects/
```

---

## Update Your App

When you make changes locally:

```bash
# On your Mac
cd /Users/dhanyabad/code2/CodeSandBox
git add .
git commit -m "Update feature"
git push

# On server
cd ~/CodeSandBox
./scripts/update.sh
```

---

## Cost

**$12/month** = 16+ months with your $200 credit! 🎉

---

## Need Help?

Check detailed guide: `DIGITALOCEAN_DEPLOYMENT.md`

**Common issues:**

-   Port 3000 in use: `pm2 restart codesandbox-backend`
-   Docker permission: `sudo usermod -aG docker codesandbox` then logout/login
-   Frontend not loading: Check `frontend/.env` has correct IP
-   WebSocket errors: Check Nginx config and firewall

---

## Summary

1. ✅ Push code to GitHub
2. ✅ Create DigitalOcean Droplet ($12/month)
3. ✅ Run `setup-server.sh` on server
4. ✅ Run `deploy.sh` to deploy app
5. ✅ Access at `http://YOUR_DROPLET_IP`
6. 🎉 Done!

Total time: ~15 minutes

---

**Your app will be running 24/7 with persistent storage for all user projects!**
