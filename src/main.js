import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { H, INFO, ROOMS, WALLS, RAILINGS, LANDING, LANDING_LIMITS } from './plan.js';
import { woodTexture, tileTexture } from './textures.js';
import { Minimap } from './minimap.js';
import { buildInterior, ELECTRIC, FURNITURE } from './interior.js';

const M = (v) => v / 100; // cm -> m
const EYE = 1.6;
const RADIUS = 0.2;
const CENTER = new THREE.Vector3(4.8, 0, 3.9);
const isTouch = window.matchMedia('(pointer: coarse)').matches;

// ---------------------------------------------------------------- renderer
const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;
app.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.className = 'labels';
app.appendChild(labelRenderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color('#dfe8f0');

// ---------------------------------------------------------------- lights
const hemi = new THREE.HemisphereLight(0xffffff, 0xe6ddd0, 1.5);
scene.add(hemi);
scene.add(new THREE.AmbientLight(0xffffff, 0.55));
const sun = new THREE.DirectionalLight(0xfff1dc, 2.2);
sun.position.set(CENTER.x - 6, 11, CENTER.z - 8);
sun.target.position.copy(CENTER);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 1, far: 40 });
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.02;
scene.add(sun, sun.target);

// ---------------------------------------------------------------- materials
const floorMats = {
  wood: new THREE.MeshStandardMaterial({ map: woodTexture(), roughness: 0.75 }),
  tile: new THREE.MeshStandardMaterial({ map: tileTexture({ cols: 4, rows: 4, metres: 2.4, base: [214, 209, 200] }), roughness: 0.55 }),
  bath: new THREE.MeshStandardMaterial({ map: tileTexture({ cols: 4, rows: 8, metres: 1.2, base: [228, 228, 226], grout: '#b5b5b2', seed: 5 }), roughness: 0.4 }),
  outdoor: new THREE.MeshStandardMaterial({ map: tileTexture({ cols: 6, rows: 6, metres: 1.8, base: [170, 166, 160], grout: '#8d8983', vary: 14, seed: 9, speckle: 40 }), roughness: 0.95 }),
  landing: new THREE.MeshStandardMaterial({ map: tileTexture({ cols: 3, rows: 3, metres: 1.5, base: [190, 186, 178], grout: '#9a958c', seed: 13, speckle: 60 }), roughness: 0.8 }),
  stone: new THREE.MeshStandardMaterial({ color: '#cfc9bf', roughness: 0.6 }),
};
const wallMat = new THREE.MeshStandardMaterial({ color: '#f4f1eb', roughness: 0.95, side: THREE.DoubleSide });
const capMat = new THREE.MeshStandardMaterial({ color: '#2f343b', roughness: 1, side: THREE.DoubleSide });
const wallMats = [wallMat, wallMat, capMat, wallMat, wallMat, wallMat];
const windowCapMat = new THREE.MeshBasicMaterial({ color: '#8cc4e6' });
const ceilMat = new THREE.MeshStandardMaterial({ color: '#fbfaf7', roughness: 1 });
const baseMat = new THREE.MeshStandardMaterial({ color: '#e7e2d9', roughness: 1 });
const slabMat = new THREE.MeshStandardMaterial({ color: '#c9c5bf', roughness: 1 });
const frameMat = new THREE.MeshStandardMaterial({ color: '#fafafa', roughness: 0.5 });
const glassMat = new THREE.MeshPhysicalMaterial({ color: '#cfe6f2', transparent: true, opacity: 0.25, roughness: 0.05, depthWrite: false });
const doorMats = {
  interior: new THREE.MeshStandardMaterial({ color: '#f6f3ee', roughness: 0.6 }),
  entrance: new THREE.MeshStandardMaterial({ color: '#5a4a3c', roughness: 0.5 }),
};
const handleMat = new THREE.MeshStandardMaterial({ color: '#9aa0a6', metalness: 0.8, roughness: 0.3 });
const railMat = new THREE.MeshStandardMaterial({ color: '#3d4248', metalness: 0.6, roughness: 0.4 });

