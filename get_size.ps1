Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("c:\Users\KiTE\Desktop\12 star\public\images\logo\logo.jpeg")
Write-Output "Width: $($img.Width), Height: $($img.Height)"
$img.Dispose()
