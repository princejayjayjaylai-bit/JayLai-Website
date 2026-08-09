#!/usr/bin/env python3
"""Remove paper background from experience landmark PNGs; output transparent #0c2340 silhouettes."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

NAVY = (12, 35, 64, 255)
ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "scripts" / "experience-landmark-sources"
OUT = ROOT / "public" / "images" / "experience"

PAIRS = (
    ("oriental-pearl-source.png", "oriental-pearl.png"),
    ("nanning-convention-source.png", "nanning-convention.png"),
)


def sample_background(im: Image.Image, margin: int = 24) -> tuple[float, float, float]:
    px = im.load()
    w, h = im.size
    rs: list[int] = []
    gs: list[int] = []
    bs: list[int] = []
    for y in range(h):
        for x in range(w):
            if x < margin or y < margin or x >= w - margin or y >= h - margin:
                r, g, b = px[x, y][:3]
                rs.append(r)
                gs.append(g)
                bs.append(b)
    n = len(rs)
    return (sum(rs) / n, sum(gs) / n, sum(bs) / n)


def dist(c1: tuple[float, float, float], c2: tuple[int, int, int]) -> float:
    return abs(c1[0] - c2[0]) + abs(c1[1] - c2[1]) + abs(c1[2] - c2[2])


def is_bg_pixel(r: int, g: int, b: int, bg: tuple[float, float, float]) -> bool:
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    if lum >= 168:
        return True
    if min(r, g, b) >= 162:
        return True
    if dist(bg, (r, g, b)) <= 58:
        return True
    return False


def flood_background(im: Image.Image, bg: tuple[float, float, float]) -> list[list[bool]]:
    w, h = im.size
    px = im.load()
    is_bg = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    def seed(x: int, y: int) -> None:
        if 0 <= x < w and 0 <= y < h and not is_bg[y][x]:
            r, g, b = px[x, y][:3]
            if is_bg_pixel(r, g, b, bg):
                is_bg[y][x] = True
                q.append((x, y))

    for x in range(w):
        seed(x, 0)
        seed(x, h - 1)
    for y in range(h):
        seed(0, y)
        seed(w - 1, y)

    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not is_bg[ny][nx]:
                r, g, b = px[nx, ny][:3]
                if is_bg_pixel(r, g, b, bg):
                    is_bg[ny][nx] = True
                    q.append((nx, ny))
    return is_bg


def process(in_path: Path, out_path: Path) -> tuple[int, int]:
    im = Image.open(in_path).convert("RGBA")
    bg = sample_background(im)
    is_bg = flood_background(im, bg)
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if is_bg[y][x] or lum >= 155:
                px[x, y] = (0, 0, 0, 0)
            elif lum >= 95:
                t = (155 - lum) / 60
                a = max(0, min(255, int(255 * t)))
                px[x, y] = (NAVY[0], NAVY[1], NAVY[2], a)
            else:
                px[x, y] = NAVY

    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    OUT.mkdir(parents=True, exist_ok=True)
    im.save(out_path, "PNG")
    return im.size


def main() -> None:
    for src_name, out_name in PAIRS:
        size = process(SRC / src_name, OUT / out_name)
        print(f"{out_name}: {size[0]}×{size[1]}")


if __name__ == "__main__":
    main()
