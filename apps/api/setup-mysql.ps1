# MySQL Setup Script for Windows
# Run this from the apps/api directory

Write-Host "🚀 Starting MySQL Setup..." -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
Write-Host "Checking Docker status..." -ForegroundColor Yellow
$dockerRunning = $false
try {
    docker ps 2>&1 | Out-Null
    $dockerRunning = $true
    Write-Host "✅ Docker is running!" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please start Docker Desktop and run this script again." -ForegroundColor Yellow
    Write-Host "Or press Enter to continue with alternative setup options..." -ForegroundColor Yellow
    Read-Host
    exit 1
}

if ($dockerRunning) {
    Write-Host ""
    Write-Host "Starting MySQL container..." -ForegroundColor Yellow
    docker-compose up -d
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ MySQL container started!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Waiting for MySQL to be ready (15 seconds)..." -ForegroundColor Yellow
        Start-Sleep -Seconds 15
        
        Write-Host ""
        Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
        npx prisma generate
        
        Write-Host ""
        Write-Host "Creating database tables..." -ForegroundColor Yellow
        npx prisma db push
        
        Write-Host ""
        Write-Host "✅ Setup complete!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 MySQL is running on: localhost:3306" -ForegroundColor Cyan
        Write-Host "📁 Database: electrostore" -ForegroundColor Cyan
        Write-Host "👤 User: root" -ForegroundColor Cyan
        Write-Host "🔑 Password: password" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "🎯 Next steps:" -ForegroundColor Yellow
        Write-Host "  1. Restart your API server (Ctrl+C and run: npm run start:dev)" -ForegroundColor White
        Write-Host "  2. Open Prisma Studio: npm run prisma:studio" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "❌ Failed to start MySQL container" -ForegroundColor Red
        Write-Host "Please check Docker Desktop is running properly" -ForegroundColor Yellow
    }
}
