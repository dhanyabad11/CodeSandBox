#!/bin/bash

# Backup CodeSandBox projects
# Creates a compressed backup of all user projects

BACKUP_DIR=~/backups
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="projects_backup_${DATE}.tar.gz"

echo "==================================="
echo "CodeSandBox Projects Backup"
echo "==================================="
echo ""

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Get projects directory size
PROJECTS_DIR=~/CodeSandBox/backend/projects
if [ ! -d "$PROJECTS_DIR" ]; then
    echo "❌ Projects directory not found: $PROJECTS_DIR"
    exit 1
fi

PROJECTS_SIZE=$(du -sh "$PROJECTS_DIR" | cut -f1)
echo "📊 Projects directory size: $PROJECTS_SIZE"

# Create backup
echo "📦 Creating backup..."
tar -czf "$BACKUP_DIR/$BACKUP_FILE" -C ~/CodeSandBox/backend projects/

BACKUP_SIZE=$(du -sh "$BACKUP_DIR/$BACKUP_FILE" | cut -f1)

echo ""
echo "==================================="
echo "✅ Backup Complete!"
echo "==================================="
echo ""
echo "Backup file: $BACKUP_DIR/$BACKUP_FILE"
echo "Backup size: $BACKUP_SIZE"
echo ""
echo "To restore:"
echo "  cd ~/CodeSandBox/backend"
echo "  rm -rf projects"
echo "  tar -xzf $BACKUP_DIR/$BACKUP_FILE"
echo ""

# List all backups
echo "All backups:"
ls -lh "$BACKUP_DIR"/projects_backup_*.tar.gz 2>/dev/null || echo "No previous backups found"

# Keep only last 7 backups
echo ""
echo "🗑️  Cleaning old backups (keeping last 7)..."
cd "$BACKUP_DIR"
ls -t projects_backup_*.tar.gz 2>/dev/null | tail -n +8 | xargs -r rm
echo "✅ Cleanup complete"
