@echo off
chcp 65001 >nul
echo Generating PNG icons for PWA...

if not exist "icons" mkdir "icons"

echo Creating icon-192.png...
echo 芏   > "icons\icon-192.png"
echo Icon created (placeholder - please replace with actual 192x192 PNG)

echo Creating icon-512.png...
echo 芏   > "icons\icon-512.png"
echo Icon created (placeholder - please replace with actual 512x512 PNG)

echo.
echo PNG icons generated!
echo Note: These are placeholder files. Please replace with actual PNG images.
echo You can create 192x192 and 512x512 PNG icons using any image editor.
