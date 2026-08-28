from pathlib import Path

from PIL import Image, ImageOps


project_root = Path(__file__).resolve().parents[1]
image_dir = project_root / "public" / "images" / "concierge"
source_bytes = 0
output_bytes = 0

for source in sorted(image_dir.glob("*.png")):
    target = source.with_suffix(".webp")
    source_bytes += source.stat().st_size

    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")
        image.save(target, "WEBP", quality=84, method=6)

    output_bytes += target.stat().st_size
    print(f"{source.name} -> {target.name}")

reduction = 100 - (output_bytes / source_bytes * 100) if source_bytes else 0
print(
    f"Optimized {source_bytes / 1024 / 1024:.1f} MB into "
    f"{output_bytes / 1024 / 1024:.1f} MB ({reduction:.0f}% smaller)."
)
