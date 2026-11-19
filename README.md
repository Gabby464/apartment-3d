# Apartment № 3 — 3D floor plan & walkthrough

An interactive 3D model of Apartment № 3 (2nd floor, built-up area 82.93 m²), built from the
architect's floor plan. It runs entirely in the browser and is hosted on GitHub Pages.

## Views

| Mode | What it does | Controls |
|------|--------------|----------|
| **3D** | Orbit around the whole apartment, with walls optionally cut at 1.45 m | Drag to rotate, right-drag to pan, scroll to zoom, click a door to open/close it |
| **Plan** | Top-down architectural plan (section cut at 1.3 m) with room sizes | Drag to pan, scroll to zoom |
| **Walk** | First-person walkthrough at eye height (1.6 m) with collisions | WASD / arrows, mouse to look, Shift to run, **E** to open/close doors, click the mini-map to jump. On phones: joystick + drag to look |

Keys `1` / `2` / `3` switch modes. `?mode=walk` in the URL opens straight into walk mode.

## Rooms (from the plan)

| Room | Area | Clear size (cm) |
|------|------|-----------------|
| Bedroom 1 (Спалня) | 12.50 m² | 373 × 335 |
| Living & dining (Дневна-трапезария) | 15.26 m² | 395 / 253 / 295 × 593 |
| Kitchenette (Кухненски бокс) | 4.03 m² | ~150 × 268 |
| Entrance hall (Антре) | 3.53 m² | 130 / 100 × 313 |
| Bathroom (Баня-WC) | 4.04 m² | 138 / 201 × 265 |
| Walk-in closet (Дрешник) | 3.72 m² | 201 × 187 |
| Bedroom 2 (Спалня) | 11.73 m² | 407 × 292 |
| Balcony (north) | 8.49 m² | |
| Balcony (west) | 6.72 m² | |

## Editing the geometry

All geometry lives in [`src/plan.js`](src/plan.js), in centimetres, using the same orientation as the
paper plan (x to the right, y downwards). Walls are rectangles; doors and windows are openings along a
wall, with sill/head heights and the door hinge side and swing direction. Change a number there and the
3D model, plan view and mini-map all update.

Assumptions not given on the drawing: ceiling height 2.65 m, window sill heights, and which way the
balcony doors swing.

## Tech

Plain HTML + ES modules, [three.js](https://threejs.org) r160 vendored in `lib/` (MIT licence), no build
step. Floor textures are generated procedurally at load time.

Run locally:

```bash
python3 -m http.server 8000
```

then open http://localhost:8000.
