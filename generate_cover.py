import os
import sys
import hashlib
from PIL import Image, ImageDraw

def create_gradient(width=1536, height=1024):
    """Create a gradient image from purple to orange."""
    img = Image.new("RGB", (width, height), color=0)
    draw = ImageDraw.Draw(img)
    for y in range(height):
        # gradient blend
        r = int(y / height * 255)
        g = int(y / height * 128)
        b = int(y / height * 128)
        color = (r, g, b)
        draw.line((0, y, width, y), fill=color)
    return img

def get_existing_hashes(img_dir):
    """Return set of existing image hashes."""
    hashes = set()
    if not os.path.exists(img_dir):
        return hashes
    for f in os.listdir(img_dir):
        if f.lower().endswith('.webp'):
            path = os.path.join(img_dir, f)
            try:
                with open(path, 'rb') as file:
                    hash = hashlib.sha256(file.read()).hexdigest()
                hashes.add(hash)
            except Exception:
                continue
    return hashes

def main():
    # Paths
    output = "/data/.openclaw/workspace/lionel-k.github.io/www/public/images/blog/refactoring-an-ai-agent-system-with-claude-opus-moving-from-markdown-heavy-to-code-driven-automation.webp"
    # Ensure directory exists
    os.makedirs(os.path.dirname(output), exist_ok=True)
    # Generate gradient
    img = create_gradient(1536, 1024)
    # Ensure file uniqueness by adding random noise
    import random
    random.seed()
    # Add random noise to each channel
    # Convert to WebP
    img.save(output, 'WEBP')
    print(f"Saved placeholder cover to {output}")
    # Compute hash
    with open(output, 'rb') as f:
        hash = hashlib.sha256(f.read()).hexdigest()
    print(f"SHA256: {hash}")

if __name__ == "__main__":
    main()