// ---------------------------------------------------------------- geometry helpers
const world = new THREE.Group();
const ceilings = new THREE.Group();
const labels = new THREE.Group();
// dark 'section cut' caps shown when walls are cut (plan / cut-away views)
const caps = new THREE.Group();
scene.add(world, ceilings, labels, caps);

// Axis-aligned box from plan rect (cm) and height range (cm)
function box(x1, y1, x2, y2, z0, z1, mat, parent = world) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(M(x2 - x1), M(z1 - z0), M(y2 - y1)), mat);
  m.position.set(M((x1 + x2) / 2), M((z0 + z1) / 2), M((y1 + y2) / 2));
  m.castShadow = m.receiveShadow = true;
  parent.add(m);
  return m;
}

// Horizontal quad with world-space UVs; down=true faces downwards (ceilings)
function quad([x1, y1, x2, y2], level, mat, down = false) {
  const X1 = M(x1), X2 = M(x2), Z1 = M(y1), Z2 = M(y2), Y = M(level);
  const s = mat.map?.userData.size || 1;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute([X1, Y, Z1, X1, Y, Z2, X2, Y, Z2, X2, Y, Z1], 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute([X1 / s, -Z1 / s, X1 / s, -Z2 / s, X2 / s, -Z2 / s, X2 / s, -Z1 / s], 2));
  g.setIndex(down ? [0, 2, 1, 0, 3, 2] : [0, 1, 2, 0, 2, 3]);
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, mat);
  m.receiveShadow = true;
  return m;
}

// ---------------------------------------------------------------- collision data (metres)
const colliders = [];     // static [x1,z1,x2,z2]
const walkable = [];      // regions the player may stand in
const toM = (r) => r.map(M);
const map = { rooms: ROOMS, walls: [], doors: [], windows: [], landing: LANDING.rect };
const doors = [];
const pickables = [];

// ---------------------------------------------------------------- walls, doors, windows
for (const w of WALLS) {
  const [x1, y1, x2, y2] = w.r;
  const axis = x2 - x1 >= y2 - y1 ? 'x' : 'y';
  const [a0, a1] = axis === 'x' ? [x1, x2] : [y1, y2];
  const [p0, p1] = axis === 'x' ? [y1, y2] : [x1, x2];
  const rect = (s, e, q0 = p0, q1 = p1) => (axis === 'x' ? [s, q0, e, q1] : [q0, s, q1, e]);
  const piece = (s, e, z0, z1, solid) => {
    if (e - s < 0.5 || z1 - z0 < 0.5) return;
    box(...rect(s, e), z0, z1, wallMats);
    if (solid) colliders.push(toM(rect(s, e)));
    if (z0 <= 125 && z1 >= 150) caps.add(quad(rect(s, e), 0, capMat));
  };

  map.walls.push(w.r);
  let cur = a0;
  for (const op of (w.openings || []).slice().sort((a, b) => a.from - b.from)) {
    piece(cur, op.from, 0, H, true);
    piece(op.from, op.to, op.head, H, false);
    if (op.type === 'window') {
      piece(op.from, op.to, 0, op.sill, true);
      buildWindow(axis, op, p0, p1, rect);
      const wr = rect(op.from, op.to, p0 + (p1 - p0) * 0.35, p0 + (p1 - p0) * 0.65);
      map.windows.push(wr);
      caps.add(quad(rect(op.from, op.to), 0, capMat));
      const glassCap = quad(wr, 0.1, windowCapMat);
      caps.add(glassCap);
    } else {
      buildDoor(axis, op, p0, p1, rect);
      map.doors.push(rect(op.from, op.to));
      walkable.push(toM(rect(op.from, op.to)));
    }
    cur = op.to;
  }
  piece(cur, a1, 0, H, true);
}

