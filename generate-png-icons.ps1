Add-Type -AssemblyName System.Drawing

$iconSizes = @("192", "512")
$iconsDir = "icons"

if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Force -Path $iconsDir | Out-Null
    Write-Host "Created icon directory: $iconsDir"
}

foreach ($size in $iconSizes) {
    $width = [int]$size
    $height = [int]$size
    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.Clear([System.Drawing.Color]::FromArgb(255, 45, 106, 79))
    $padding = $width * 0.1
    $iconSize = $width - ($padding * 2)
    $x = $padding
    $y = $padding
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
    $graphics.FillRectangle($brush, $x, $y, $iconSize, $iconSize)
    $brush.Dispose()
    $graphics.Dispose()
    $iconPath = Join-Path $iconsDir "icon-$size.png"
    $bitmap.Save($iconPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bitmap.Dispose()
    Write-Host "Generated: icon-$size.png ($size x $size)"
}

Write-Host ""
Write-Host "PNG icons generated successfully!"
