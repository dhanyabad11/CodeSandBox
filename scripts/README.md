# Deployment Scripts

Automated scripts for deploying and managing CodeSandBox on DigitalOcean.

---

## Scripts Overview

### 1. `setup-server.sh` 🛠️

**Run on fresh DigitalOcean droplet as root**

Installs all required dependencies:

-   Docker
-   Node.js 20
-   PM2
-   Nginx
-   Creates application user
-   Configures firewall

```bash
# On DigitalOcean server (as root)
./setup-server.sh
```

---

### 2. `deploy.sh` 🚀

**Deploy the application (as codesandbox user)**

Complete deployment automation:

-   Clones repository
-   Installs dependencies
-   Builds frontend
-   Configures backend
-   Starts services with PM2
-   Configures Nginx
-   Makes app live

```bash
# On DigitalOcean server (as codesandbox user)
./deploy.sh
```

Interactive - will ask for:

-   GitHub repository URL
-   Droplet IP address

---

### 3. `update.sh` 🔄

**Update deployed application**

Updates app when you push new code:

-   Pulls latest from git
-   Updates dependencies
-   Restarts backend
-   Rebuilds frontend
-   Reloads Nginx

```bash
# On DigitalOcean server
cd ~/CodeSandBox
./scripts/update.sh
```

---

### 4. `backup.sh` 💾

**Backup user projects**

Creates compressed backup of all user projects:

-   Backs up `backend/projects/` folder
-   Saves to `~/backups/`
-   Keeps last 7 backups
-   Shows backup size

```bash
# On DigitalOcean server
cd ~/CodeSandBox
./scripts/backup.sh
```

Schedule automatic backups with cron:

```bash
crontab -e
# Add this line to backup daily at 2 AM:
0 2 * * * /home/codesandbox/CodeSandBox/scripts/backup.sh
```

---

## Usage Workflow

### Initial Deployment

1. **Setup server (as root):**

    ```bash
    ssh root@YOUR_DROPLET_IP
    curl -o setup.sh https://raw.githubusercontent.com/YOUR_USERNAME/CodeSandBox/main/scripts/setup-server.sh
    chmod +x setup.sh
    ./setup.sh
    ```

2. **Deploy application (as codesandbox user):**
    ```bash
    su - codesandbox
    curl -o deploy.sh https://raw.githubusercontent.com/YOUR_USERNAME/CodeSandBox/main/scripts/deploy.sh
    chmod +x deploy.sh
    ./deploy.sh
    ```

### Regular Updates

```bash
# On your local machine - make changes and push
git add .
git commit -m "New feature"
git push

# On server - update deployment
ssh codesandbox@YOUR_DROPLET_IP
cd ~/CodeSandBox
./scripts/update.sh
```

### Regular Backups

```bash
# Manual backup
./scripts/backup.sh

# Or setup automatic daily backups
crontab -e
# Add: 0 2 * * * /home/codesandbox/CodeSandBox/scripts/backup.sh
```

---

## Notes

-   All scripts include error checking (`set -e`)
-   Scripts are idempotent (safe to run multiple times)
-   Make scripts executable: `chmod +x scripts/*.sh`
-   Check logs if something fails

---

## Troubleshooting

### Script won't run

```bash
chmod +x scripts/*.sh
```

### Permission denied

```bash
# Make sure you're the right user
# setup-server.sh: run as root
# deploy.sh, update.sh, backup.sh: run as codesandbox
```

### Git pull fails

```bash
# Stash local changes first
git stash
git pull
```

### Docker permission denied

```bash
sudo usermod -aG docker codesandbox
# Then logout and login again
```

---

## Advanced Usage

### Custom backup location

Edit `backup.sh` and change:

```bash
BACKUP_DIR=~/backups  # Change this
```

### Change backup retention

Edit `backup.sh` line with `tail -n +8`:

```bash
ls -t projects_backup_*.tar.gz | tail -n +8  # Keep last 7
# Change 8 to keep different number (e.g., +15 for 14 backups)
```

### Deploy to different port

Edit `deploy.sh` and change PORT in .env creation

---

## See Also

-   `../QUICKSTART.md` - Quick deployment guide
-   `../DIGITALOCEAN_DEPLOYMENT.md` - Detailed deployment guide
-   `../DEPLOYMENT_CHECKLIST.md` - Complete checklist