function buildWindow(axis, op, p0, p1, rect) {
  const t = 7, f = 6;
  const pm = (p0 + p1) / 2, q0 = pm - t / 2, q1 = pm + t / 2;
  const fb = (s, e, z0, z1, mat = frameMat) => box(...rect(s, e, q0, q1), z0, z1, mat);
  fb(op.from, op.from + f, op.sill, op.head);
  fb(op.to - f, op.to, op.sill, op.head);
  fb(op.from + f, op.to - f, op.sill, op.sill + f);
  fb(op.from + f, op.to - f, op.head - f, op.head);
  if (op.to - op.from > 100) {
    const mid = (op.from + op.to) / 2;
    fb(mid - f / 2, mid + f / 2, op.sill, op.head);
  }
  const g = box(...rect(op.from + f, op.to - f, pm - 0.5, pm + 0.5), op.sill + f, op.head - f, glassMat);
  g.castShadow = false;
  // inner window board
  box(...rect(op.from - 2, op.to + 2, p0 - 1, p1 + 1), op.sill - 2, op.sill, frameMat).castShadow = false;
}

function buildDoor(axis, op, p0, p1, rect) {
  const jamb = 4;
  const jm = op.kind === 'glass' ? frameMat : op.kind === 'entrance' ? doorMats.entrance : frameMat;
  box(...rect(op.from, op.from + jamb), 0, op.head, jm);
  box(...rect(op.to - jamb, op.to), 0, op.head, jm);
  box(...rect(op.from + jamb, op.to - jamb), op.head - jamb, op.head, jm);
  world.add(quad(rect(op.from, op.to), 0.2, floorMats.stone));

  const leaves = op.leaves || 1;
  const lw = (op.to - op.from - 2 * jamb) / leaves - 0.5;
  const lh = op.head - jamb - 1;
  const face = op.swing > 0 ? p1 : p0;
  const perp = face - op.swing * 3;
  const hinges = leaves === 2 ? ['from', 'to'] : [op.hinge || 'from'];

  const door = { kind: op.kind, pivots: [], frac: op.open === false ? 0 : 1, target: op.open === false ? 0 : 1,
    rect: toM(rect(op.from, op.to)), center: null };
  const [cx1, cz1, cx2, cz2] = door.rect;
  door.center = new THREE.Vector2((cx1 + cx2) / 2, (cz1 + cz2) / 2);

  for (const h of hinges) {
    const along = h === 'from' ? op.from + jamb : op.to - jamb;
    const dirAlong = h === 'from' ? 1 : -1;
    const pivot = new THREE.Group();
    if (axis === 'x') pivot.position.set(M(along), 0, M(perp));
    else pivot.position.set(M(perp), 0, M(along));
    const closed = axis === 'x' ? [dirAlong, 0] : [0, dirAlong];
    const opened = axis === 'x' ? [0, op.swing] : [op.swing, 0];
    const t0 = Math.atan2(-closed[1], closed[0]);
    const t1 = Math.atan2(-opened[1], opened[0]);
    let d = t1 - t0;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    pivot.add(makeLeaf(op.kind, lw, lh, door));
    world.add(pivot);
    door.pivots.push({ pivot, t0, d: d * 0.94 });
  }
  setDoorAngle(door);
  doors.push(door);
}

function makeLeaf(kind, w, h, door) {
  const g = new THREE.Group();
  const W = M(w), Hh = M(h), T = 0.04;
  const add = (geo, mat, x, y, z = 0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = mat !== glassMat;
    m.userData.door = door;
    pickables.push(m);
    g.add(m);
    return m;
  };
  if (kind === 'glass') {
    const f = 0.07;
    add(new THREE.BoxGeometry(f, Hh, T + 0.02), frameMat, f / 2, Hh / 2);
    add(new THREE.BoxGeometry(f, Hh, T + 0.02), frameMat, W - f / 2, Hh / 2);
    add(new THREE.BoxGeometry(W - 2 * f, f, T + 0.02), frameMat, W / 2, f / 2);
    add(new THREE.BoxGeometry(W - 2 * f, f, T + 0.02), frameMat, W / 2, Hh - f / 2);
    add(new THREE.BoxGeometry(W - 2 * f, Hh - 2 * f, 0.01), glassMat, W / 2, Hh / 2);
  } else {
    add(new THREE.BoxGeometry(W, Hh, T), doorMats[kind] || doorMats.interior, W / 2, Hh / 2);
  }
  for (const side of [-1, 1]) add(new THREE.BoxGeometry(0.12, 0.02, 0.02), handleMat, W - 0.1, 1.0, side * (T / 2 + 0.03));
  return g;
}

