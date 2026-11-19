// Interior: master bedroom (Bedroom 2) + open walk-in closet.
// Same units/coordinates as plan.js (cm; x right, y down; z = height above floor).
//
// Bedroom 2 interior: x 343–750, y 605–897
// Walk-in (wall to the bedroom removed): x 750–963, y 710–897

import * as THREE from 'three';

// ---------------------------------------------------------------- electrical points
// t: switch | socket | light | sensor ; n: direction into the room (for wall plates)
export const ELECTRIC = [
  { id: 'К1', t: 'switch', x: 645, y: 605, h: 110, n: [0, 1], w: 8, room: 'Спалня',
    bg: 'Ключ – основна лампа, до вратата', note: 'девиатор: основната лампа се пали и от леглото' },
  { id: 'Т1', t: 'socket', x: 645, y: 605, h: 30, n: [0, 1], w: 8, room: 'Спалня',
    bg: 'Контакт – общ (прахосмукачка)' },
  { id: 'Л1', t: 'light', x: 546, y: 751, ceil: true, room: 'Спалня', bg: 'Основна лампа – таван, център' },
  { id: 'К2', t: 'switch', x: 401, y: 897, h: 85, n: [0, -1], w: 15, room: 'Спалня',
    bg: 'Двоен ключ, ляво: нощна лампа + основна лампа' },
  { id: 'Т2', t: 'socket', x: 425, y: 897, h: 68, n: [0, -1], w: 15, room: 'Спалня',
    bg: 'Двоен контакт с USB, ляво нощно шкафче' },
  { id: 'Л2', t: 'light', x: 413, y: 897, h: 150, n: [0, -1], plate: false, room: 'Спалня',
    bg: 'Аплик – нощна лампа, ляво' },
  { id: 'К3', t: 'switch', x: 657, y: 897, h: 85, n: [0, -1], w: 15, room: 'Спалня',
    bg: 'Двоен ключ, дясно: нощна лампа + основна лампа' },
  { id: 'Т3', t: 'socket', x: 633, y: 897, h: 68, n: [0, -1], w: 15, room: 'Спалня',
    bg: 'Двоен контакт с USB, дясно нощно шкафче' },
  { id: 'Л3', t: 'light', x: 643, y: 897, h: 150, n: [0, -1], plate: false, room: 'Спалня',
    bg: 'Аплик – нощна лампа, дясно' },
  { id: 'Т4', t: 'socket', x: 528, y: 605, h: 115, n: [0, 1], w: 15, room: 'Спалня',
    bg: 'Двоен контакт + TV/интернет над скрина', note: 'ако по-късно решите телевизор на стената' },
  { id: 'Т5', t: 'socket', x: 343, y: 880, h: 30, n: [1, 0], w: 15, room: 'Спалня',
    bg: 'Двоен контакт до прозореца (лампион, уреди)' },
  { id: 'Д1', t: 'sensor', x: 772, y: 813, ceil: true, room: 'Дрешник',
    bg: 'Датчик за движение – пали дрешника сам' },
  { id: 'Л4', t: 'light', x: 850, y: 813, ceil: true, room: 'Дрешник', bg: 'Лампа – таван дрешник' },
  { id: 'Л5', t: 'light', x: 860, y: 768, h: 203, n: [0, 1], plate: false, room: 'Дрешник',
    bg: 'LED лента над закачалките', note: 'на същия датчик Д1' },
  { id: 'Л6', t: 'light', x: 960, y: 813, h: 190, n: [-1, 0], plate: false, room: 'Дрешник',
    bg: 'Осветление над огледалото на тоалетката' },
  { id: 'Т6', t: 'socket', x: 963, y: 852, h: 95, n: [-1, 0], w: 8, room: 'Дрешник',
    bg: 'Контакт на тоалетката (сешоар, преса)' },
];

