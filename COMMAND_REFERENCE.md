# Command Reference - DigitalOcean Deployment

Quick reference for managing your CodeSandBox on DigitalOcean.

---

## SSH Access

```bash
# Connect to server
ssh codesandbox@YOUR_DROPLET_IP

# Or as root
ssh root@YOUR_DROPLET_IP
```

---

## Application Management

### View Status

```bash
pm2 status
pm2 monit                          # Real-time monitoring
```

### View Logs

```bash
pm2 logs codesandbox-backend       # Live logs
pm2 logs codesandbox-backend --lines 100   # Last 100 lines
pm2 logs --err                     # Only errors
```

### Restart Application

```bash
pm2 restart codesandbox-backend    # Restart backend
pm2 reload codesandbox-backend     # Zero-downtime restart
pm2 stop codesandbox-backend       # Stop
pm2 start codesandbox-backend      # Start
pm2 restart all                    # Restart all apps
```

### Clear Logs

```bash
pm2 flush                          # Clear all logs
```

---

## Nginx Management

### Status & Control

```bash
sudo systemctl status nginx        # Check status
sudo systemctl start nginx         # Start
sudo systemctl stop nginx          # Stop
sudo systemctl restart nginx       # Restart
sudo systemctl reload nginx        # Reload config without restart
```

### View Logs

```bash
sudo tail -f /var/log/nginx/access.log   # Access logs
sudo tail -f /var/log/nginx/error.log    # Error logs
```

### Test Configuration

```bash
sudo nginx -t                      # Test config syntax
```

### Edit Configuration

```bash
sudo nano /etc/nginx/sites-available/codesandbox
```

---

## Docker Management

### List Containers

```bash
docker ps                          # Running containers
docker ps -a                       # All containers
docker ps -q                       # Only container IDs
```

### Container Logs

```bash
docker logs <container-id>         # View logs
docker logs -f <container-id>      # Follow logs
docker logs --tail 50 <container-id>  # Last 50 lines
```

### Stop/Remove Containers

```bash
docker stop <container-id>         # Stop container
docker rm <container-id>           # Remove container
docker stop $(docker ps -q)        # Stop all
docker rm $(docker ps -aq)         # Remove all
```

### Container Stats

```bash
docker stats                       # Real-time stats for all
docker stats <container-id>        # Stats for specific container
```

### Execute Commands in Container

```bash
docker exec -it <container-id> bash    # Interactive shell
docker exec <container-id> ls /home/sandbox/app   # Run command
```

### Images

```bash
docker images                      # List images
docker rmi sandbox                 # Remove sandbox image
```

---

## Application Updates

### Full Update Process

```bash
cd ~/CodeSandBox
./scripts/update.sh
```

### Manual Update