function setDoorAngle(door) {
  if (door.apply) return door.apply();
  for (const p of door.pivots) p.pivot.rotation.y = p.t0 + p.d * door.frac;
}

// ---------------------------------------------------------------- floors, ceilings, labels, base
const labelEls = [];
for (const room of ROOMS) {
  for (const r of room.rects) {
    if (room.outdoor) {
      world.add(quad(r, -3, floorMats.outdoor));
      box(r[0], r[1], r[2], r[3], -20, -3.2, slabMat);
    } else {
      world.add(quad(r, 0, floorMats[room.floor]));
      const c = quad(r, H, ceilMat, true);
      c.castShadow = true;
      ceilings.add(c);
      box(r[0], r[1], r[2], r[3], -305, -2, baseMat).castShadow = false;
    }
    walkable.push(toM(r));
  }
  const [lx, ly] = room.label || [(room.rects[0][0] + room.rects[0][2]) / 2, (room.rects[0][1] + room.rects[0][3]) / 2];
  room.labelPos = [M(lx), M(ly)];
  const div = document.createElement('div');
  div.className = 'room-label' + (room.outdoor ? ' outdoor' : '');
  div.innerHTML = `<b>${room.en}</b><span>${room.bg}</span><em>${room.area.toFixed(2)} m²</em>${room.dims ? `<i>${room.dims}</i>` : ''}`;
  const obj = new CSS2DObject(div);
  obj.position.set(M(lx), 0.1, M(ly));
  labels.add(obj);
  labelEls.push(div);
}
for (const w of WALLS) box(...w.r, -305, 0, baseMat).castShadow = false;

// corridor patch outside the front door
world.add(quad(LANDING.rect, 0, floorMats.landing));
box(...LANDING.rect, -20, -2, slabMat);
walkable.push(toM(LANDING.rect));
for (const r of LANDING_LIMITS) colliders.push(toM(r));

// railings
for (const r of RAILINGS) {
  box(r[0], r[1], r[2], r[3], -3, 95, glassMat).castShadow = false;
  const horiz = r[2] - r[0] > r[3] - r[1];
  const rr = horiz ? [r[0], r[1] - 1, r[2], r[3] + 1] : [r[0] - 1, r[1], r[2] + 1, r[3]];
  box(...rr, 95, 100, railMat);
  colliders.push(toM(r));
}

// ground
const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), new THREE.MeshStandardMaterial({ color: '#b7c2a6', roughness: 1 }));
ground.rotation.x = -Math.PI / 2;
ground.position.set(CENTER.x, -3.05, CENTER.z);
ground.receiveShadow = true;
scene.add(ground);

// ---------------------------------------------------------------- interior (furniture, electrics)
const furniture = new THREE.Group();
scene.add(furniture);
buildInterior({ box, M, group: furniture, colliders, pickables, H, addDoor: (d) => doors.push(d) });
const roomLights = [[546, 751, 1.4], [850, 813, 0.9], [705, 470, 0.8], [500, 450, 1.2]].map(([x, y, i]) => {
  const l = new THREE.PointLight(0xffe7c4, i, 4.5, 1.6);
  l.position.set(M(x), M(H - 25), M(y));
  furniture.add(l);
  return l;
});

let elecOn = true;
// CSS2DRenderer only checks each label's own .visible, so toggle the children too
function showGroup(g, v) {
  g.visible = v;
  g.children.forEach((c) => { c.visible = v; });
}
const elecLabels = new THREE.Group();
scene.add(elecLabels);
for (const p of ELECTRIC) {
  const div = document.createElement('div');
  div.className = `elec elec-${p.t}`;
  div.textContent = p.id;
  div.title = p.bg;
  const obj = new CSS2DObject(div);
  obj.userData.room = p.room;
  const [nx, ny] = p.n || [0, 0];
  obj.position.set(M(p.x + nx * 6), M(p.ceil ? H - 8 : p.h), M(p.y + ny * 6));
  elecLabels.add(obj);
}

