# CodeSandBox - DigitalOcean Deployment Checklist

## Pre-Deployment ☐

-   [ ] Code is working locally
-   [ ] All dependencies are in package.json
-   [ ] .env files have correct values
-   [ ] Code is pushed to GitHub
-   [ ] DigitalOcean account ready with $200 credit

## Server Setup ☐

-   [ ] Created DigitalOcean Droplet ($12/month recommended)
-   [ ] Noted IP address: ******\_\_\_\_******
-   [ ] Can SSH into server: `ssh root@YOUR_IP`
-   [ ] Ran `setup-server.sh` successfully
-   [ ] Docker installed and working
-   [ ] Node.js 20+ installed
-   [ ] PM2 installed
-   [ ] Nginx installed
-   [ ] Firewall configured (UFW)
-   [ ] Created `codesandbox` user

## Application Deployment ☐

-   [ ] Cloned repository on server
-   [ ] Backend: npm install completed
-   [ ] Backend: Docker sandbox image built
-   [ ] Backend: .env file created
-   [ ] Backend: projects/ directory created
-   [ ] Frontend: npm install completed
-   [ ] Frontend: .env file created with correct IP
-   [ ] Frontend: npm run build successful
-   [ ] Frontend: dist/ folder created
-   [ ] Backend started with PM2
-   [ ] PM2 configured for auto-restart
-   [ ] PM2 startup configured (survives reboots)
-   [ ] Nginx configured
-   [ ] Nginx config tested: `nginx -t`
-   [ ] Nginx restarted

## Testing ☐

-   [ ] Can access frontend at http://YOUR_IP
-   [ ] Can create a new project
-   [ ] Monaco editor loads and works
-   [ ] File tree displays correctly
-   [ ] Can edit and save files
-   [ ] Terminal opens in browser
-   [ ] Terminal connects to container
-   [ ] Can run npm commands in terminal
-   [ ] Can run `npm install` in project
-   [ ] Can run `npm run dev`
-   [ ] Port mapping works (5173)
-   [ ] Preview shows React app
-   [ ] WebSocket connections working
-   [ ] File changes sync in real-time
-   [ ] No errors in PM2 logs
-   [ ] No errors in Nginx logs
-   [ ] No errors in browser console

## Optional - Domain & SSL ☐

-   [ ] Domain name configured
-   [ ] DNS A record points to droplet IP
-   [ ] DNS propagated (check with `nslookup`)
-   [ ] Nginx config updated with domain
-   [ ] Certbot installed
-   [ ] SSL certificate obtained
-   [ ] HTTPS working
-   [ ] HTTP redirects to HTTPS
-   [ ] SSL auto-renewal configured

## Monitoring & Maintenance ☐

-   [ ] PM2 monitoring setup
-   [ ] Know how to check logs: `pm2 logs`
-   [ ] Know how to restart: `pm2 restart`
-   [ ] Backup script tested: `./scripts/backup.sh`
-   [ ] Update script tested: `./scripts/update.sh`
-   [ ] Disk space monitored: `df -h`
-   [ ] Projects folder size checked: `du -sh projects/`

## Security ☐

-   [ ] Using SSH keys (not password)
-   [ ] Root login disabled (optional but recommended)
-   [ ] UFW firewall enabled
-   [ ] Only necessary ports open (22, 80, 443)
-   [ ] System updated: `apt update && apt upgrade`
-   [ ] Non-root user used for application
-   [ ] .env files not in git
-   [ ] Sensitive data not exposed

## Documentation ☐

-   [ ] Server IP documented
-   [ ] Server login credentials saved securely
-   [ ] GitHub repository URL noted
-   [ ] Domain registrar login saved (if using domain)
-   [ ] DigitalOcean login saved
-   [ ] PM2 commands documented
-   [ ] Team members have access (if applicable)

## Cost Tracking ☐

-   [ ] Initial credit: $200
-   [ ] Monthly cost: $12
-   [ ] Expected duration: ~16 months
-   [ ] Billing alerts set up
-   [ ] Resource usage monitored

## Troubleshooting Knowledge ☐

-   [ ] Know how to check backend logs
-   [ ] Know how to check Nginx logs
-   [ ] Know how to check Docker containers
-   [ ] Know how to restart services
-   [ ] Know how to rebuild frontend
-   [ ] Have backup plan for data
-   [ ] Know how to rollback deployment

---

## Quick Reference Commands

### View Status

```bash
pm2 status
pm2 logs codesandbox-backend
sudo systemctl status nginx
docker ps
df -h
```

### Restart Services

```bash
pm2 restart codesandbox-backend
sudo systemctl restart nginx
```

### Update Application

```bash
cd ~/CodeSandBox
git pull
./scripts/update.sh
```

### Backup Projects

```bash
./scripts/backup.sh
```

### View Logs

```bash
pm2 logs codesandbox-backend --lines 100
sudo tail -f /var/log/nginx/error.log
docker logs <container-id>
```

---

## Emergency Contacts

-   DigitalOcean Support: https://www.digitalocean.com/support
-   Community Help: https://www.digitalocean.com/community

---

**Once all items are checked, your deployment is complete! 🎉**
