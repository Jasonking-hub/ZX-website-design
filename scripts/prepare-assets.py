from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
PDF_SOURCE = Path(r"C:\Users\Administrator\OneDrive\Desktop\扫描全能王 2026-07-06 10.56.pdf")
RENDERED_DIR = ROOT / "tmp" / "pdfs"

TARGETS = {
    "products": ROOT / "public" / "images" / "products",
    "drawings": ROOT / "public" / "images" / "drawings",
    "contact": ROOT / "public" / "images" / "contact",
    "brand": ROOT / "public" / "images" / "brand",
    "downloads": ROOT / "public" / "downloads",
}

PRODUCT_CROPS = {
    "izu.jpg": (4, (120, 220, 910, 650)),
    "db.jpg": (10, (125, 205, 905, 595)),
    "wb.jpg": (15, (145, 650, 510, 840)),
    "ddr.jpg": (20, (210, 205, 535, 390)),
    "izu7.jpg": (24, (95, 200, 960, 415)),
    "custom-stage.jpg": (26, (90, 215, 955, 670)),
}

DRAWING_CROPS = {
    "izu-drawing.jpg": (5, (85, 135, 915, 1240)),
    "db-drawing.jpg": (12, (70, 160, 925, 1260)),
    "wb-drawing.jpg": (15, (35, 900, 930, 1255)),
    "ddr-drawing.jpg": (20, (100, 840, 900, 1245)),
    "izu7-drawing.jpg": (24, (90, 960, 910, 1245)),
    "custom-stage-drawing.jpg": (27, (360, 675, 830, 1230)),
}


def ensure_dirs() -> None:
    for target in TARGETS.values():
        target.mkdir(parents=True, exist_ok=True)


def page_path(number: int) -> Path:
    return RENDERED_DIR / f"brochure-{number:02d}.png"


def load_page(number: int) -> Image.Image:
    source = page_path(number)
    if not source.exists():
        raise FileNotFoundError(
            f"Missing rendered brochure page {source}. Render the PDF into tmp/pdfs before preparing assets."
        )
    return Image.open(source).convert("RGB")


def place_on_canvas(crop: Image.Image, size: tuple[int, int]) -> Image.Image:
    canvas = Image.new("RGB", size, "white")
    max_width = size[0] - 80
    max_height = size[1] - 80
    scale = min(max_width / crop.width, max_height / crop.height)
    image = crop.resize(
        (max(1, int(crop.width * scale)), max(1, int(crop.height * scale))),
        Image.Resampling.LANCZOS,
    )
    x = (size[0] - image.width) // 2
    y = (size[1] - image.height) // 2
    canvas.paste(image, (x, y))
    return canvas


def save_crop(
    page_number: int,
    bbox: tuple[int, int, int, int],
    target: Path,
    canvas_size: tuple[int, int],
) -> None:
    page = load_page(page_number)
    crop = page.crop(bbox)
    image = place_on_canvas(crop, canvas_size)
    image.save(target, quality=92, optimize=True)
    print(target.relative_to(ROOT))


def save_qr() -> None:
    page = load_page(28)
    qr = page.crop((420, 855, 620, 1055))
    canvas = place_on_canvas(qr, (520, 520))
    canvas.save(TARGETS["contact"] / "qr-code.png", optimize=True)
    print((TARGETS["contact"] / "qr-code.png").relative_to(ROOT))


def save_hero() -> None:
    page = load_page(1)
    strip = page.crop((85, 625, 940, 780))
    canvas = Image.new("RGB", (1400, 820), "white")
    draw = ImageDraw.Draw(canvas)
    for x in range(0, 1400, 40):
        draw.line((x, 0, x, 820), fill=(237, 243, 247), width=1)
    for y in range(0, 820, 40):
        draw.line((0, y, 1400, y), fill=(237, 243, 247), width=1)
    draw.rectangle((0, 620, 1400, 820), fill=(7, 26, 47))
    strip.thumbnail((1180, 300), Image.Resampling.LANCZOS)
    canvas.paste(strip, ((1400 - strip.width) // 2, 250))
    draw.line((150, 585, 1250, 585), fill=(8, 106, 203), width=3)
    draw.line((150, 610, 1020, 610), fill=(36, 168, 244), width=1)
    canvas.save(TARGETS["brand"] / "hero-composite.jpg", quality=92, optimize=True)
    print((TARGETS["brand"] / "hero-composite.jpg").relative_to(ROOT))


def copy_pdf() -> None:
    if not PDF_SOURCE.exists():
        raise FileNotFoundError(f"Missing brochure PDF: {PDF_SOURCE}")
    target = TARGETS["downloads"] / "zhongxin-direct-drive-product-manual.pdf"
    shutil.copy2(PDF_SOURCE, target)
    print(target.relative_to(ROOT))


def main() -> None:
    if not RENDERED_DIR.exists():
        raise FileNotFoundError(f"Missing rendered page directory: {RENDERED_DIR}")

    ensure_dirs()

    for filename, (page_number, bbox) in PRODUCT_CROPS.items():
        save_crop(page_number, bbox, TARGETS["products"] / filename, (1200, 720))

    for filename, (page_number, bbox) in DRAWING_CROPS.items():
        save_crop(page_number, bbox, TARGETS["drawings"] / filename, (1400, 900))

    save_qr()
    save_hero()
    copy_pdf()


if __name__ == "__main__":
    main()