// ---------------------------------------------------------------- cameras & controls
const persp = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.05, 400);
persp.position.set(CENTER.x - 3, 12, CENTER.z + 10);
const orbit = new OrbitControls(persp, renderer.domElement);
orbit.target.copy(CENTER);
orbit.enableDamping = true;
orbit.maxPolarAngle = Math.PI * 0.49;
orbit.minDistance = 2;
orbit.maxDistance = 40;

const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
ortho.up.set(0, 0, -1);
ortho.position.set(CENTER.x, 30, CENTER.z);
ortho.lookAt(CENTER.x, 0, CENTER.z);
const planCtl = new OrbitControls(ortho, renderer.domElement);
planCtl.target.copy(CENTER);
planCtl.enableRotate = false;
planCtl.screenSpacePanning = true;
planCtl.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
planCtl.touches = { ONE: THREE.TOUCH.PAN, TWO: THREE.TOUCH.DOLLY_PAN };
planCtl.minZoom = 0.5;
planCtl.maxZoom = 6;
planCtl.enabled = false;

function fitOrtho() {
  const a = window.innerWidth / window.innerHeight;
  const w = 11.6, h = 11.6;
  let hw, hh;
  if (a > w / h) { hh = h / 2; hw = hh * a; } else { hw = w / 2; hh = hw / a; }
  Object.assign(ortho, { left: -hw, right: hw, top: hh, bottom: -hh });
  ortho.updateProjectionMatrix();
}
fitOrtho();

// ---------------------------------------------------------------- walk state
const player = { x: 7.15, z: 3.45, yaw: Math.PI / 2, pitch: -0.05 };
const keys = {};
const joy = { x: 0, y: 0, id: null };
const savedOrbit = { pos: persp.position.clone(), target: orbit.target.clone() };

function circleHits(x, z, r) {
  const hit = (b) => {
    const cx = Math.max(b[0], Math.min(x, b[2])), cz = Math.max(b[1], Math.min(z, b[3]));
    return (x - cx) ** 2 + (z - cz) ** 2 < r * r;
  };
  const out = new Set();
  for (const b of colliders) if (hit(b)) out.add(b);
  for (const d of doors) if (d.rect && d.frac < 0.6 && hit(d.rect)) out.add(d.rect);
  return out;
}
const inWalkable = (x, z) => walkable.some((b) => x >= b[0] && x <= b[2] && z >= b[1] && z <= b[3]);

function tryMove(dx, dz) {
  const nx = player.x + dx, nz = player.z + dz;
  if (!inWalkable(nx, nz)) return;
  const before = circleHits(player.x, player.z, RADIUS);
  for (const b of circleHits(nx, nz, RADIUS)) if (!before.has(b)) return;
  player.x = nx;
  player.z = nz;
}

function roomAt(x, z) {
  const X = x * 100, Y = z * 100;
  for (const room of ROOMS) for (const r of room.rects) if (X >= r[0] && X <= r[2] && Y >= r[1] && Y <= r[3]) return room;
  const l = LANDING.rect;
  if (X >= l[0] && X <= l[2] && Y >= l[1] && Y <= l[3]) return { id: 'landing', en: LANDING.en, bg: 'Общ коридор' };
  return null;
}

function toggleDoor(door) {
  if (!door) return;
  if (door.target > 0.5) {
    // don't close a door on top of the player
    const [a, b, c, d] = door.rect || [0, 0, 0, 0];
    if (door.rect && mode === 'walk' && player.x > a - 0.3 && player.x < c + 0.3 && player.z > b - 0.3 && player.z < d + 0.3) {
      flash('Step out of the doorway first');
      return;
    }
    door.target = 0;
  } else door.target = 1;
}

function nearestDoor() {
  let best = null, bd = 1.7;
  for (const d of doors) {
    if (d.furniture) continue;
    const dist = Math.hypot(d.center.x - player.x, d.center.y - player.z);
    if (dist < bd) { bd = dist; best = d; }
  }
  return best;
}

