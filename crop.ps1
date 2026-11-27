Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\KiTE\.gemini\antigravity\brain\e562b99a-79fe-4bd2-a82f-84a307b1a809\media__1787105841844.jpg"
$outDir = "c:\Users\KiTE\Desktop\12 star\public\images"

if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force
}

$bmp = New-Object System.Drawing.Bitmap($srcPath)

# Define crops: Name, X, Y, Width, Height
$crops = @(
    # 2. Hero Image: Y from 38 to 375, X from 260 to 570
    @{ Name = "hero-child.jpg"; X = 260; Y = 38; W = 310; H = 345 }
    
    # Programs top row (3, 4): Y from 58 to 305? Wait, let's adjust Y coords.
    # Toddler Program: X=585, Y=58, W=210, H=148
    @{ Name = "program-toddler.jpg"; X = 585; Y = 58; W = 210; H = 148 }
    # Primary Program: X=800, Y=59, W=210, H=148
    @{ Name = "program-primary.jpg"; X = 800; Y = 59; W = 210; H = 148 }
    
    # Programs middle row (5, 6): Y from 238 to 386? Let's check:
    # Lower Elementary: X=585, Y=238, W=210, H=148
    @{ Name = "program-lower-elementary.jpg"; X = 585; Y = 238; W = 210; H = 148 }
    # Upper Elementary: X=800, Y=238, W=210, H=148
    @{ Name = "program-upper-elementary.jpg"; X = 800; Y = 238; W = 210; H = 148 }
    
    # Campus Life bottom row (7, 8, 9, 10, 11)
    # 7. Beautiful Campus: X=5, Y=436, W=233, H=173
    @{ Name = "campus.jpg"; X = 5; Y = 436; W = 233; H = 173 }
    # 8. Outdoor Learning: X=243; Y=436; W=185; H=173
    @{ Name = "outdoor-learning.jpg"; X = 243; Y = 436; W = 185; H = 173 }
    # 9. Practical Life: X=433; Y=436; W=183; H=173
    @{ Name = "practical-life.jpg"; X = 433; Y = 436; W = 183; H = 173 }
    # 10. Joyful Classrooms: X=621; Y=436; W=195; H=173
    @{ Name = "classroom.jpg"; X = 621; Y = 436; W = 195; H = 173 }
    # 11. Peaceful Library: X=821; Y=436; W=195; H=173
    @{ Name = "library.jpg"; X = 821; Y = 436; W = 195; H = 173 }
)

foreach ($c in $crops) {
    Write-Output "Cropping $($c.Name)..."
    $rect = New-Object System.Drawing.Rectangle($c.X, $c.Y, $c.W, $c.H)
    
    # Clone area
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $dest = Join-Path $outDir $c.Name
    $cropped.Save($dest, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
}

$bmp.Dispose()
Write-Output "Done cropping all images."
