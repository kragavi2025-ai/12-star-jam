from PIL import Image, ImageDraw
import sys

def edit_logo():
    img_path = r"c:\Users\KiTE\Desktop\12 star\public\images\logo.png"
    try:
        img = Image.open(img_path)
    except Exception as e:
        print(f"Error opening image: {e}")
        return

    img = img.convert("RGBA")
    w, h = img.size
    print(f"Loaded logo of size {w}x{h}")

    # Bounding box for star arch
    y_min, y_max = int(0.12 * h), int(0.38 * h)
    x_min, x_max = int(0.28 * w), int(0.72 * w)

    # Find dark pixels
    pixels = img.load()
    visited = set()
    stars = []

    # Simple flood fill to find small black components (stars)
    for y in range(y_min, y_max):
        for x in range(x_min, x_max):
            r, g, b, a = pixels[x, y]
            # Dark pixel threshold (stars are black/dark)
            is_dark = (r < 100 and g < 100 and b < 100)
            if is_dark and (x, y) not in visited:
                # Flood fill
                queue = [(x, y)]
                visited.add((x, y))
                comp_pixels = []
                idx = 0
                while idx < len(queue):
                    cx, cy = queue[idx]
                    idx += 1
                    comp_pixels.append((cx, cy))
                    # Check 4-neighbors
                    for nx, ny in [(cx-1, cy), (cx+1, cy), (cx, cy-1), (cx, cy+1)]:
                        if x_min <= nx < x_max and y_min <= ny < y_max:
                            if (nx, ny) not in visited:
                                nr, ng, nb, _ = pixels[nx, ny]
                                if nr < 100 and ng < 100 and nb < 100:
                                    visited.add((nx, ny))
                                    queue.append((nx, ny))
                
                # Filter component size (stars should be between 50 and 1500 pixels)
                if 50 < len(comp_pixels) < 1500:
                    xs = [p[0] for p in comp_pixels]
                    ys = [p[1] for p in comp_pixels]
                    min_x, max_x = min(xs), max(xs)
                    min_y, max_y = min(ys), max(ys)
                    centroid_x = sum(xs) // len(xs)
                    centroid_y = sum(ys) // len(ys)
                    
                    # Ensure it is not part of the crown or text
                    # (Crown and letters are much larger, and stars are isolated)
                    stars.append({
                        'pixels': comp_pixels,
                        'cx': centroid_x,
                        'cy': centroid_y,
                        'bbox': (min_x, min_y, max_x, max_y)
                    })

    print(f"Found {len(stars)} star-like dark components.")
    
    # Sort stars from left to right by their X coordinate
    stars = sorted(stars, key=lambda s: s['cx'])
    for i, star in enumerate(stars):
         print(f"Star {i}: centroid=({star['cx']}, {star['cy']}), size={len(star['pixels'])}")

    # We want to remove 3 stars symmetrically from the 15 stars around the crown:
    # Let's verify we have exactly 15 stars in the arch.
    # If we do, we remove:
    # - index 0 (far left)
    # - index 7 (top center)
    # - index 14 (far right)
    # If we have 15 components, we remove these indices. If not, we remove indices based on the count.
    to_remove = []
    if len(stars) == 15:
        to_remove = [0, 7, 14]
        print("Symmetrical removal of 3 stars: indices [0, 7, 14]")
    elif len(stars) == 16:
        # Sometimes there might be a tiny noise component. Let's look at the centroids or filter.
        # Let's remove the first, the closest to center, and the last.
        # Find index closest to top-center (x close to w/2, y is minimum / highest)
        # Let's look at centroids:
        to_remove = [0, len(stars)//2, len(stars)-1]
        print(f"Found 16 stars. Erasing indices {to_remove}")
    elif len(stars) > 3:
        # General case
        to_remove = [0, len(stars)//2, len(stars)-1]
        print(f"Found {len(stars)} stars. Erasing indices {to_remove}")

    # Draw white pixels over the stars to erase them
    draw = ImageDraw.Draw(img)
    for idx in to_remove:
        star = stars[idx]
        min_x, min_y, max_x, max_y = star['bbox']
        # Paint white box with safety margin
        draw.rectangle([min_x - 6, min_y - 6, max_x + 6, max_y + 6], fill=(255, 255, 255, 255))
        print(f"Erased star at index {idx} centroid ({star['cx']}, {star['cy']})")

    # Save as png and jpeg
    img.save(img_path)
    img.convert("RGB").save(r"c:\Users\KiTE\Desktop\12 star\public\images\logo\logo.jpeg")
    print("Logo updated successfully!")

if __name__ == "__main__":
    edit_logo()