// ---------------------------------------------------------------- materials
const mat = (color, opts = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.7, ...opts });
const C = {
  oak: mat('#c9a77c', { roughness: 0.6 }),
  oakDark: mat('#a9875f', { roughness: 0.6 }),
  white: mat('#f1ede6', { roughness: 0.5 }),
  front: mat('#ece7de', { roughness: 0.45 }),
  black: mat('#232323', { roughness: 0.4, metalness: 0.4 }),
  fabric: mat('#b7ae9f', { roughness: 0.95 }),
  linen: mat('#f4f1ea', { roughness: 0.95 }),
  duvet: mat('#ebe6dc', { roughness: 0.95 }),
  sage: mat('#8e9c86', { roughness: 0.95 }),
  rug: mat('#d6cdbf', { roughness: 1 }),
  curtain: mat('#e8e2d6', { roughness: 1, side: THREE.DoubleSide }),
  mirror: mat('#c3d0d6', { roughness: 0.08, metalness: 0.15 }),
  lampShade: new THREE.MeshStandardMaterial({ color: '#f3e6cf', emissive: '#ffd9a0', emissiveIntensity: 0.9, roughness: 0.8 }),
  lightGlow: new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#fff4e0', emissiveIntensity: 1.2 }),
  plate: mat('#fbfbfa', { roughness: 0.4 }),
  box: mat('#d9cdb9', { roughness: 0.9 }),
};

function flutedGlass() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 4;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 64, 0);
  grad.addColorStop(0, '#9c958a');
  grad.addColorStop(0.45, '#f4f1ea');
  grad.addColorStop(0.8, '#d4cec3');
  grad.addColorStop(1, '#9c958a');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 4);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(22, 1);
  t.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshPhysicalMaterial({ map: t, color: '#efe9de', transparent: true, opacity: 0.62,
    roughness: 0.25, depthWrite: false, side: THREE.DoubleSide });
}