// ---------------------------------------------------------------- UI
const $ = (s) => document.querySelector(s);
const hud = $('#hud');
const minimapEl = $('#minimap');
const minimap = new Minimap(minimapEl, map);
let mode = 'orbit';
let cutaway = true;
const cutPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1.45);
const planPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1.3);

function flash(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(flash.t);
  flash.t = setTimeout(() => el.classList.remove('show'), 1800);
}

function setMode(m) {
  if (mode === 'walk' && m !== 'walk' && document.pointerLockElement) document.exitPointerLock();
  if (mode === 'orbit') { savedOrbit.pos.copy(persp.position); savedOrbit.target.copy(orbit.target); }
  mode = m;
  document.body.dataset.mode = m;
  document.querySelectorAll('#modes button').forEach((b) => b.classList.toggle('active', b.dataset.mode === m));
  orbit.enabled = m === 'orbit';
  planCtl.enabled = m === 'plan';
  ceilings.visible = m === 'walk';
  showGroup(labels, m !== 'walk');
  roomLights.forEach((l) => { l.visible = m === 'walk'; });
  hemi.intensity = m === 'walk' ? 2.4 : 1.5;
  sun.castShadow = m !== 'plan';
  if (m === 'walk') $('#panel').removeAttribute('open');
  if (m === 'orbit') {
    persp.position.copy(savedOrbit.pos);
    orbit.target.copy(savedOrbit.target);
    persp.fov = 50;
  } else if (m === 'walk') {
    persp.fov = 72;
    minimap.resize();
  }
  persp.updateProjectionMatrix();
  applyClipping();
}

function applyClipping() {
  renderer.clippingPlanes = mode === 'plan' ? [planPlane] : mode === 'orbit' && cutaway ? [cutPlane] : [];
  caps.visible = renderer.clippingPlanes.length > 0;
  caps.position.y = (mode === 'plan' ? planPlane.constant : cutPlane.constant) - 0.004;
}

document.querySelectorAll('#modes button').forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));

$('#cutaway').addEventListener('change', (e) => { cutaway = e.target.checked; applyClipping(); });
$('#show-labels').addEventListener('change', (e) => { document.body.classList.toggle('hide-room-labels', !e.target.checked); });
$('#open-all').addEventListener('click', () => {
  const parts = doors.filter((d) => d.furniture || d.kind === 'slider');
  const open = parts.some((d) => d.target < 0.5);
  parts.forEach((d) => { d.target = open ? 1 : 0; });
  $('#open-all').textContent = open ? 'Затвори всички мебели' : 'Отвори всички мебели';
});
$('#show-furniture').addEventListener('change', (e) => { furniture.visible = e.target.checked; });
$('#show-elec').addEventListener('change', (e) => {
  elecOn = e.target.checked;
  showGroup(elecLabels, elecOn);
  document.body.classList.toggle('show-elec', e.target.checked);
});
document.body.classList.add('show-elec');
{
  const typeName = { switch: 'Ключ', socket: 'Контакт', light: 'Осветление', sensor: 'Датчик', intercom: 'Домофон' };
  let lastRoom = '';
  const order = ['Спалня', 'Дрешник', 'Антре', 'Дневна'];
  const rows = [...ELECTRIC].sort((x, y) => order.indexOf(x.room) - order.indexOf(y.room)).map((p) => `${p.room !== lastRoom ? `<li class="elec-room">${(lastRoom = p.room)}</li>` : ''}<li><span class="elec elec-${p.t}">${p.id}</span><div>${p.bg}`
    + `<small>${typeName[p.t]}${p.ceil ? ' · таван' : p.floor ? ' · в пода' : ` · h ${p.h} см`}${p.note ? ` · ${p.note}` : ''}</small></div></li>`);
  $('#elec-list').innerHTML = rows.join('');
  $('#furn-list').innerHTML = FURNITURE.map((f) => `<li><div><b>${f.name}</b><small>${f.size}</small><small>${f.mech}</small></div></li>`).join('');
}

