# MySQL Database Setup Guide

## Option 1: Install MySQL Locally (Recommended for Development)

### Windows Installation:

1. **Download MySQL:**
   - Visit: https://dev.mysql.com/downloads/installer/
   - Download "MySQL Installer for Windows"
   - Choose "mysql-installer-community" (smaller web installer)

2. **Install MySQL:**
   - Run the installer
   - Choose "Developer Default" setup type
   - Set root password to: `password` (or update `.env` file)
   - Keep default port: `3306`
   - Complete the installation

3. **Verify Installation:**
   ```bash
   mysql --version
   ```

4. **Create Database:**
   ```bash
   mysql -u root -p
   # Enter password: password
   ```
   
   Then in MySQL shell:
   ```sql
   CREATE DATABASE electrostore;
   SHOW DATABASES;
   EXIT;
   ```

---

## Option 2: Use Docker (Easier, Recommended)

### Prerequisites:
- Install Docker Desktop: https://www.docker.com/products/docker-desktop/

### Quick Start:
```bash
# Run MySQL in Docker
docker run --name mysql-electrostore -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=electrostore -p 3306:3306 -d mysql:8.0

# Verify it's running
docker ps

# Stop MySQL
docker stop mysql-electrostore

# Start MySQL again
docker start mysql-electrostore

# Remove container (if needed)
docker rm -f mysql-electrostore
```

---

## Option 3: Use Online MySQL Service (Cloud)

### Free Options:
1. **PlanetScale** (Recommended)
   - Visit: https://planetscale.com/
   - Free tier: 5GB storage
   - Get connection string and update `.env`

2. **Railway**
   - Visit: https://railway.app/
   - Free tier available
   - Easy MySQL deployment

3. **Aiven**
   - Visit: https://aiven.io/
   - Free tier: 1GB storage

---

## After MySQL is Running:

### 1. Update `.env` file with your credentials:
```env
DATABASE_URL="mysql://root:password@localhost:3306/electrostore"
```

### 2. Generate Prisma Client:
```bash
npx prisma generate
```

### 3. Create Database Tables:
```bash
npx prisma db push
```

Or use migrations (recommended for production):
```bash
npx prisma migrate dev --name init
```

### 4. (Optional) Seed Database:
```bash
npm run prisma:seed
```

### 5. Restart the API server:
```bash
npm run start:dev
```

---

## Troubleshooting

### Connection Issues:
- Verify MySQL is running: `docker ps` or check Windows Services
- Check port 3306 is not blocked
- Verify credentials in `.env` file

### Migration Issues:
```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# View database in browser
npx prisma studio
```

---

## Quick Commands Reference

```bash
# View database in GUI
npx prisma studio

# Create new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations in production
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Format schema file
npx prisma format
```

---

## Current Configuration

- **Database:** MySQL 8.0
- **Database Name:** electrostore
- **Port:** 3306
- **User:** root
- **Password:** password (change in production!)

**⚠️ IMPORTANT:** Change the default password before deploying to production!
