# 🚀 Quick Start Guide - MySQL Migration

## ✅ What's Been Done

1. ✅ Updated Prisma schema to use MySQL
2. ✅ Installed `mysql2` package
3. ✅ Updated `.env` file with MySQL connection string
4. ✅ Created `docker-compose.yml` for easy MySQL setup
5. ✅ Added helpful npm scripts

---

## 🎯 Next Steps (Choose ONE option)

### **Option A: Using Docker (EASIEST - Recommended)**

#### Prerequisites:
- Install Docker Desktop: https://www.docker.com/products/docker-desktop/

#### Steps:
```bash
# 1. Start MySQL with Docker
npm run docker:up

# Wait 10-15 seconds for MySQL to initialize

# 2. Generate Prisma Client
npm run prisma:generate

# 3. Create database tables
npm run prisma:push

# 4. (Optional) Open database GUI
npm run prisma:studio

# 5. Restart your API server
# Stop the current server (Ctrl+C) and run:
npm run start:dev
```

**Bonus:** Access phpMyAdmin at http://localhost:8080
- Username: `root`
- Password: `password`

---

### **Option B: Install MySQL Locally**

See detailed instructions in `MYSQL_SETUP.md`

Quick version:
1. Download MySQL: https://dev.mysql.com/downloads/installer/
2. Install with default settings
3. Set root password to `password`
4. Create database:
   ```bash
   mysql -u root -p
   CREATE DATABASE electrostore;
   EXIT;
   ```
5. Run:
   ```bash
   npm run prisma:generate
   npm run prisma:push
   npm run start:dev
   ```

---

### **Option C: Use Cloud MySQL (PlanetScale)**

1. Sign up: https://planetscale.com/
2. Create a new database
3. Copy the connection string
4. Update `.env` file:
   ```env
   DATABASE_URL="mysql://username:password@host/database?sslaccept=strict"
   ```
5. Run:
   ```bash
   npm run prisma:generate
   npm run prisma:push
   npm run start:dev
   ```

---

## 📝 Useful Commands

```bash
# Database Management
npm run docker:up          # Start MySQL in Docker
npm run docker:down        # Stop MySQL Docker container
npm run prisma:studio      # Open database GUI (browser)

# Prisma Commands
npm run prisma:generate    # Generate Prisma Client
npm run prisma:push        # Push schema to database (dev)
npm run prisma:migrate     # Create migration (production-ready)
npm run db:reset           # Reset database (⚠️ deletes all data)

# Development
npm run start:dev          # Start API server
```

---

## 🔍 Verify Everything Works

After setup, test the API:

```bash
# Check if server is running
curl http://localhost:4000

# Test database connection
npm run prisma:studio
```

---

## ⚠️ Troubleshooting

### "Can't reach database server"
- Make sure MySQL is running: `npm run docker:up`
- Check if port 3306 is available
- Verify `.env` credentials

### "Table doesn't exist"
- Run: `npm run prisma:push`

### "Prisma Client not found"
- Run: `npm run prisma:generate`

---

## 📚 Additional Resources

- Full MySQL setup guide: `MYSQL_SETUP.md`
- Prisma docs: https://www.prisma.io/docs
- Docker docs: https://docs.docker.com/

---

## 🎉 You're All Set!

Once MySQL is running and migrations are complete, your app will use MySQL instead of SQLite!

**Current Status:**
- ✅ Prisma schema updated
- ✅ MySQL driver installed
- ✅ Environment configured
- ⏳ Waiting for MySQL setup