```bash
cd ~/CodeSandBox
git pull                           # Get latest code

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

### Rebuild Docker Image

```bash
cd ~/CodeSandBox/backend
docker build -t sandbox .
```

---

## Backup & Restore

### Create Backup

```bash
cd ~/CodeSandBox
./scripts/backup.sh
```

### List Backups

```bash
ls -lh ~/backups/
```

### Restore from Backup

```bash
cd ~/CodeSandBox/backend
rm -rf projects
tar -xzf ~/backups/projects_backup_YYYYMMDD_HHMMSS.tar.gz
```

### Download Backup to Local Machine

```bash
# On your Mac
scp codesandbox@YOUR_DROPLET_IP:~/backups/projects_backup_*.tar.gz ~/Desktop/
```

---

## Monitoring

### Disk Usage

```bash
df -h                              # All disks
df -h /                            # Root partition
du -sh ~/CodeSandBox               # App size
du -sh ~/CodeSandBox/backend/projects/   # Projects size
du -sh ~/CodeSandBox/backend/projects/*  # Each project
```

### Memory Usage

```bash
free -h                            # Memory usage
htop                               # Interactive process viewer
```

### Network

```bash
netstat -tulpn                     # All listening ports
netstat -tulpn | grep :3000        # Check port 3000
netstat -tulpn | grep :80          # Check port 80
lsof -i :3000                      # What's using port 3000
```

### Process Management

```bash
ps aux | grep node                 # Node processes
ps aux | grep nginx                # Nginx processes
top                                # All processes
```

---

## Firewall (UFW)

### Status

```bash
sudo ufw status                    # Check status
sudo ufw status verbose            # Detailed status
```

### Add/Remove Rules

```bash
sudo ufw allow 8080                # Allow port 8080
sudo ufw delete allow 8080         # Remove rule
sudo ufw allow from 203.0.113.4    # Allow specific IP
```

### Enable/Disable

```bash
sudo ufw enable                    # Enable firewall
sudo ufw disable                   # Disable firewall
```

---

## System Maintenance

### Update System Packages

```bash
sudo apt update                    # Update package list
sudo apt upgrade -y                # Upgrade packages
sudo apt autoremove -y             # Remove unused packages
```

### Restart Server

```bash
sudo reboot                        # Reboot server
sudo shutdown -h now               # Shutdown server
```

### Check System Info

```bash
uname -a                           # Kernel info
lsb_release -a                     # Ubuntu version
node --version                     # Node version
docker --version                   # Docker version
nginx -v                           # Nginx version
pm2 --version                      # PM2 version
```

---

## Git Operations

### Update Code

```bash
cd ~/CodeSandBox
git status                         # Check status
git pull                           # Pull latest changes
git log --oneline -5               # Recent commits
```

### Discard Local Changes

```bash
git stash                          # Stash changes
git reset --hard origin/main       # Reset to remote
```

---

## Troubleshooting

### Backend Won't Start

```bash
pm2 logs codesandbox-backend       # Check logs
lsof -i :3000                      # Check if port in use
pm2 restart codesandbox-backend    # Try restart
```

### Frontend Not Loading

```bash
sudo nginx -t                      # Test nginx config
sudo tail -f /var/log/nginx/error.log   # Check errors
ls -la ~/CodeSandBox/frontend/dist      # Check if built
```

### Docker Permission Denied

```bash
sudo usermod -aG docker codesandbox
# Then logout and login
```

### High Disk Usage

```bash
df -h                              # Check space
du -sh ~/CodeSandBox/backend/projects/*   # Check projects
docker system prune -a             # Clean Docker
```

### High Memory Usage

```bash
free -h                            # Check memory
docker stats                       # Check containers
pm2 restart codesandbox-backend    # Restart backend
```

---

## Automated Tasks (Cron)

### Edit Crontab

```bash
crontab -e
```

### Example Cron Jobs

```bash
# Backup daily at 2 AM
0 2 * * * /home/codesandbox/CodeSandBox/scripts/backup.sh

# Update system weekly on Sunday at 3 AM
0 3 * * 0 sudo apt update && sudo apt upgrade -y

# Restart backend daily at 4 AM
0 4 * * * pm2 restart codesandbox-backend
```

### View Cron Jobs

```bash
crontab -l
```

---

## Security

### Check Failed Login Attempts

```bash
sudo grep "Failed password" /var/log/auth.log
```

### Check Active SSH Sessions

```bash
who
w
```

### Change SSH Port (Optional)

```bash
sudo nano /etc/ssh/sshd_config
# Change: Port 22 to Port 2222
sudo systemctl restart sshd
```

---

## Performance

### Find Large Files

```bash
find ~/CodeSandBox -type f -size +50M
```

### Clear Node Modules (if needed)

```bash
find ~/CodeSandBox -name "node_modules" -type d -exec rm -rf {} +
# Then: cd ~/CodeSandBox/backend && npm install
```

### Optimize Docker

```bash
docker system df                   # Docker disk usage
docker system prune -a             # Clean everything
docker volume prune                # Clean volumes
```

---

## Quick Fixes

### 502 Bad Gateway

```bash
pm2 restart codesandbox-backend
sudo systemctl restart nginx
```

### Container Won't Start

```bash
docker ps -a                       # Find container
docker logs <container-id>         # Check logs
docker rm -f <container-id>        # Force remove
```

### Port Already in Use

```bash
sudo lsof -i :3000                 # Find process
sudo kill -9 <PID>                 # Kill process
pm2 restart codesandbox-backend    # Restart
```

---

## Emergency Commands

### Kill All Node Processes

```bash
pkill -f node
pm2 restart codesandbox-backend
```

### Reset Nginx

```bash
sudo systemctl stop nginx
sudo systemctl start nginx
```

### Full Application Reset

```bash
pm2 stop all
pm2 delete all
cd ~/CodeSandBox/backend
pm2 start src/index.js --name codesandbox-backend
pm2 save
```

---

## Useful Aliases (Add to ~/.bashrc)

```bash
# Edit ~/.bashrc
nano ~/.bashrc

# Add these lines:
alias logs='pm2 logs codesandbox-backend'
alias restart='pm2 restart codesandbox-backend'
alias status='pm2 status'
alias update='cd ~/CodeSandBox && ./scripts/update.sh'
alias backup='cd ~/CodeSandBox && ./scripts/backup.sh'
alias nginxlog='sudo tail -f /var/log/nginx/error.log'

# Save and reload:
source ~/.bashrc
```

---

**Save this file for quick reference! 📋**