// ---------------------------------------------------------------- build
export function buildInterior({ box, M, group, colliders, addDoor, pickables, H }) {
  const b = (x1, y1, x2, y2, z0, z1, m, parent = group) => box(x1, y1, x2, y2, z0, z1, m, parent);
  const block = (r) => colliders.push(r.map(M));
  const rnd = (() => { let s = 7; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); })();

  const cylinder = (x, y, z0, z1, r, m, parent = group) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(M(r), M(r), M(z1 - z0), 28), m);
    mesh.position.set(M(x), M((z0 + z1) / 2), M(y));
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const rail = (x1, x2, y, z) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(M(1.2), M(1.2), M(x2 - x1), 12), C.black);
    mesh.rotation.z = Math.PI / 2;
    mesh.position.set(M((x1 + x2) / 2), M(z), M(y));
    group.add(mesh);
  };
  const palette = ['#2f3a4a', '#8c6d5a', '#d8cfc4', '#5b6b5a', '#9e3f3a', '#e8e2d6', '#3d3d3d', '#b48a6b', '#6d7f99', '#efe9df', '#c7b49b'];
  const garments = (x1, x2, y1, y2, top, minLen, maxLen) => {
    for (let x = x1 + 3; x < x2 - 4; x += 3.6 + rnd() * 2.5) {
      const len = minLen + rnd() * (maxLen - minLen);
      const m = mat(palette[(rnd() * palette.length) | 0], { roughness: 1 });
      const g = b(x, y1 + rnd() * 3, x + 2.4, y2 - rnd() * 3, top - len, top - 3, m);
      g.castShadow = false;
    }
  };

  // ======================= BEDROOM =======================
  // rug
  b(398, 655, 658, 860, 0, 1, C.rug).castShadow = false;

  // bed 160 x 200 with upholstered headboard on the south wall
  b(438, 892, 618, 897, 0, 120, C.fabric);               // headboard
  b(446, 697, 610, 892, 6, 33, C.fabric);                // base
  b(448, 699, 608, 890, 33, 55, C.linen);                // mattress
  b(444, 697, 612, 842, 38, 60, C.duvet);                // duvet
  b(443, 700, 613, 745, 60, 62, C.sage);                 // throw
  b(456, 846, 524, 886, 55, 72, C.linen);                // pillows
  b(532, 846, 600, 886, 55, 72, C.linen);
  b(466, 838, 590, 852, 58, 74, C.sage);                 // cushion
  block([438, 697, 618, 897]);

  // floating nightstands (45 x 37) with a drawer, wall sconces above
  for (const [x1, x2] of [[391, 436], [620, 665]]) {
    b(x1, 855, x2, 892, 25, 55, C.oak);
    b(x1 + 2, 854, x2 - 2, 855, 29, 51, C.front);
    b((x1 + x2) / 2 - 6, 853, (x1 + x2) / 2 + 6, 854, 46, 47.5, C.black);
    block([x1, 855, x2, 892]);
    const cx = (x1 + x2) / 2;
    b(cx - 1, 885, cx + 1, 897, 149, 151, C.black);                 // arm
    cylinder(cx, 885, 140, 156, 9, C.lampShade).castShadow = false;  // shade
    // something on top
    b(cx - 10, 862, cx + 8, 882, 55, 58, mat('#7a8a99'));          // book
  }

  // chest of drawers opposite the bed – floating, 160 x 25
  b(448, 605, 608, 630, 40, 90, C.oak);
  for (let i = 0; i < 3; i++) {
    const x1 = 450 + i * 52.3, x2 = x1 + 51.7;
    b(x1, 630, x2, 631, 42, 88, C.front);
    b((x1 + x2) / 2 - 8, 631, (x1 + x2) / 2 + 8, 632, 80, 81.5, C.black);
  }
  b(470, 610, 490, 625, 90, 118, mat('#d6c7b0'));   // vase
  b(560, 606, 600, 610, 105, 160, mat('#6f7d6b'));  // framed print
  block([448, 605, 608, 630]);

  // main ceiling light
  cylinder(546, 751, H - 3, H, 22, C.lightGlow).castShadow = false;

  // curtains on the west window (pulled to the sides)
  b(347, 636, 349, 894, 246, 248, C.black).castShadow = false;
  for (const [y1, y2] of [[640, 688], [842, 890]]) {
    for (let k = 0; k < 6; k++) {
      const y = y1 + k * ((y2 - y1) / 6);
      b(348 + (k % 2) * 3, y, 352 + (k % 2) * 3, y + (y2 - y1) / 6 + 1, 4, 244, C.curtain).castShadow = false;
    }
  }

  // ======================= WALK-IN CLOSET =======================
  // --- top run along the bathroom wall: hanging, 60 deep (y 710–770)
  const T = { y1: 710, y2: 770 };
  b(754, T.y1, 756, T.y2, 0, 260, C.white);           // end panel
  b(838, T.y1, 840, T.y2, 0, 260, C.white);           // divider
  b(754, T.y1, 963, T.y2, 258, 260, C.white);         // top
  b(756, T.y1, 963, T.y2, 0, 4, C.black).castShadow = false; // plinth
  // section 1: long hanging (dresses, coats) + shoe shelves below
  b(756, T.y1, 838, T.y2, 205, 207, C.oak);
  b(756, T.y1, 838, T.y2, 232, 234, C.oak);
  rail(756, 838, 740, 196);
  garments(756, 838, 718, 762, 194, 105, 145);
  b(756, T.y1, 838, T.y2 - 5, 12, 14, C.oak);
  b(756, T.y1, 838, T.y2 - 5, 32, 34, C.oak);
  for (let x = 760; x < 832; x += 13) {
    const m = mat(palette[(rnd() * palette.length) | 0]);
    b(x, 738, x + 10, 765, 14, 22, m).castShadow = false;
    b(x, 738, x + 10, 765, 34, 42, m).castShadow = false;
  }
  // section 2: double hanging (shirts / trousers)
  b(840, T.y1, 963, T.y2, 205, 207, C.oak);
  b(840, T.y1, 963, T.y2, 232, 234, C.oak);
  b(840, T.y1, 963, T.y2, 108, 110, C.oak);
  rail(840, 963, 740, 196);
  rail(840, 963, 740, 100);
  garments(840, 960, 718, 762, 194, 70, 82);
  garments(840, 960, 720, 760, 98, 55, 62);
  // storage boxes on the top shelf
  for (let x = 760; x < 950; x += 40) b(x, 716, x + 35, 764, 234, 256, C.box);
  block([754, T.y1, 963, T.y2]);

  // --- bottom run along the south wall: drawers + cabinets, 40 deep (y 857–897)
  const B = { y1: 859, y2: 897 };
  b(754, B.y1, 963, B.y2, 0, 95, C.white);            // lower carcass
  b(754, 857, 963, B.y2, 95, 98, C.oak);              // worktop
  b(754, B.y1 + 20, 963, B.y2, 98, 130, C.oak);       // niche back (open niche for jewellery / perfume)
  b(754, B.y1, 963, B.y2, 130, 260, C.white);         // upper carcass
  const cols = [[756, 824], [825, 893], [894, 961]];
  for (const [x1, x2] of cols) {
    for (let i = 0; i < 4; i++) {
      const z0 = 6 + i * 22.2;
      b(x1, 858, x2, 859, z0, z0 + 21.6, C.front);
      b((x1 + x2) / 2 - 10, 857, (x1 + x2) / 2 + 10, 858, z0 + 17, z0 + 18.5, C.black);
    }
    b(x1, 858, x2, 859, 131, 258, C.front);             // upper door
    b(x2 - 6, 857, x2 - 4.5, 858, 140, 170, C.black);   // handle
  }
  // jewellery trays / perfume in the niche
  b(770, 870, 810, 892, 98, 101, C.oakDark);
  cylinder(840, 880, 98, 112, 3, mat('#e3c9a8', { roughness: 0.2 }));
  cylinder(850, 884, 98, 108, 2.5, mat('#9fb3c2', { roughness: 0.2 }));
  block([754, 857, 963, 897]);

  // --- dressing table at the end of the closet (east wall), 87 x 40
  b(923, 770, 963, 857, 73, 76, C.oak);               // top
  b(925, 772, 963, 855, 58, 73, C.white);             // drawer box
  b(924, 773, 925, 854, 59, 72, C.front);             // drawer front
  b(923.5, 805, 924, 821, 68, 69.5, C.black);
  b(961, 778, 963, 848, 90, 186, C.mirror).castShadow = false;
  b(957, 783, 963, 843, 188, 192, C.lightGlow).castShadow = false;
  b(923, 770, 963, 857, 205, 207, C.oak);             // shelves above
  b(923, 770, 963, 857, 232, 234, C.oak);
  for (let y = 776; y < 850; y += 26) b(930, y, 958, y + 22, 207, 228, C.box);
  cylinder(893, 813, 0, 44, 17, C.sage);              // stool
  block([923, 770, 963, 857]);
  block([876, 796, 910, 830]);

  // closet ceiling light + sensor
  cylinder(850, 813, H - 3, H, 14, C.lightGlow).castShadow = false;
  cylinder(772, 813, H - 2, H, 4, C.plate).castShadow = false;
  // LED strip under the hat shelf
  b(756, 765, 961, 767, 203.5, 205, C.lightGlow).castShadow = false;

  // --- sliding fluted-glass doors: 3 telescopic panels on a ceiling track
  const glass = flutedGlass();
  b(737, 707, 753, 900, H - 4, H, C.black).castShadow = false;   // top track
  b(737, 707, 753, 900, 0, 0.6, C.black).castShadow = false;     // floor guide
  const door = { kind: 'slider', frac: 0, target: 0, rect: [738, 776, 752, 897].map(M),
    center: new THREE.Vector2(M(745), M(803)), panels: [] };
  block([737, 708, 753, 776]); // where the panels stack when open
  const panelW = 65, step = 61;
  for (let i = 0; i < 3; i++) {
    const g = new THREE.Group();
    const x1 = 739.5 + i * 4.5, x2 = x1 + 3;
    const y1 = 710 + i * step, y2 = y1 + panelW;
    const parts = [
      b(x1, y1, x2, y1 + 2.5, 1, 260, C.black, g), b(x1, y2 - 2.5, x2, y2, 1, 260, C.black, g),
      b(x1, y1, x2, y2, 1, 3.5, C.black, g), b(x1, y1, x2, y2, 257.5, 260, C.black, g),
      b(x1, y2 - 9, x2 + 0.5, y2 - 7.5, 95, 135, C.black, g), // slim pull
      b(x1 + 1, y1 + 2.5, x2 - 1, y2 - 2.5, 3.5, 257.5, glass, g),
    ];
    parts[5].castShadow = false;
    for (const p of parts) { p.userData.door = door; pickables.push(p); }
    group.add(g);
    door.panels.push({ g, dz: M(710 - y1) });
  }
  door.apply = () => { for (const p of door.panels) p.g.position.z = p.dz * door.frac; };
  door.apply();
  addDoor(door);

  // ======================= ELECTRICAL PLATES =======================
  for (const p of ELECTRIC) {
    if (p.ceil || p.plate === false) continue;
    const w = p.w || 8, [nx, ny] = p.n;
    let r;
    if (ny) r = [p.x - w / 2, ny > 0 ? p.y : p.y - 1, p.x + w / 2, ny > 0 ? p.y + 1 : p.y];
    else r = [nx > 0 ? p.x : p.x - 1, p.y - w / 2, nx > 0 ? p.x + 1 : p.x, p.y + w / 2];
    const m = b(...r, p.h - 4, p.h + 4, C.plate);
    m.castShadow = false;
  }
}