// facts + room list
$('#facts').innerHTML = `<div>${INFO.floor}</div><div>Built-up area <b>${INFO.builtArea.toFixed(2)} m²</b></div><div>Incl. common parts <b>${INFO.totalArea.toFixed(2)} m²</b></div>`;
const list = $('#rooms');
for (const room of ROOMS) {
  const li = document.createElement('li');
  li.innerHTML = `<span>${room.en}<small>${room.bg}</small></span><b>${room.area.toFixed(2)} m²</b>`;
  li.addEventListener('click', () => goToRoom(room));
  list.appendChild(li);
}

function goToRoom(room) {
  const [x, z] = room.labelPos;
  if (mode === 'walk') {
    player.x = x;
    player.z = z;
  } else if (mode === 'orbit') {
    const off = persp.position.clone().sub(orbit.target);
    off.setLength(Math.min(off.length(), 9));
    orbit.target.set(x, 0, z);
    persp.position.copy(orbit.target).add(off);
  } else {
    planCtl.target.set(x, 0, z);
    ortho.position.set(x, 30, z);
    ortho.zoom = 2.2;
    ortho.updateProjectionMatrix();
  }
  if (window.innerWidth < 760) $('#panel').removeAttribute('open');
}

// keyboard
window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return;
  keys[e.code] = true;
  if (mode === 'walk' && e.code === 'KeyE') toggleDoor(nearestDoor());
  if (e.code === 'Digit1') setMode('orbit');
  if (e.code === 'Digit2') setMode('plan');
  if (e.code === 'Digit3') setMode('walk');
  if (mode === 'walk' && e.code.startsWith('Arrow')) e.preventDefault();
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });
window.addEventListener('blur', () => { for (const k in keys) keys[k] = false; });

// mouse look + clicks
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
let down = null;
renderer.domElement.addEventListener('pointerdown', (e) => {
  down = { x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, id: e.pointerId, type: e.pointerType };
});
window.addEventListener('pointermove', (e) => {
  if (mode !== 'walk') return;
  if (document.pointerLockElement === renderer.domElement) {
    look(e.movementX, e.movementY, 0.0022);
  } else if (down && down.id === e.pointerId && e.pointerId !== joy.id) {
    look(e.clientX - down.lx, e.clientY - down.ly, e.pointerType === 'touch' ? 0.006 : 0.004);
    down.lx = e.clientX;
    down.ly = e.clientY;
  }
});
window.addEventListener('pointerup', (e) => {
  if (!down || down.id !== e.pointerId) return;
  const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
  down = null;
  if (moved > 6 || e.target !== renderer.domElement) return;
  if (mode === 'walk') {
    if (document.pointerLockElement === renderer.domElement) clickDoor(0, 0, 2.5);
    else if (!isTouch && renderer.domElement.requestPointerLock) {
      renderer.domElement.requestPointerLock();
    } else clickDoor((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1, 2.5);
  } else {
    clickDoor((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1, Infinity);
  }
});

function look(dx, dy, s) {
  player.yaw -= dx * s;
  player.pitch = Math.max(-1.35, Math.min(1.35, player.pitch - dy * s));
}

function clickDoor(x, y, maxDist) {
  ndc.set(x, y);
  raycaster.setFromCamera(ndc, mode === 'plan' ? ortho : persp);
  const hit = raycaster.intersectObjects(pickables, false)[0];
  if (hit && hit.distance <= maxDist) toggleDoor(hit.object.userData.door);
}

document.addEventListener('pointerlockchange', () => {
  document.body.classList.toggle('locked', document.pointerLockElement === renderer.domElement);
});

// touch joystick
const joyEl = $('#joystick');
const knob = joyEl.querySelector('.knob');
joyEl.addEventListener('pointerdown', (e) => {
  joy.id = e.pointerId;
  joyEl.setPointerCapture(e.pointerId);
  moveJoy(e);
});
joyEl.addEventListener('pointermove', (e) => { if (e.pointerId === joy.id) moveJoy(e); });
const endJoy = (e) => {
  if (e.pointerId !== joy.id) return;
  joy.id = null;
  joy.x = joy.y = 0;
  knob.style.transform = '';
};
joyEl.addEventListener('pointerup', endJoy);
joyEl.addEventListener('pointercancel', endJoy);
function moveJoy(e) {
  const r = joyEl.getBoundingClientRect();
  let dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
  const max = r.width / 2 - 18, len = Math.hypot(dx, dy);
  if (len > max) { dx *= max / len; dy *= max / len; }
  knob.style.transform = `translate(${dx}px, ${dy}px)`;
  joy.x = dx / max;
  joy.y = -dy / max;
}
$('#door-btn').addEventListener('click', () => {
  const d = nearestDoor();
  if (d) toggleDoor(d);
  else flash('No door nearby');
});

// minimap teleport
minimapEl.addEventListener('click', (e) => {
  const r = minimapEl.getBoundingClientRect();
  const [x, y] = minimap.toPlan(e.clientX - r.left, e.clientY - r.top);
  const X = x / 100, Z = y / 100;
  if (inWalkable(X, Z) && circleHits(X, Z, RADIUS).size === 0) { player.x = X; player.z = Z; }
});

// ---------------------------------------------------------------- loop
window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  labelRenderer.setSize(w, h);
  persp.aspect = w / h;
  persp.updateProjectionMatrix();
  fitOrtho();
  minimap.resize();
});

