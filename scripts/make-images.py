"""Generate every image Marquee ships, with Pillow only.

    python3 scripts/make-images.py

- 18 poster title cards (600x900): a solid colour per title, the initials
  large, the full title small at the bottom.
- App icon (1024), Android adaptive icon foreground + monochrome, splash mark.
- Apple TV brand images at the exact sizes @react-native-tvos/config-tv
  requires: icon 1280x768, 400x240, 800x480; top shelf 1920x720, 3840x1440;
  top shelf wide 2320x720, 4640x1440.
- Android TV banner 320x180 and a 512x512 TV icon.

Everything is flat colour and text. Fonts come from Pillow's bundled
default so the output is identical on every machine.
"""
import json
import os
import re

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "assets")

BACKGROUND = "#0F1014"
CARD = "#1B1D24"
INK = "#F2F1EC"
INK_SECONDARY = "#9A9DA8"
ACCENT = "#E6602A"

# Titles are read from the app's own data file so the two can't drift.
DATA_TS = os.path.join(ROOT, "src", "data.ts")


def load_titles():
    src = open(DATA_TS, encoding="utf-8").read()
    pattern = re.compile(
        r"id:\s*'([^']+)',\s*title:\s*'([^']+)',[^}]*?color:\s*'(#[0-9A-Fa-f]{6})'",
        re.S,
    )
    titles = [{"id": i, "title": t, "color": c} for i, t, c in pattern.findall(src)]
    if len(titles) != 18:
        raise SystemExit(f"expected 18 titles in src/data.ts, found {len(titles)}")
    return titles


def font(size):
    return ImageFont.load_default(size=size)


def initials(title):
    words = [w for w in re.split(r"[\s.]+", title) if w and w.lower() not in ("the", "a", "of", "in", "and", "jr")]
    return "".join(w[0].upper() for w in words[:2]) or title[:2].upper()


def text_size(draw, text, f):
    l, t, r, b = draw.textbbox((0, 0), text, font=f)
    return r - l, b - t, l, t


def centered_text(draw, xy, text, f, fill):
    cx, cy = xy
    w, h, l, t = text_size(draw, text, f)
    draw.text((cx - w / 2 - l, cy - h / 2 - t), text, font=f, fill=fill)


def wrap(draw, text, f, max_width):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if text_size(draw, trial, f)[0] <= max_width or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def poster(entry, size=(600, 900)):
    w, h = size
    img = Image.new("RGB", size, entry["color"])
    d = ImageDraw.Draw(img)
    # a slightly darker band at the bottom for the title
    band_h = int(h * 0.22)
    d.rectangle([0, h - band_h, w, h], fill=_darken(entry["color"], 0.72))
    centered_text(d, (w / 2, h * 0.40), initials(entry["title"]), font(int(h * 0.30)), INK)
    f = font(40)
    lines = wrap(d, entry["title"], f, w - 60)
    y = h - band_h / 2 - (len(lines) - 1) * 24
    for line in lines:
        centered_text(d, (w / 2, y), line, f, INK)
        y += 48
    return img


def _darken(hex_color, factor):
    r, g, b = int(hex_color[1:3], 16), int(hex_color[3:5], 16), int(hex_color[5:7], 16)
    return (int(r * factor), int(g * factor), int(b * factor))


def marquee_mark(size, bg=BACKGROUND, bulbs=True):
    """The app mark: a rounded accent tile with a ring of 'bulbs' and an M."""
    scale = 4
    s = size * scale
    img = Image.new("RGBA", (s, s), bg)
    d = ImageDraw.Draw(img)
    pad = int(s * 0.12)
    d.rounded_rectangle([pad, pad, s - pad, s - pad], radius=int(s * 0.16), fill=ACCENT)
    if bulbs:
        n = 7
        inset = int(s * 0.17)
        r = int(s * 0.018)
        for i in range(n):
            t = i / (n - 1)
            x = inset + t * (s - 2 * inset)
            for y in (inset, s - inset):
                d.ellipse([x - r, y - r, x + r, y + r], fill=INK)
            y = inset + t * (s - 2 * inset)
            for x in (inset, s - inset):
                d.ellipse([x - r, y - r, x + r, y + r], fill=INK)
    centered_text(d, (s / 2, s / 2 + s * 0.01), "M", font(int(s * 0.42)), INK)
    return img.resize((size, size), Image.LANCZOS)


