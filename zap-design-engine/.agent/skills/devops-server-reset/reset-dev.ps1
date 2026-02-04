# Reset Development Environment Script
# Usage: ./reset-dev.ps1

Write-Host "🔄 ZAP Design Engine: Resetting Development Environment..." -ForegroundColor Cyan

# 1. Kill Node Processes
Write-Host "Checking for stuck Node.js processes..."
$nodeProcesses = Get-Process node -ErrorAction SilentlyContinue

if ($nodeProcesses) {
    Write-Host "Found $($nodeProcesses.Count) Node processes. Terminating..." -ForegroundColor Yellow
    Stop-Process -Name node -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Node processes terminated." -ForegroundColor Green
} else {
    Write-Host "✅ No Node processes found." -ForegroundColor Green
}

# 2. Check Ports (Double Check)
$ports = @(3000, 3001, 3002)
foreach ($port in $ports) {
    $listening = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if ($listening) {
        Write-Host "⚠️ Port $port is still in use by PID $($listening.OwningProcess)!" -ForegroundColor Red
        # Last resort kill
        Stop-Process -Id $listening.OwningProcess -Force -ErrorAction SilentlyContinue
        Write-Host "💀 Force killed PID $($listening.OwningProcess) on port $port." -ForegroundColor Red
    }
}

# 3. Clear Next.js Cache (Optional but recommended for "Clear Everything")
$nextFolder = ".next"
if (Test-Path $nextFolder) {
    Write-Host "🧹 Clearing .next cache..." -ForegroundColor Yellow
    Remove-Item $nextFolder -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Cache cleared." -ForegroundColor Green
}

Write-Host "🚀 Environment Reset Complete. Ready to start server." -ForegroundColor Cyan
Write-Host "Run 'npm run dev' to start." -ForegroundColor White