const clock = new THREE.Clock();
let lastRoom = null;
function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);

  for (const d of doors) {
    if (d.frac !== d.target) {
      d.frac += Math.sign(d.target - d.frac) * dt * 1.8;
      if (Math.abs(d.target - d.frac) < dt * 1.8) d.frac = d.target;
      setDoorAngle(d);
    }
  }

  if (mode === 'walk') {
    let f = joy.y, s = joy.x;
    if (keys.KeyW || keys.ArrowUp) f += 1;
    if (keys.KeyS || keys.ArrowDown) f -= 1;
    if (keys.KeyD) s += 1;
    if (keys.KeyA) s -= 1;
    if (keys.ArrowLeft) player.yaw += 1.8 * dt;
    if (keys.ArrowRight) player.yaw -= 1.8 * dt;
    const len = Math.hypot(f, s);
    if (len > 1) { f /= len; s /= len; }
    const speed = (keys.ShiftLeft || keys.ShiftRight ? 2.6 : 1.4) * dt;
    const fx = -Math.sin(player.yaw), fz = -Math.cos(player.yaw);
    const rx = Math.cos(player.yaw), rz = -Math.sin(player.yaw);
    const dx = (fx * f + rx * s) * speed, dz = (fz * f + rz * s) * speed;
    if (dx) tryMove(dx, 0);
    if (dz) tryMove(0, dz);
    persp.position.set(player.x, EYE, player.z);
    persp.rotation.set(player.pitch, player.yaw, 0, 'YXZ');

    const room = roomAt(player.x, player.z);
    if (room !== lastRoom) {
      lastRoom = room;
      hud.innerHTML = room ? `<b>${room.en}</b> <span>${room.bg}</span>${room.area ? ` · ${room.area.toFixed(2)} m²` : ''}` : '';
    }
    {
      const here = { bed2: ['Спалня', 'Дрешник'], closet: ['Спалня', 'Дрешник'], hall: ['Антре'], living: ['Дневна'] }[room?.id] || [];
      elecLabels.visible = elecOn;
      elecLabels.children.forEach((c) => { c.visible = elecOn && here.includes(c.userData.room); });
    }
    minimap.draw(player, room?.id);
    renderer.render(scene, persp);
    labelRenderer.render(scene, persp);
  } else if (mode === 'orbit') {
    showGroup(elecLabels, elecOn);
    orbit.update();
    renderer.render(scene, persp);
    labelRenderer.render(scene, persp);
  } else {
    showGroup(elecLabels, elecOn);
    planCtl.update();
    renderer.render(scene, ortho);
    labelRenderer.render(scene, ortho);
  }
  requestAnimationFrame(frame);
}

setMode(new URLSearchParams(location.search).get('mode') || 'orbit');
document.body.classList.toggle('touch', isTouch);
if (window.innerWidth < 760) $('#panel').removeAttribute('open');
document.body.classList.add('ready');
frame();

// handy for debugging from the console
window.__apt = { player, setMode, doors, scene, persp, orbit };
