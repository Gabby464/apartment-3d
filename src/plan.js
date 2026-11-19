// Apartment No. 3 — geometry read from the architect's plan.
//
// Units: centimetres. Plan coordinates: x grows to the right, y grows
// downwards (same orientation as the paper drawing). Origin = inner
// top-left corner of Bedroom 1. Heights (sill/head) are measured from
// the finished floor.
//
// Key dimensions taken from the drawing:
//   Bedroom 1        373 x 335
//   Living + kitchen 395 wide (top), 253 (middle), 295 (sofa area), 593 deep
//   Kitchenette      ~150 x 268
//   Entrance hall    130 / 100 wide, 313 long
//   Bathroom         138 / 201 wide, 265 long
//   Walk-in closet   201 x 187
//   Bedroom 2        407 x 292
//   Exterior walls 37 cm (25 on the east side), partitions 12 cm.

export const H = 265; // clear ceiling height (assumed — not given on the plan)

export const INFO = {
  title: 'Apartment № 3',
  floor: '2nd floor (1st residential), level +3.05 m',
  builtArea: 82.93,
  totalArea: 97.86,
};

export const ROOMS = [
  { id: 'bed1', en: 'Bedroom 1', bg: 'Спалня', area: 12.50, floor: 'wood',
    rects: [[0, 0, 373, 335]], dims: '373 × 335' },
  { id: 'living', en: 'Living & dining', bg: 'Дневна-трапезария', area: 15.26, floor: 'wood',
    rects: [[385, 0, 630, 268], [385, 268, 638, 580], [343, 347, 385, 580]],
    label: [495, 440], dims: '395 / 253 / 295 × 593' },
  { id: 'kitchen', en: 'Kitchenette', bg: 'Кухненски бокс', area: 4.03, floor: 'tile',
    rects: [[630, 0, 780, 268]], dims: '150 × 268' },
  { id: 'hall', en: 'Entrance hall', bg: 'Антре', area: 3.53, floor: 'tile',
    rects: [[650, 280, 780, 408], [650, 408, 750, 580], [638, 280, 650, 580]], label: [715, 345], dims: '130 / 100 × 313' },
  { id: 'bath', en: 'Bathroom', bg: 'Баня-WC', area: 4.04, floor: 'bath',
    rects: [[762, 433, 900, 606], [762, 606, 963, 698]], label: [798, 560], dims: '138 / 201 × 265' },
  // Walk-in closet: the 12 cm wall to the bedroom is removed (was 3.72 m², 201 × 187)
  { id: 'closet', en: 'Walk-in closet', bg: 'Дрешник', area: 3.98, floor: 'wood',
    rects: [[750, 710, 963, 897]], label: [840, 813], dims: '213 × 187' },
  { id: 'bed2', en: 'Master bedroom', bg: 'Родителска спалня', area: 11.73, floor: 'wood',
    rects: [[343, 605, 750, 897]], label: [528, 660], dims: '407 × 292' },
  { id: 'balc1', en: 'Balcony', bg: 'Балкон', area: 8.49, floor: 'outdoor', outdoor: true,
    rects: [[-37, -145, 830, -37]] },
  { id: 'balc2', en: 'Balcony', bg: 'Балкон', area: 6.72, floor: 'outdoor', outdoor: true,
    rects: [[-37, 372, 306, 565]] },
];

// Common corridor outside the front door (not part of the apartment).
export const LANDING = { en: 'Building corridor', rect: [805, 280, 1000, 408] };

// Walls: r = [x1, y1, x2, y2]. Openings are positioned along the wall's long axis.
// Doors: hinge = which end the leaf is hung on, swing = +1/-1 towards +y/+x or -y/-x.
export const WALLS = [
  // North facade (bedroom 1, living, kitchen) facing the long balcony
  { r: [-37, -37, 780, 0], ext: true, openings: [
    { type: 'window', from: 62, to: 182, sill: 80, head: 230 },                       // 120/150
    { type: 'door', from: 182, to: 267, head: 230, hinge: 'to', swing: 1, kind: 'glass', open: false }, // 85/230
    { type: 'door', from: 397, to: 567, head: 230, leaves: 2, swing: 1, kind: 'glass', open: false },   // 2×85/230
    { type: 'window', from: 655, to: 715, sill: 105, head: 230 },                     // 60/125
  ] },
  { r: [780, -37, 830, 280], ext: true },                // kitchen east wall (25 + 25)
  { r: [-37, 0, 0, 335], ext: true },                    // bedroom 1 west
  { r: [-37, 335, 306, 372], ext: true },                // bedroom 1 south (over west balcony)
  { r: [306, 335, 385, 347] },
  { r: [373, 0, 385, 335], openings: [                   // bedroom 1 / living
    { type: 'door', from: 30, to: 115, head: 200, hinge: 'from', swing: -1, kind: 'interior' },  // B2 85/200
  ] },
  { r: [306, 347, 343, 927], ext: true, openings: [      // west facade: living + bedroom 2
    { type: 'door', from: 370, to: 455, head: 230, hinge: 'from', swing: 1, kind: 'glass', open: false }, // 85/230
    { type: 'window', from: 455, to: 540, sill: 80, head: 230 },                       // 85/150
    { type: 'window', from: 670, to: 860, sill: 80, head: 230 },                       // 190
  ] },
  { r: [343, 897, 988, 927], ext: true },                // south facade
  { r: [963, 606, 988, 897], ext: true },                // east (closet / bathroom)
  { r: [900, 581, 988, 606], ext: true },
  { r: [900, 433, 925, 581], ext: true },
  { r: [750, 408, 925, 433] },                           // bathroom north
  { r: [780, 280, 805, 408], openings: [                 // front door to corridor
    { type: 'door', from: 295, to: 395, head: 210, hinge: 'to', swing: -1, kind: 'entrance', open: false }, // B1 100/210 – hinged on the bathroom side so it opens against the bathroom wall, freeing the wall opposite
  ] },
  { r: [638, 268, 780, 280] },                           // kitchen / hall
  // hall / living wall (with door B4) removed – replaced by a two-sided unit (see interior.js)
  { r: [343, 580, 750, 605], openings: [                 // living + hall / bedroom 2
    { type: 'door', from: 660, to: 745, head: 200, hinge: 'to', swing: 1, kind: 'interior' },    // B2 85/200
  ] },
  { r: [750, 433, 762, 710], openings: [                 // hall / bathroom (wall to the closet removed)
    { type: 'door', from: 438, to: 508, head: 200, hinge: 'from', swing: 1, kind: 'interior' },  // bathroom – 70 cm (was 85), opens flat against the north wall, clears the laundry tower
  ] },
  { r: [762, 698, 963, 710] },                           // bathroom / closet
];

// Balcony railings (100 cm high)
export const RAILINGS = [
  [-37, -145, 830, -140], [-37, -140, -32, -37], [825, -140, 830, -37],
  [-37, 372, -32, 565], [-32, 560, 306, 565],
];

// Invisible limits for the corridor patch outside the front door
export const LANDING_LIMITS = [
  [805, 270, 1000, 280], [1000, 280, 1010, 408], [925, 408, 1000, 418],
];
