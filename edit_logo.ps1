Add-Type -AssemblyName System.Drawing

$img_path = "c:\Users\KiTE\Desktop\12 star\public\images\logo.png"
$jpeg_path = "c:\Users\KiTE\Desktop\12 star\public\images\logo\logo.jpeg"

if (-not (Test-Path $img_path)) {
    Write-Host "Error: logo.png not found"
    exit
}

Write-Host "Loading logo image..."
$img = [System.Drawing.Image]::FromFile($img_path)
$bmp = New-Object System.Drawing.Bitmap($img)
$w = $bmp.Width
$h = $bmp.Height
Write-Host "Logo size is ${w}x${h}"

# Bounding box coordinates for the star arch in 1250x1250 image
$y_min = [int](0.12 * $h)
$y_max = [int](0.38 * $h)
$x_min = [int](0.28 * $w)
$x_max = [int](0.72 * $w)

# Visited tracker hash map
$visited = New-Object 'System.Collections.Generic.HashSet[string]'
$stars = New-Object 'System.Collections.Generic.List[PSObject]'

Write-Host "Searching for star components..."
# Connect components
for ($y = $y_min; $y -lt $y_max; $y++) {
    for ($x = $x_min; $x -lt $x_max; $x++) {
        $key = "${x},${y}"
        if ($visited.Contains($key)) { continue }
        
        $pixel = $bmp.GetPixel($x, $y)
        # Check if pixel is dark (part of star)
        if ($pixel.R -lt 100 -and $pixel.G -lt 100 -and $pixel.B -lt 100) {
            # Start flood fill
            $queue = New-Object 'System.Collections.Generic.List[System.Drawing.Point]'
            $queue.Add((New-Object System.Drawing.Point($x, $y)))
            [void]$visited.Add($key)
            
            $comp_pixels = New-Object 'System.Collections.Generic.List[System.Drawing.Point]'
            $idx = 0
            while ($idx -lt $queue.Count) {
                $pt = $queue[$idx]
                $idx++
                $comp_pixels.Add($pt)
                
                # Check 4-neighbors
                foreach ($offset in @((-1, 0), (1, 0), (0, -1), (0, 1))) {
                    $nx = $pt.X + $offset[0]
                    $ny = $pt.Y + $offset[1]
                    if ($nx -ge $x_min -and $nx -lt $x_max -and $ny -ge $y_min -and $ny -lt $y_max) {
                        $nkey = "${nx},${ny}"
                        if (-not $visited.Contains($nkey)) {
                            $npixel = $bmp.GetPixel($nx, $ny)
                            if ($npixel.R -lt 100 -and $npixel.G -lt 100 -and $npixel.B -lt 100) {
                                [void]$visited.Add($nkey)
                                $queue.Add((New-Object System.Drawing.Point($nx, $ny)))
                            }
                        }
                    }
                }
            }
            
            # Filter component size (stars should be between 50 and 1500 pixels)
            if ($comp_pixels.Count -gt 50 -and $comp_pixels.Count -lt 1500) {
                # Calculate bounding box & centroid
                $min_x = 9999; $max_x = -1; $min_y = 9999; $max_y = -1
                $sum_x = 0; $sum_y = 0
                
                foreach ($p in $comp_pixels) {
                    if ($p.X -lt $min_x) { $min_x = $p.X }
                    if ($p.X -gt $max_x) { $max_x = $p.X }
                    if ($p.Y -lt $min_y) { $min_y = $p.Y }
                    if ($p.Y -gt $max_y) { $max_y = $p.Y }
                    $sum_x += $p.X
                    $sum_y += $p.Y
                }
                
                $cx = [int]($sum_x / $comp_pixels.Count)
                $cy = [int]($sum_y / $comp_pixels.Count)
                
                $star = [PSCustomObject]@{
                    pixels = $comp_pixels
                    cx = $cx
                    cy = $cy
                    min_x = $min_x
                    min_y = $min_y
                    max_x = $max_x
                    max_y = $max_y
                    count = $comp_pixels.Count
                }
                $stars.Add($star)
            }
        }
    }
}

Write-Host "Found $($stars.Count) star-like dark components."

# Sort stars from left to right by their X centroid
$sorted_stars = $stars | Sort-Object cx

for ($i = 0; $i -lt $sorted_stars.Count; $i++) {
    Write-Host "Star ${i}: Center=($($sorted_stars[$i].cx), $($sorted_stars[$i].cy)), Size=$($sorted_stars[$i].count)"
}

# Symmetrically remove 3 stars if we found exactly 15:
# - Index 0 (bottom-left star)
# - Index 7 (top center star)
# - Index 14 (bottom-right star)
$to_remove = @()
if ($sorted_stars.Count -eq 15) {
    $to_remove = @(0, 7, 14)
    Write-Host "Erasing indices 0, 7, and 14."
} else {
    $to_remove = @(0, [int]($sorted_stars.Count / 2), ($sorted_stars.Count - 1))
    Write-Host "Erasing indices: $to_remove"
}

# Drawing canvas
$g = [System.Drawing.Graphics]::FromImage($bmp)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)

foreach ($idx in $to_remove) {
    if ($idx -lt $sorted_stars.Count) {
        $s = $sorted_stars[$idx]
        $rect_w = ($s.max_x - $s.min_x) + 12
        $rect_h = ($s.max_y - $s.min_y) + 12
        $rect_x = $s.min_x - 6
        $rect_y = $s.min_y - 6
        $g.FillRectangle($brush, $rect_x, $rect_y, $rect_w, $rect_h)
        Write-Host "Filled white rectangle over star at centroid ($($s.cx), $($s.cy))"
    }
}

# Dispose graphics and save
$g.Dispose()

# We need to save the file. Direct saving may lock if the image object was bound, 
# so clone the bitmap, dispose original objects first, then save to files.
$new_bmp = New-Object System.Drawing.Bitmap($bmp)
$img.Dispose()
$bmp.Dispose()

# Save PNG and Jpeg
$new_bmp.Save($img_path, [System.Drawing.Imaging.ImageFormat]::Png)
$new_bmp.Save($jpeg_path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$new_bmp.Dispose()

Write-Host "Logo successfully updated!"