def brand_row(size, shelf_cards=0):
    """Mark + 'Marquee' (+ optional shelf of small cards), scaled to fit the
    canvas width. Used for every Apple TV brand image and the Android banner."""
    w, h = size
    img = Image.new("RGB", size, BACKGROUND)
    d = ImageDraw.Draw(img)
    budget = int(w * 0.86)
    scale = 1.0
    while True:
        mark_size = int(h * 0.56 * scale)
        f = font(max(8, int(h * 0.24 * scale)))
        tw, th, l, t = text_size(d, "Marquee", f)
        gap = int(h * 0.07 * scale)
        card_h = int(h * 0.56 * scale)
        card_w = int(card_h * 2 / 3)
        card_gap = int(h * 0.05 * scale)
        shelf_w = (card_w + card_gap) * shelf_cards + (gap if shelf_cards else 0)
        total = mark_size + gap + tw + shelf_w
        if total <= budget or scale < 0.2:
            break
        scale *= 0.94
    mark = marquee_mark(mark_size, bg=BACKGROUND).convert("RGB")
    x = int((w - total) / 2)
    img.paste(mark, (x, int((h - mark.height) / 2)))
    x += mark.width + gap
    d.text((x - l, h / 2 - th / 2 - t), "Marquee", font=f, fill=INK)
    x += tw + (gap if shelf_cards else 0)
    y = int((h - card_h) / 2)
    for entry in TITLES[:shelf_cards]:
        d.rounded_rectangle([x, y, x + card_w, y + card_h], radius=int(card_h * 0.06), fill=entry["color"])
        centered_text(d, (x + card_w / 2, y + card_h / 2), initials(entry["title"]), font(int(card_h * 0.32)), INK)
        x += card_w + card_gap
    return img


def wordmark(size):
    return brand_row(size, shelf_cards=6)


def apple_icon(size):
    return brand_row(size)


def banner(size=(320, 180)):
    return brand_row(size)


def save(img, rel):
    path = os.path.join(ASSETS, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path)
    print(f"wrote assets/{rel} ({img.width}x{img.height})")


TITLES = load_titles()

for entry in TITLES:
    save(poster(entry), f"posters/{entry['id']}.png")

# App icon and Android adaptive icon (glyph inside the safe zone, background
# colour comes from app.json).
save(marquee_mark(1024).convert("RGB"), "icon.png")
adaptive = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
glyph = marquee_mark(660, bg=(0, 0, 0, 0))
adaptive.alpha_composite(glyph, (182, 182))
save(adaptive, "adaptive-icon.png")
mono = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
mono_glyph = Image.new("RGBA", (660, 660), (0, 0, 0, 0))
ImageDraw.Draw(mono_glyph).rounded_rectangle([80, 80, 580, 580], radius=105, fill=(255, 255, 255, 255))
centered_text(ImageDraw.Draw(mono_glyph), (330, 336), "M", font(277), (0, 0, 0, 0))
mono.alpha_composite(mono_glyph, (182, 182))
save(mono, "adaptive-icon-monochrome.png")
save(marquee_mark(512).convert("RGB"), "splash-icon.png")

# Apple TV brand images (exact sizes required by config-tv).
save(apple_icon((1280, 768)), "tv/appletv-icon-1280x768.png")
save(apple_icon((400, 240)), "tv/appletv-icon-400x240.png")
save(apple_icon((800, 480)), "tv/appletv-icon-800x480.png")
save(wordmark((1920, 720)), "tv/appletv-topshelf-1920x720.png")
save(wordmark((3840, 1440)), "tv/appletv-topshelf-3840x1440.png")
save(wordmark((2320, 720)), "tv/appletv-topshelfwide-2320x720.png")
save(wordmark((4640, 1440)), "tv/appletv-topshelfwide-4640x1440.png")

# Android TV.
save(banner((320, 180)), "tv/android-banner-320x180.png")
save(marquee_mark(512).convert("RGB"), "tv/android-icon-512x512.png")
