Add-Type -AssemblyName System.Drawing

$img_path = "c:\Users\KiTE\Desktop\12 star\public\images\logo.png"
$jpeg_path = "c:\Users\KiTE\Desktop\12 star\public\images\logo\logo.jpeg"

$img = [System.Drawing.Image]::FromFile($img_path)
$bmp = New-Object System.Drawing.Bitmap($img)
$w = $bmp.Width
$h = $bmp.Height

$y_min = 100
$y_max = 550
$x_min = 350
$x_max = 900

$visited = New-Object 'System.Collections.Generic.HashSet[string]'
$stars = New-Object 'System.Collections.Generic.List[PSObject]'

for ($y = $y_min; $y -lt $y_max; $y++) {
    for ($x = $x_min; $x -lt $x_max; $x++) {
        $key = "${x},${y}"
        if ($visited.Contains($key)) { continue }
        
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.R -lt 100 -and $pixel.G -lt 100 -and $pixel.B -lt 100) {
            # Flood fill
            $queue = New-Object 'System.Collections.Generic.List[System.Drawing.Point]'
            $queue.Add((New-Object System.Drawing.Point($x, $y)))
            [void]$visited.Add($key)
            
            $comp_pixels = New-Object 'System.Collections.Generic.List[System.Drawing.Point]'
            $idx = 0
            while ($idx -lt $queue.Count) {
                $pt = $queue[$idx]
                $idx++
                $comp_pixels.Add($pt)
                
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
            
            if ($comp_pixels.Count -gt 150 -and $comp_pixels.Count -lt 550) {
                # Find bounding box
                $min_x = 9999; $max_x = -1; $min_y = 9999; $max_y = -1
                foreach ($p in $comp_pixels) {
                    if ($p.X -lt $min_x) { $min_x = $p.X }
                    if ($p.X -gt $max_x) { $max_x = $p.X }
                    if ($p.Y -lt $min_y) { $min_y = $p.Y }
                    if ($p.Y -gt $max_y) { $max_y = $p.Y }
                }
                
                $cx = [int]( ($min_x + $max_x) / 2 )
                $cy = [int]( ($min_y + $max_y) / 2 )
                
                $dx = $cx - 627
                $dy = $cy - 308
                $dist = [Math]::Sqrt($dx*$dx + $dy*$dy)
                
                if ($dist -ge 130 -and $dist -le 220) {
                    $star = [PSCustomObject]@{
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
}

$sorted = $stars | Sort-Object cx
Write-Host "Found $($sorted.Count) filtered stars."

# Erase indices 5 (left-bottom star at Y=463), 6 (top center at Y=166), 7 (right-bottom star at Y=463)
$to_remove = @(5, 6, 7)

$g = [System.Drawing.Graphics]::FromImage($bmp)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)

foreach ($idx in $to_remove) {
    if ($idx -lt $sorted.Count) {
        $s = $sorted[$idx]
        $rect_w = ($s.max_x - $s.min_x) + 12
        $rect_h = ($s.max_y - $s.min_y) + 12
        $rect_x = $s.min_x - 6
        $rect_y = $s.min_y - 6
        $g.FillRectangle($brush, $rect_x, $rect_y, $rect_w, $rect_h)
        Write-Host ("Erased star at index " + $idx + ": Center=(" + $s.cx + ", " + $s.cy + ")")
    }
}

$g.Dispose()

$new_bmp = New-Object System.Drawing.Bitmap($bmp)
$img.Dispose()
$bmp.Dispose()

$new_bmp.Save($img_path, [System.Drawing.Imaging.ImageFormat]::Png)
$new_bmp.Save($jpeg_path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$new_bmp.Dispose()

Write-Host "Logo successfully updated with 3 stars symmetrically removed!"
