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
  { id: 'Т4', t: 'socket', x: 590, y: 605, h: 85, n: [0, 1], w: 15, room: 'Спалня',
    bg: 'Двоен контакт над бюфета – настолна лампа', note: 'точно над плота, скрит зад лампата' },
  { id: 'Т5', t: 'socket', x: 343, y: 880, h: 30, n: [1, 0], w: 15, room: 'Спалня',
    bg: 'Двоен контакт до прозореца (лампион, уреди)' },
  { id: 'Д1', t: 'sensor', x: 772, y: 813, ceil: true, room: 'Дрешник',
    bg: 'Датчик за движение – пали дрешника сам' },
  { id: 'Л4', t: 'light', x: 850, y: 813, ceil: true, room: 'Дрешник', bg: 'Лампа – таван дрешник' },
  { id: 'Л5', t: 'light', x: 860, y: 768, h: 203, n: [0, 1], plate: false, room: 'Дрешник',
    bg: 'LED лента над закачалките', note: 'на същия датчик Д1' },
  { id: 'Л6', t: 'light', x: 393, y: 605, h: 140, n: [0, 1], plate: false, room: 'Спалня',
    bg: 'Захранване за LED огледалото на тоалетката', note: 'огледало със сензорен бутон – без отделен ключ' },
  { id: 'Т6', t: 'socket', x: 343, y: 617, h: 95, n: [1, 0], w: 8, room: 'Спалня',
    bg: 'Контакт на тоалетката (сешоар, преса)' },
  { id: 'К4', t: 'switch', x: 343, y: 637, h: 95, n: [1, 0], w: 8, room: 'Спалня',
    bg: 'Ключ – лампите от двете страни на огледалото' },
  { id: 'Л7', t: 'light', x: 352, y: 605, h: 140, n: [0, 1], plate: false, room: 'Спалня',
    bg: 'Лампа до огледалото, ляво', note: 'неутрална светлина 4000K, CRI 90+ – вярни цветове за грим' },
  { id: 'Л8', t: 'light', x: 436, y: 605, h: 140, n: [0, 1], plate: false, room: 'Спалня',
    bg: 'Лампа до огледалото, дясно', note: 'на ключ К4' },
  { id: 'К5', t: 'switch', x: 765, y: 408, h: 110, n: [0, -1], w: 8, room: 'Антре',
    bg: 'Ключ – осветление антре, до входната врата', note: 'девиатор с К6' },
  { id: 'В1', t: 'intercom', x: 765, y: 408, h: 150, n: [0, -1], w: 12, room: 'Антре',
    bg: 'Видеодомофон до входната врата' },
  { id: 'К6', t: 'switch', x: 750, y: 565, h: 110, n: [-1, 0], w: 8, room: 'Антре',
    bg: 'Ключ – осветление антре, при спалнята', note: 'светва/гаси от двата края' },
  { id: 'Л9', t: 'light', x: 708, y: 470, ceil: true, room: 'Антре', bg: 'Луни (спотове) на тавана в антрето' },
  { id: 'Д2', t: 'sensor', x: 750, y: 470, h: 30, n: [-1, 0], room: 'Антре',
    bg: 'Нощна LED светлина ниско, със сензор за движение', note: 'пътят спалня → баня нощем' },
  { id: 'Л10', t: 'light', x: 665, y: 432, h: 186, n: [1, 0], plate: false, room: 'Антре',
    bg: 'LED лента в нишата за палта' },
  { id: 'Т9', t: 'socket', x: 625, y: 555, h: 120, n: [1, 0], w: 8, room: 'Антре',
    bg: 'Контакт в шкафа – зарядна стойка за прахосмукачка' },
  { id: 'Л12', t: 'light', x: 607, y: 480, h: 126, n: [-1, 0], plate: false, room: 'Дневна',
    bg: 'LED ленти под рафта над дивана', note: 'отделно от Л11, с димер – уютна светлина вечер' },
  { id: 'Т7', t: 'socket', x: 500, y: 580, h: 30, n: [0, -1], w: 15, room: 'Дневна',
    bg: 'Двоен контакт до дивана (лампион, зарядно)' },
  { id: 'Л11', t: 'light', x: 593, y: 480, h: 174, n: [-1, 0], plate: false, room: 'Дневна',
    bg: 'LED под горните шкафове над дивана', note: 'захранването идва през тавана; ключът – с дневната' },
  { id: 'Т8', t: 'socket', x: 625, y: 505, h: 225, n: [1, 0], w: 15, room: 'Антре',
    bg: 'Контакт + интернет за рутера – горе в шкафа в антрето', note: 'по средата на апартамента – добро покритие' },
];

// ---------------------------------------------------------------- furniture list (shown in the side panel)
export const FURNITURE = [
  { name: 'Легло 160 × 200 с повдигащ механизъм', size: 'тапицирано, табла 180 × 120',
    mech: 'газови амортисьори – матракът се вдига, отдолу ракла за спално бельо и куфари' },
  { name: 'Нощни шкафчета (2 бр.)', size: '45 × 37 × 30, висящи, орех; откъм прозореца плотът продължава с дъска до 78 см',
    mech: '1 чекмедже, пълно изтегляне, push-to-open (Tip-On), плавно затваряне; дъската е за часовници и парфюми' },
  { name: 'Бюфет срещу леглото', size: '183 × 30 × 75, орех с релефни фронтове',
    mech: 'ляво и дясно: врати с push-to-open (кърпи, хавлии); средата: 3 чекмеджета – бижута (кадифе с отделения), парфюми, дребни неща' },
  { name: 'Тоалетка (продължение на бюфета)', size: '107 × 40, плот на 75 см',
    mech: 'плитко чекмедже push-to-open с органайзер за гримове' },
  { name: 'Дрешник – закачалки', size: '213 × 60, открито',
    mech: 'дълги дрехи 82 см + два реда закачалки 123 см, рафтове за обувки и кутии, LED лента' },
  { name: 'Дрешник – чекмеджета', size: '3 колони × 4 + 4 в дъното = 16 бр., 40 дълбоки',
    mech: 'пълно изтегляне с плавно затваряне; вдлъбнат профил отгоре за издърпване (без дръжки); отделения за бижута, бельо, чорапи, колани' },
  { name: 'Дрешник – шкафове горе', size: '3 бр., 70 × 130',
    mech: 'врати на скрити панти с push-to-open, по 2 рафта' },
  { name: 'Двустранна мебел на мястото на стената антре/дневна', size: '200 × 75 см, от пода до тавана',
    mech: 'заменя тухлената стена и вратата към дневната; закрепена за пода, тавана и стената на спалнята' },
  { name: '– откъм коридора: портманто', size: '40 дълбоко; коридорът остава 85 см',
    mech: 'ниша 1 м: закачалки, рафт за шапки с LED, пейка с възглавница и 2 чекмеджета за обувки (push); шкаф 1 м: 2 врати (едната огледало) – рафтове за обувки, прахосмукачка с контакт, дъска за гладене' },
  { name: '– откъм дневната: гръб за дивана', size: 'панел от релефни ламели до 175 см, над него шкафове 30 дълбоки до тавана',
    mech: 'диванът (200 × 95) е облегнат на мебелта; отворен рафт над него на 128 см с LED ленти; горните шкафове с push врати и LED отдолу' },
];

// ---------------------------------------------------------------- materials
const mat = (color, opts = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.7, ...opts });
const C = {
  oak: mat('#c9a77c', { roughness: 0.6 }),
  oakDark: mat('#a9875f', { roughness: 0.6 }),
  walnut: mat('#7a5e4d', { roughness: 0.55 }),
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
  inner: mat('#c9a77c', { roughness: 0.6 }),          // light oak inside carcasses and drawers
  metal: mat('#a7adb2', { roughness: 0.3, metalness: 0.8 }),
  metalDark: mat('#6d7277', { roughness: 0.35, metalness: 0.7 }),
  grip: mat('#24170f', { roughness: 0.8 }),           // shadow of the grip groove
  lining: mat('#cfc8bc', { roughness: 1 }),
  velvet: mat('#4d5a52', { roughness: 1 }),
  velvetDark: mat('#3a443e', { roughness: 1 }),
};

function flutedWood() {
  const c = document.createElement('canvas');
  c.width = 32;
  c.height = 4;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 32, 0);
  grad.addColorStop(0, '#574335');
  grad.addColorStop(0.2, '#8f7462');
  grad.addColorStop(0.6, '#7a5e4d');
  grad.addColorStop(1, '#574335');
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 4);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(24, 1);
  t.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshStandardMaterial({ map: t, roughness: 0.6 });
}

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

  // ======================= MECHANISMS =======================
  // A front is described in its own frame: u runs along the front, v is the distance out of the
  // front face (v < 0 = inside the unit). n = outward direction in plan, f = plan coordinate of the face.
  const frame = ([nx, ny], f) => (u1, u2, v1, v2) => {
    if (ny) { const a = f + ny * v1, c = f + ny * v2; return [u1, Math.min(a, c), u2, Math.max(a, c)]; }
    const a = f + nx * v1, c = f + nx * v2; return [Math.min(a, c), u1, Math.max(a, c), u2];
  };
  const centerOf = (n, f, u1, u2) => { const r = frame(n, f)((u1 + u2) / 2, (u1 + u2) / 2, 0, 0); return new THREE.Vector2(M(r[0]), M(r[1])); };
  const tag = (mesh, part) => { mesh.userData.door = part; pickables.push(mesh); return mesh; };
  const fluted = (w) => { const m = flutedWood(); m.map.repeat.set(Math.max(4, Math.round(w / 2.6)), 1); return m; };
  const register = (part) => { part.furniture = true; part.frac = 0; part.target = 0; part.apply(); addDoor(part); return part; };
  const quiet = (m) => { m.castShadow = false; return m; };

  // carcass open at the front
  function shell(n, f, u1, u2, depth, z0, z1, m, t = 1.8) {
    const fr = frame(n, f);
    b(...fr(u1, u1 + t, -depth, -2), z0, z1, m);
    b(...fr(u2 - t, u2, -depth, -2), z0, z1, m);
    b(...fr(u1, u2, -depth, -depth + t), z0, z1, m);
    b(...fr(u1, u2, -depth, -2), z0, z0 + t, m);
    b(...fr(u1, u2, -depth, -2), z1 - t, z1, m);
  }

  // drawer on full-extension soft-close runners; grip 'push' (push-to-open latch) or 'top' (grip groove on top)
  function drawer({ n, f, u1, u2, z0, z1, depth, front, grip = 'push', fill }) {
    const fr = frame(n, f);
    const g = new THREE.Group();
    group.add(g);
    const part = { kind: 'drawer' };
    const add = (r, za, zb, m, pick = true) => { const mesh = quiet(b(...r, za, zb, m, g)); if (pick) tag(mesh, part); return mesh; };
    const zt = grip === 'top' ? z1 - 2.8 : z1 - 0.2;
    add(fr(u1 + 0.2, u2 - 0.2, -2, 0), z0 + 0.2, zt, front).castShadow = true;
    if (grip === 'top') add(fr(u1 + 0.2, u2 - 0.2, -2, -1.2), zt, z1 - 0.2, C.grip);
    const ua = u1 + 2.6, ub = u2 - 2.6, vb = -depth + 4, zb = z0 + 1.5;
    const zh = Math.max(zb + 6, z1 - 4.5);
    add(fr(ua, ub, vb, -2), zb, zb + 1, C.inner);
    add(fr(ua, ua + 1.2, vb, -2), zb, zh, C.inner);
    add(fr(ub - 1.2, ub, vb, -2), zb, zh, C.inner);
    add(fr(ua, ub, vb, vb + 1.2), zb, zh, C.inner);
    add(fr(ua - 1.1, ua, vb, -3), zb + 1, zb + 2.6, C.metal, false);       // moving runner
    add(fr(ub, ub + 1.1, vb, -3), zb + 1, zb + 2.6, C.metal, false);
    quiet(b(...fr(ua - 1.6, ua - 1.1, -depth + 2, -3), zb + 0.6, zb + 3, C.metalDark)); // fixed runner
    quiet(b(...fr(ub + 1.1, ub + 1.6, -depth + 2, -3), zb + 0.6, zb + 3, C.metalDark));
    if (grip === 'push') {                                                // Tip-On latch at the back
      const uc = (u1 + u2) / 2, zc = (zb + zh) / 2;
      quiet(b(...fr(uc - 2.5, uc + 2.5, -depth + 1.8, vb), zc - 1.5, zc + 1.5, C.metalDark));
    }
    if (fill) {
      const api = { u1: ua + 1.2, u2: ub - 1.2, v1: vb + 1.2, v2: -2.2, z: zb + 1, h: zh - zb - 1,
        add: (a1, a2, c1, c2, za, zb2, m) => add(fr(a1, a2, c1, c2), za, zb2, m, false),
        cyl: (u, v, za, zb2, r, m) => { const pt = fr(u, u, v, v); quiet(cylinder(pt[0], pt[1], za, zb2, r, m, g)); } };
      fill(api);
    }
    const travel = depth * 0.85;
    part.center = centerOf(n, f, u1, u2);
    part.apply = () => { g.position.x = M(n[0] * travel * part.frac); g.position.z = M(n[1] * travel * part.frac); };
    return register(part);
  }

  // hinged door on concealed (cup) hinges with push-to-open
  function hingeDoor({ n, f, u1, u2, z0, z1, hinge = 'u1', front }) {
    const fr = frame(n, f);
    const part = { kind: 'hinge' };
    const hu = hinge === 'u1' ? u1 + 0.2 : u2 - 0.2;
    const hp = fr(hu, hu, -1, -1);
    const pivot = new THREE.Group();
    pivot.position.set(M(hp[0]), 0, M(hp[1]));
    group.add(pivot);
    const inner = new THREE.Group();
    inner.position.set(-M(hp[0]), 0, -M(hp[1]));
    pivot.add(inner);
    tag(b(...fr(u1 + 0.2, u2 - 0.2, -2, 0), z0 + 0.2, z1 - 0.2, front, inner), part);
    const [c1, c2] = hinge === 'u1' ? [u1 + 2, u1 + 7] : [u2 - 7, u2 - 2];
    for (const z of [z0 + 8, z1 - 14]) quiet(b(...fr(c1, c2, -3.2, -2), z, z + 6, C.metal, inner));
    const lu = hinge === 'u1' ? u2 - 4 : u1 + 1;                           // push latch on the carcass
    quiet(b(...fr(lu, lu + 3, -5, -2.2), (z0 + z1) / 2 - 2, (z0 + z1) / 2 + 2, C.metalDark));
    const s = hinge === 'u1' ? 1 : -1;
    const d = n[1] ? [s, 0] : [0, s];
    const sign = d[1] === n[0] && -d[0] === n[1] ? 1 : -1;
    part.center = centerOf(n, f, u1, u2);
    part.apply = () => { pivot.rotation.y = sign * 1.65 * part.frac; };
    return register(part);
  }

  // ---- contents helpers
  const linenCols = ['#e9e3d8', '#cfc4b3', '#a9b3a1', '#d8c2ad', '#8f9a8a', '#bfb2a2'];
  const clothCols = ['#2f3a4a', '#8c6d5a', '#d8cfc4', '#5b6b5a', '#9e3f3a', '#e8e2d6', '#3d3d3d', '#b48a6b', '#6d7f99', '#c7b49b'];
  const pick = (arr) => mat(arr[(rnd() * arr.length) | 0], { roughness: 0.95 });
  const grid = (a, nu, nv, hh = 5, m = C.inner) => {
    for (let i = 1; i < nu; i++) { const u = a.u1 + (i * (a.u2 - a.u1)) / nu; a.add(u - 0.4, u + 0.4, a.v1, a.v2, a.z, a.z + Math.min(hh, a.h), m); }
    for (let j = 1; j < nv; j++) { const v = a.v1 + (j * (a.v2 - a.v1)) / nv; a.add(a.u1, a.u2, v - 0.4, v + 0.4, a.z, a.z + Math.min(hh, a.h), m); }
  };
  const folded = (a, cols, colors, layer = 4, fillRatio = 0.85) => {
    const w = (a.u2 - a.u1) / cols;
    for (let c = 0; c < cols; c++) {
      const layers = Math.max(1, Math.floor((a.h * fillRatio) / layer) - (c % 2));
      for (let k = 0; k < layers; k++) {
        const j = (rnd() - 0.5) * 1.5;
        a.add(a.u1 + c * w + 1 + j, a.u1 + (c + 1) * w - 1 + j, a.v1 + 1, a.v2 - 1, a.z + k * layer, a.z + (k + 1) * layer - 0.3, pick(colors));
      }
    }
  };
  const smalls = (a, nu, nv, colors, hmax) => {
    for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) {
      const u = a.u1 + ((i + 0.5) * (a.u2 - a.u1)) / nu, v = a.v1 + ((j + 0.5) * (a.v2 - a.v1)) / nv;
      if (rnd() < 0.25) continue;
      const kind = rnd();
      if (kind < 0.5) a.cyl(u, v, a.z, a.z + 1 + rnd() * hmax, 0.8 + rnd() * 1.6, pick(colors));
      else a.add(u - 2 - rnd() * 2, u + 2 + rnd() * 2, v - 1.5 - rnd() * 2, v + 1.5 + rnd() * 2, a.z, a.z + 0.6 + rnd() * hmax * 0.4, pick(colors));
    }
  };
  const gold = ['#c9a65a', '#d9d4cc', '#b08a5a', '#8c8c8c'];
  const makeup = ['#2a2a2a', '#c58b7a', '#9e3f3a', '#e3c9a8', '#7a5a4a', '#d9b8a8'];
  const perfume = (a) => {
    const pts = [[0.15, 0.3], [0.38, 0.65], [0.6, 0.3], [0.82, 0.62], [0.25, 0.75], [0.7, 0.8]];
    for (const [pu, pv] of pts) {
      const u = a.u1 + pu * (a.u2 - a.u1), v = a.v1 + pv * (a.v2 - a.v1), hh = Math.min(a.h - 1, 8 + rnd() * 6);
      a.cyl(u, v, a.z, a.z + hh, 2.5 + rnd() * 1.2, mat(['#e9d6b8', '#cfe0e6', '#f0c9c0', '#d8d0f0'][(rnd() * 4) | 0], { roughness: 0.1, transparent: true, opacity: 0.8 }));
      a.cyl(u, v, a.z + hh, a.z + hh + 2, 1.2, mat('#c9a65a', { metalness: 0.7, roughness: 0.3 }));
    }
  };

  // ======================= BED with lift-up storage =======================
  b(438, 892, 618, 897, 0, 120, C.fabric);                 // headboard
  b(446, 697, 610, 701, 6, 31, C.fabric);                  // storage box sides
  b(446, 888, 610, 892, 6, 31, C.fabric);
  b(446, 701, 450, 888, 6, 31, C.fabric);
  b(606, 701, 610, 888, 6, 31, C.fabric);
  quiet(b(450, 701, 606, 888, 6, 7.5, C.lining));          // storage floor
  quiet(b(527, 701, 529, 888, 7.5, 30, C.lining));         // divider
  quiet(b(456, 708, 522, 790, 7.5, 24, mat('#d9d3c7')));   // spare duvet (vacuum bag)
  quiet(b(458, 800, 520, 880, 7.5, 19, mat('#b9c2b0')));   // winter blanket
  quiet(b(536, 712, 600, 866, 7.5, 27, mat('#5f5a54')));   // suitcase
  const bed = { kind: 'bed' };
  const lid = new THREE.Group();
  lid.position.set(M(528), M(31), M(886));
  group.add(lid);
  const lidIn = new THREE.Group();
  lidIn.position.set(-M(528), -M(31), -M(886));
  lid.add(lidIn);
  const lb = (...a) => tag(b(...a, lidIn), bed);
  lb(446, 697, 610, 892, 31, 33, C.fabric);                // upholstered platform
  lb(448, 699, 608, 890, 33, 55, C.linen);                 // mattress
  lb(444, 697, 612, 842, 38, 60, C.duvet);                 // duvet
  lb(443, 700, 613, 745, 60, 62, C.sage);                  // throw
  lb(456, 846, 524, 886, 55, 72, C.linen);                 // pillows
  lb(532, 846, 600, 886, 55, 72, C.linen);
  lb(466, 838, 590, 852, 58, 74, C.sage);
  const struts = [470, 586].map((x) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(M(1.1), M(1.1), 1, 10), C.metal);
    group.add(m);
    return { m, a: new THREE.Vector3(M(x), M(12), M(870)), local: new THREE.Vector3(M(x), M(29), M(790)) };
  });
  const up = new THREE.Vector3(0, 1, 0), tmp = new THREE.Vector3();
  bed.center = new THREE.Vector2(M(528), M(795));
  bed.apply = () => {
    lid.rotation.x = 0.72 * bed.frac;
    lid.updateMatrixWorld(true);
    for (const s of struts) {
      const bpt = lidIn.localToWorld(tmp.copy(s.local));
      const dir = bpt.clone().sub(s.a);
      s.m.scale.set(1, dir.length(), 1);
      s.m.position.copy(s.a).addScaledVector(dir, 0.5);
      s.m.quaternion.setFromUnitVectors(up, dir.normalize());
      s.m.visible = bed.frac > 0.02;
    }
  };
  register(bed);
  block([438, 697, 618, 897]);

  // ======================= NIGHTSTANDS (walnut, floating, push-to-open) =======================
  for (const [x1, x2] of [[391, 436], [620, 665]]) {
    shell([0, -1], 855, x1, x2, 37, 25, 55, C.walnut);
    drawer({ n: [0, -1], f: 855, u1: x1, u2: x2, z0: 26.8, z1: 53.2, depth: 35, front: C.walnut, fill: (a) => {
      a.add(a.u1 + 2, a.u1 + 18, a.v1 + 3, a.v1 + 25, a.z, a.z + 2.5, mat('#7a8a99'));       // book
      a.add(a.u1 + 22, a.u1 + 36, a.v1 + 4, a.v1 + 10, a.z, a.z + 3, mat('#3b3b3b'));        // glasses case
      a.cyl(a.u1 + 28, a.v1 + 20, a.z, a.z + 2, 4, mat('#d9d4cc'));                         // charger
      a.add(a.u1 + 22, a.u1 + 34, a.v1 + 25, a.v2 - 2, a.z, a.z + 1.5, mat('#c58b7a'));      // notebook
    } });
    block([x1, 855, x2, 892]);
    const cx = (x1 + x2) / 2;
    b(cx - 1, 885, cx + 1, 897, 149, 151, C.black);                 // sconce arm
    cylinder(cx, 885, 140, 156, 9, C.lampShade).castShadow = false; // shade
    b(cx - 10, 862, cx + 8, 882, 55, 58, mat('#7a8a99'));          // book on top
  }

  // his side (window side): the nightstand top continues as a floating walnut board – watches, perfume
  // (stops 15 cm before the wall so the curtain can still hang down)
  b(358, 855, 391, 892, 53.2, 55, C.walnut);
  quiet(b(362, 858, 388, 874, 55, 56.2, mat('#3b2a20', { roughness: 0.5 })));   // leather valet tray
  for (const [x, y] of [[367, 863], [375, 866], [383, 864]]) {                  // watches
    quiet(b(x - 1.2, y - 4, x + 1.2, y + 4, 56.2, 56.8, mat('#2a2a2a', { roughness: 0.6 })));
    quiet(cylinder(x, y, 56.2, 57.6, 2.1, C.metal));
  }
  for (const [x, c, hh] of [[365, '#e9d6b8', 12], [373, '#cfd6da', 10], [381, '#6b4a3a', 13]]) {   // perfume
    quiet(cylinder(x, 884, 55, 55 + hh, 2.8, mat(c, { roughness: 0.1, transparent: true, opacity: 0.85 })));
    quiet(cylinder(x, 884, 55 + hh, 57 + hh, 1.3, mat('#1f1f1f', { roughness: 0.3 })));
  }
  block([358, 855, 391, 892]);

  // ======================= SIDEBOARD (fluted walnut, 183 x 30 x 75) =======================
  {
    const n = [0, 1], f = 635, fr = frame(n, f);
    quiet(b(452, 605, 635, 627, 0, 8, C.black));                     // recessed plinth
    shell(n, f, 452, 635, 30, 8, 72, C.walnut);
    b(450, 605, 637, 635, 72, 75, C.walnut);                         // top (continues over the dressing table)
    for (const u of [512.2, 573.8]) b(...fr(u, u + 1.8, -30, -2), 8, 72, C.walnut);
    // left: towels on a shelf
    quiet(b(...fr(453.8, 512.2, -28, -3), 39, 40.8, C.inner));
    folded({ u1: 455, u2: 511, v1: -27, v2: -4, z: 9.8, h: 28, add: (a1, a2, c1, c2, za, zb, m) => quiet(b(...fr(a1, a2, c1, c2), za, zb, m)) }, 2, linenCols, 4.5);
    for (let k = 0; k < 4; k++) {                                     // rolled towels on top
      const r = new THREE.Mesh(new THREE.CylinderGeometry(M(5.5), M(5.5), M(22), 20), pick(linenCols));
      r.rotation.x = Math.PI / 2;
      r.position.set(M(460 + k * 13), M(46.5), M(620));
      group.add(r);
    }
    hingeDoor({ n, f, u1: 452, u2: 512.8, z0: 8.5, z1: 72, hinge: 'u1', front: fluted(60) });
    // middle: three drawers – jewellery, perfume, small things
    drawer({ n, f, u1: 512.8, u2: 574.4, z0: 51, z1: 72, depth: 28, front: fluted(61), fill: (a) => {
      a.add(a.u1, a.u2, a.v1, a.v2, a.z, a.z + 0.6, C.velvet);
      const a2 = { ...a, z: a.z + 0.6, h: 4 };
      grid(a2, 4, 2, 3.5, C.velvetDark);
      smalls(a2, 8, 4, gold, 2);
    } });
    drawer({ n, f, u1: 512.8, u2: 574.4, z0: 29.5, z1: 51, depth: 28, front: fluted(61), fill: perfume });
    drawer({ n, f, u1: 512.8, u2: 574.4, z0: 8.5, z1: 29.5, depth: 28, front: fluted(61), fill: (a) => {
      grid(a, 3, 1, 8);
      smalls(a, 6, 3, ['#d9c7b0', '#8a7e70', '#efe9df', '#6b4a3a'], 9);
    } });
    // right: shelves for towels / bathrobe / boxes
    for (const z of [30, 51]) quiet(b(...fr(575.6, 633.2, -28, -3), z, z + 1.8, C.inner));
    const rAdd = (a1, a2, c1, c2, za, zb, m) => quiet(b(...fr(a1, a2, c1, c2), za, zb, m));
    folded({ u1: 576, u2: 632, v1: -27, v2: -4, z: 9.8, h: 19, add: rAdd }, 2, linenCols, 4.5);
    folded({ u1: 576, u2: 632, v1: -27, v2: -4, z: 31.8, h: 18, add: rAdd }, 1, ['#cfc4b3', '#e9e3d8'], 6);
    rAdd(578, 602, -26, -6, 52.8, 66, mat('#c9b9a3'));
    rAdd(606, 630, -26, -6, 52.8, 63, mat('#8f9a8a'));
    hingeDoor({ n, f, u1: 574.4, u2: 635, z0: 8.5, z1: 72, hinge: 'u2', front: fluted(60) });
  }
  for (const z of [125, 162]) b(462, 605, 628, 620, z, z + 3, C.walnut);
  // leaning frames on the shelves
  const art = ['#efe9df', '#3a3a3a', '#d9b8a8', '#cfc6b8', '#8a5a4a', '#f4efe6', '#6f7d6b'];
  [[125, [[466, 30, 36], [500, 26, 30], [530, 34, 40], [570, 24, 28], [598, 28, 32]]],
   [162, [[470, 26, 30], [502, 30, 38], [540, 34, 42], [584, 26, 30]]]].forEach(([z, items], k) => {
    items.forEach(([x, w, h], j) => {
      quiet(b(x, 608, x + w, 610.5, z + 3, z + 3 + h, mat(art[(j + k * 2) % art.length], { roughness: 0.9 })));
    });
  });
  // on top: globe table lamp, vase with branches, books
  cylinder(608, 620, 75, 79, 6, C.oakDark);
  {
    const globe = new THREE.Mesh(new THREE.SphereGeometry(M(14), 32, 20), C.lampShade);
    globe.position.set(M(608), M(93), M(620));
    group.add(globe);
  }
  cylinder(572, 620, 75, 100, 6, mat('#d8cbb6', { roughness: 0.8 }));
  for (let k = 0; k < 7; k++) {
    const twig = new THREE.Mesh(new THREE.CylinderGeometry(M(0.4), M(0.4), M(40), 4), mat('#6b4a3a'));
    twig.position.set(M(572 + (k - 3) * 3), M(118), M(620 + ((k % 3) - 1) * 2));
    twig.rotation.z = (k - 3) * 0.12;
    group.add(twig);
  }
  b(470, 612, 500, 630, 75, 78, mat('#e9e2d4'));
  b(472, 613, 498, 629, 78, 80, mat('#b9a58c'));
  b(512, 612, 540, 630, 75, 78, mat('#6b4a3a', { roughness: 0.4 }));  // tray
  block([450, 605, 637, 635]);

  // ======================= DRESSING TABLE (one piece with the sideboard) =======================
  b(343, 605, 450, 645, 72, 75, C.walnut);                // top, 107 x 40
  b(343, 605, 345, 643, 59, 72, C.walnut);                // drawer housing
  b(448.2, 605, 450, 643, 59, 72, C.walnut);
  b(345, 605, 448.2, 607, 59, 72, C.walnut);
  drawer({ n: [0, 1], f: 645, u1: 345, u2: 450, z0: 59, z1: 72, depth: 38, front: fluted(105), fill: (a) => {
    a.add(a.u1, a.u2, a.v1, a.v2, a.z, a.z + 0.5, C.velvet);
    const a2 = { ...a, z: a.z + 0.5, h: 5 };
    grid(a2, 6, 2, 4.5, C.inner);
    smalls(a2, 12, 4, makeup, 4);
  } });
  {
    const glow = new THREE.Mesh(new THREE.CylinderGeometry(M(32), M(32), M(1), 48), C.lightGlow);
    glow.rotation.x = Math.PI / 2;
    glow.position.set(M(394), M(140), M(605.6));
    group.add(glow);
    const mirror = new THREE.Mesh(new THREE.CylinderGeometry(M(30), M(30), M(1.5), 48), C.mirror);
    mirror.rotation.x = Math.PI / 2;
    mirror.position.set(M(394), M(140), M(607));
    group.add(mirror);
  }
  for (const x of [352, 436]) {                           // lights either side of the mirror
    b(x - 3, 605, x + 3, 607, 112, 168, C.black);
    quiet(b(x - 2, 607, x + 2, 610, 114, 166, C.lightGlow));
  }
  b(355, 615, 375, 635, 75, 78, C.oakDark);               // tray
  cylinder(420, 625, 75, 89, 3, mat('#e3c9a8', { roughness: 0.2 }));
  cylinder(394, 672, 0, 45, 17, C.sage);                  // stool
  block([343, 605, 450, 645]);
  block([377, 655, 411, 689]);

  // main ceiling light
  quiet(cylinder(546, 751, H - 3, H, 22, C.lightGlow));

  // curtains on the west window (pulled to the sides)
  quiet(b(347, 650, 349, 894, 246, 248, C.black));
  for (const [y1, y2] of [[652, 694], [842, 890]]) {
    for (let k = 0; k < 6; k++) {
      const y = y1 + k * ((y2 - y1) / 6);
      quiet(b(348 + (k % 2) * 3, y, 352 + (k % 2) * 3, y + (y2 - y1) / 6 + 1, 4, 244, C.curtain));
    }
  }

  // ======================= WALK-IN CLOSET (walnut, no handles) =======================
  // --- top run along the bathroom wall: open hanging, 60 deep (y 710–770)
  const T = { y1: 710, y2: 770 };
  b(754, T.y1, 756, T.y2, 0, 260, C.walnut);          // end panel
  b(838, T.y1, 840, T.y2, 0, 260, C.walnut);          // divider
  b(754, T.y1, 963, T.y2, 258, 260, C.walnut);        // top
  quiet(b(756, T.y1, 963, T.y2, 0, 4, C.black));      // plinth
  // section 1: long hanging (dresses, coats) + shoe shelves below
  b(756, T.y1, 838, T.y2, 205, 207, C.inner);
  b(756, T.y1, 838, T.y2, 232, 234, C.inner);
  rail(756, 838, 740, 196);
  garments(756, 838, 718, 762, 194, 105, 145);
  b(756, T.y1, 838, T.y2 - 5, 12, 14, C.inner);
  b(756, T.y1, 838, T.y2 - 5, 32, 34, C.inner);
  for (let x = 760; x < 832; x += 13) {
    const m = mat(palette[(rnd() * palette.length) | 0]);
    quiet(b(x, 738, x + 10, 765, 14, 22, m));
    quiet(b(x, 738, x + 10, 765, 34, 42, m));
  }
  // section 2: double hanging (shirts / trousers)
  b(840, T.y1, 963, T.y2, 205, 207, C.inner);
  b(840, T.y1, 963, T.y2, 232, 234, C.inner);
  b(840, T.y1, 963, T.y2, 108, 110, C.inner);
  rail(840, 963, 740, 196);
  rail(840, 963, 740, 100);
  garments(840, 960, 718, 762, 194, 70, 82);
  garments(840, 960, 720, 760, 98, 55, 62);
  for (let x = 760; x < 950; x += 40) quiet(b(x, 716, x + 35, 764, 234, 256, C.box));
  block([754, T.y1, 963, T.y2]);

  // --- bottom run along the south wall, 40 deep: 3 x 4 drawers (grip groove on top) + cabinets above
  {
    const n = [0, -1], f = 857, fr = frame(n, f);
    const cols = [[754, 823.7], [823.7, 893.3], [893.3, 963]];
    shell(n, f, 754, 963, 40, 4, 95, C.walnut);
    shell(n, f, 754, 963, 40, 130, 260, C.walnut);
    for (const u of [822, 891.6]) { b(...fr(u, u + 1.8, -40, -2), 4, 95, C.walnut); b(...fr(u, u + 1.8, -40, -2), 130, 260, C.walnut); }
    quiet(b(754, 857, 963, 897, 0, 4, C.black));
    b(754, 857, 963, 897, 95, 98, C.walnut);               // worktop
    b(754, 879, 963, 897, 98, 130, C.inner);              // open niche (jewellery, perfume)
    b(770, 870, 810, 892, 98, 101, C.oakDark);
    cylinder(840, 882, 98, 112, 3, mat('#e3c9a8', { roughness: 0.2 }));
    cylinder(850, 886, 98, 108, 2.5, mat('#9fb3c2', { roughness: 0.2 }));
    // drawer contents, top drawer first, per column (hers / shared / his)
    const fills = [
      [(a) => { a.add(a.u1, a.u2, a.v1, a.v2, a.z, a.z + 0.6, C.velvet); const a2 = { ...a, z: a.z + 0.6, h: 4 }; grid(a2, 5, 3, 3.5, C.velvetDark); smalls(a2, 10, 6, gold, 2); },
       (a) => { grid(a, 5, 4, 9); smalls(a, 5, 4, ['#e8e2d6', '#d9b8a8', '#2a2a2a', '#c7b49b'], 6); },
       (a) => folded(a, 3, clothCols, 3),
       (a) => folded(a, 2, clothCols, 5)],
      [(a) => { grid(a, 4, 2, 9); for (let i = 0; i < 8; i++) a.cyl(a.u1 + 7 + (i % 4) * ((a.u2 - a.u1 - 14) / 3), a.v1 + 8 + ((i / 4) | 0) * 16, a.z, a.z + 4, 4, pick(['#3d2b20', '#2a2a2a', '#6b4a3a', '#2f3a4a'])); },
       (a) => { grid(a, 5, 4, 9); smalls(a, 5, 4, clothCols, 5); },
       (a) => folded(a, 3, clothCols, 3.5),
       (a) => folded(a, 2, linenCols, 5)],
      [(a) => { a.add(a.u1, a.u2, a.v1, a.v2, a.z, a.z + 0.6, C.velvetDark); const a2 = { ...a, z: a.z + 0.6, h: 4 }; grid(a2, 4, 2, 3.5, C.inner); smalls(a2, 6, 3, ['#8c8c8c', '#2a2a2a', '#c9a65a'], 3); },
       (a) => { grid(a, 5, 4, 9); smalls(a, 5, 4, ['#2a2a2a', '#2f3a4a', '#d9d4cc'], 6); },
       (a) => folded(a, 3, clothCols, 3),
       (a) => folded(a, 2, ['#2f3a4a', '#3d4a5e', '#5b6b7a', '#2a2a2a'], 5)],
    ];
    const zs = [[72.5, 95], [50, 72.5], [27.5, 50], [5, 27.5]];
    cols.forEach(([u1, u2], c) => {
      zs.forEach(([z0, z1], i) => drawer({ n, f, u1, u2, z0, z1, depth: 38, front: C.walnut, grip: 'top', fill: fills[c][i] }));
      // cabinet above: two shelves, push-to-open door
      const iu1 = u1 + (c === 0 ? 1.8 : 1.8), iu2 = u2 - 1.8;
      const sAdd = (a1, a2, c1, c2, za, zb, m) => quiet(b(...fr(a1, a2, c1, c2), za, zb, m));
      for (const z of [172, 215]) sAdd(iu1, iu2, -38, -3, z, z + 1.8, C.inner);
      folded({ u1: iu1 + 1, u2: iu2 - 1, v1: -36, v2: -5, z: 131.8, h: 38, add: sAdd }, 2, clothCols, 7);
      folded({ u1: iu1 + 1, u2: iu2 - 1, v1: -36, v2: -5, z: 173.8, h: 38, add: sAdd }, 2, clothCols, 6);
      sAdd(iu1 + 3, iu1 + (iu2 - iu1) / 2 - 2, -34, -6, 216.8, 240, C.box);
      sAdd(iu1 + (iu2 - iu1) / 2 + 2, iu2 - 3, -34, -6, 216.8, 236, mat('#7a5a43', { roughness: 0.6 }));
      hingeDoor({ n, f, u1, u2, z0: 130, z1: 260, hinge: c === 2 ? 'u2' : 'u1', front: C.walnut });
    });
    block([754, 857, 963, 897]);
  }

  // --- end of the closet (east wall), 87 x 40: 4 drawers + open shelves for bags
  {
    const n = [-1, 0], f = 923;
    shell(n, f, 770, 857, 40, 4, 95, C.walnut);
    quiet(b(923, 770, 963, 857, 0, 4, C.black));
    const shoes = (a) => {
      for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
        const u = a.u1 + 4 + i * ((a.u2 - a.u1 - 8) / 3), v = a.v1 + 2 + j * ((a.v2 - a.v1) / 2);
        const m = pick(['#2a2a2a', '#7a5a43', '#c8b49a', '#8e3b36', '#e8e2d6']);
        a.add(u, u + 9, v, v + 15, a.z, a.z + 8, m);
        a.add(u + 11, u + 20, v, v + 15, a.z, a.z + 8, m);
      }
    };
    const endFills = [(a) => folded(a, 3, ['#9e3f3a', '#c7b49b', '#5b6b5a', '#e8e2d6'], 3), (a) => { grid(a, 3, 2, 9); smalls(a, 3, 2, clothCols, 8); }, shoes, shoes];
    [[72.5, 95], [50, 72.5], [27.5, 50], [5, 27.5]].forEach(([z0, z1], i) =>
      drawer({ n, f, u1: 770, u2: 857, z0, z1, depth: 38, front: C.walnut, grip: 'top', fill: endFills[i] }));
    b(923, 770, 963, 857, 95, 98, C.walnut);
    b(925, 770, 963, 772, 98, 258, C.walnut);           // side panels
    b(925, 855, 963, 857, 98, 258, C.walnut);
    for (const z of [140, 182, 220]) b(925, 772, 963, 855, z, z + 2, C.inner);
    const bagCols = ['#7a5a43', '#2d2d2d', '#c8b49a', '#8e3b36', '#a7b1a0'];
    [[100, 128], [142, 170], [184, 212], [222, 250]].forEach(([z0, z1], k) => {
      for (let y = 778; y < 848; y += 25) {
        const m = mat(bagCols[(k * 3 + y) % bagCols.length], { roughness: 0.6 });
        quiet(b(935, y, 955, y + 20, z0, z0 + (z1 - z0) * (0.6 + ((y + k) % 3) * 0.12), m));
      }
    });
    block([923, 770, 963, 857]);
  }

  // ======================= TWO-SIDED UNIT: hall coat storage | living-room TV section =======================
  // replaces the wall between the hall and the living room; spine at x 623–625, y 380–580
  {
    const Y1 = 380, Y2 = 580, TOP = H;                             // full height, up to the ceiling
    b(623, Y1, 625, Y2, 0, TOP, C.walnut);                         // spine
    b(621, Y1, 665, Y1 + 2, 0, TOP, C.walnut);                    // end panel facing the entrance
    b(593, Y1, 665, Y2, TOP - 2, TOP, C.walnut);                   // top
    block([621, Y1, 665, Y2]);

    // ---- hall side (faces +x, 40 deep, front at x 665)
    const nH = [1, 0], fH = 665, frH = frame(nH, fH);
    quiet(b(625, Y1, 665, Y2, 0, 4, C.black));                     // plinth
    b(...frH(481, 483, -40, 0), 4, TOP - 2, C.walnut);             // divider
    // coat niche y 382–481: hooks, hat shelf with LED, bench with shoe drawers
    b(...frH(382, 481, -40, -2), 182, 184, C.walnut);              // hat shelf
    quiet(b(...frH(384, 479, -6, -4), 180.5, 182, C.lightGlow));  // LED strip
    for (let k = 0; k < 5; k++) {
      const y = 392 + k * 19;
      b(625, y - 1, 630, y + 1, 168, 170, C.black);                // hook
      if (k !== 3) quiet(b(626, y - 8, 650, y + 8, 82 + (k % 2) * 12, 168, pick(['#3d3d3d', '#7a5a43', '#2f3a4a', '#b9a58c'])));  // coat
    }
    quiet(b(632, 400, 650, 420, 184, 196, mat('#c8b49a')));        // hat box
    quiet(b(632, 440, 650, 470, 184, 190, mat('#5b6b5a')));
    shell(nH, fH, 382, 481, 40, 200, TOP - 2, C.walnut);           // cabinet above the coat niche
    quiet(b(...frH(386, 430, -34, -6), 201.8, 222, C.box));
    quiet(b(...frH(434, 477, -34, -6), 201.8, 218, mat('#9aa7ad')));
    hingeDoor({ n: nH, f: fH, u1: 382, u2: 431.5, z0: 200, z1: TOP - 2, hinge: 'u1', front: C.walnut });
    hingeDoor({ n: nH, f: fH, u1: 431.5, u2: 481, z0: 200, z1: TOP - 2, hinge: 'u2', front: C.walnut });
    b(...frH(382, 481, -40, 0), 42, 45, C.walnut);                // bench
    quiet(b(...frH(384, 479, -38, -1), 45, 50, C.sage));           // cushion
    shell(nH, fH, 382, 481, 40, 4, 42, C.walnut);
    const shoe2 = (a) => {
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
        const u = a.u1 + 2 + i * ((a.u2 - a.u1) / 2), v = a.v1 + 1 + j * ((a.v2 - a.v1) / 2);
        const m = pick(['#2a2a2a', '#7a5a43', '#c8b49a', '#e8e2d6']);
        a.add(u, u + 9, v, v + 15, a.z, a.z + 9, m);
        a.add(u + 10.5, u + 19.5, v, v + 15, a.z, a.z + 9, m);
      }
    };
    drawer({ n: nH, f: fH, u1: 382, u2: 431.5, z0: 4, z1: 42, depth: 38, front: C.walnut, fill: shoe2 });
    drawer({ n: nH, f: fH, u1: 431.5, u2: 481, z0: 4, z1: 42, depth: 38, front: C.walnut, fill: shoe2 });
    // closed cabinet y 483–580: shoe shelves (north half), vacuum + ironing board (south half)
    shell(nH, fH, 483, Y2, 40, 4, TOP - 2, C.walnut);
    b(...frH(530.6, 532.4, -38, -2), 6, TOP - 4, C.walnut);       // inner divider
    for (let k = 0; k < 6; k++) {
      const z = 8 + k * 25;
      quiet(b(...frH(485, 530.6, -36, -3), z, z + 1.5, C.inner));
      for (const u of [487, 509]) { const m = pick(['#2a2a2a', '#7a5a43', '#c8b49a', '#8e3b36', '#e8e2d6']); quiet(b(...frH(u, u + 9, -30, -6), z + 1.5, z + 10, m)); quiet(b(...frH(u + 10, u + 19, -30, -6), z + 1.5, z + 10, m)); }
    }
    for (const z of [165, 186, 215, 240]) quiet(b(...frH(485, 530.6, -36, -3), z, z + 1.5, C.inner));
    for (const z of [215, 240]) quiet(b(...frH(532.4, 578.2, -36, -3), z, z + 1.5, C.inner));
    quiet(b(...frH(488, 526, -32, -8), 216.5, 236, mat('#c8b49a')));
    quiet(b(...frH(536, 575, -32, -8), 216.5, 232, C.box));
    quiet(b(...frH(488, 526, -32, -8), 166.5, 180, C.box));
    for (const z of [150, 178]) quiet(b(...frH(532.4, 578.2, -36, -3), z, z + 1.5, C.inner));
    quiet(cylinder(...frH(552, 552, -20, -20).slice(0, 2), 25, 130, 3, mat('#7d4a8c', { roughness: 0.4 })));   // stick vacuum
    quiet(b(...frH(546, 560, -26, -12), 10, 25, mat('#3a3a3a')));
    quiet(b(...frH(546, 558, -36, -30), 115, 140, C.metalDark));  // wall dock
    quiet(b(...frH(565, 576, -38, -4), 6, 125, mat('#9aa7ad')));   // ironing board (folded)
    for (let k = 0; k < 4; k++) quiet(cylinder(...frH(538 + k * 10, 538 + k * 10, -18, -18).slice(0, 2), 151.5, 166 + (k % 2) * 4, 3, pick(['#e6eef0', '#9fc3d0', '#f0e2b6', '#c7d6c0'])));
    hingeDoor({ n: nH, f: fH, u1: 483, u2: 531.5, z0: 4, z1: TOP - 2, hinge: 'u1', front: C.walnut });
    hingeDoor({ n: nH, f: fH, u1: 531.5, u2: Y2, z0: 4, z1: TOP - 2, hinge: 'u2', front: C.mirror });

    // ---- living side: flat fluted walnut panel behind the sofa, cabinets above it (30 deep, from 175 cm)
    const nL = [-1, 0], fL = 593, frL = frame(nL, fL);
    b(621, Y1, 623, Y2, 0, 175, fluted(200));                      // slatted panel behind the sofa
    shell(nL, fL, 382, Y2, 30, 175, TOP - 2, C.walnut);
    b(593, Y1, 623, Y1 + 2, 175, TOP, C.walnut);
    quiet(b(...frL(384, Y2 - 2, -4, -2), 173.3, 175, C.lightGlow)); // LED under the cabinets – soft light over the sofa
    for (let i = 0; i < 4; i++) {
      const u1 = 382 + i * 49.5, u2 = u1 + 49.5;
      quiet(b(...frL(u1 + 2, u2 - 2, -28, -4), 176.8, 196, pick(['#d9cdb9', '#b9a58c', '#cfc6b8'])));
      quiet(b(...frL(u1 + 2, u2 - 2, -28, -4), 220, 236, pick(['#e9e3d8', '#cfc4b3'])));
      quiet(b(...frL(u1 + 1.8, u2 - 1.8, -28, -2), 218, 219.8, C.inner));
      hingeDoor({ n: nL, f: fL, u1, u2, z0: 175, z1: TOP - 2, hinge: i % 2 ? 'u2' : 'u1', front: C.walnut });
    }

    // open shelf over the sofa (16 deep, at 128 cm) with LED strips – light washes down the slats
    b(...frL(382, Y2, -28, -12), 127, 129, C.walnut);
    quiet(b(...frL(384, Y2 - 2, -26, -24), 125.6, 127, C.lightGlow));   // LED under the shelf, near the panel
    quiet(b(...frL(384, Y2 - 2, -16, -14), 125.6, 127, C.lightGlow));   // LED under the shelf, front edge
    for (let y = 390; y < 570; ) {                                     // books, vases, frames on the shelf
      const r = rnd();
      if (r < 0.45) { const w = 14 + rnd() * 12; for (let k = 0; k < w; k += 2.6) quiet(b(...frL(y + k, y + k + 2.2, -26, -14), 129, 146 + rnd() * 8, pick(['#8a5a4a', '#cfc6b8', '#2f3a4a', '#6f7d6b', '#efe9df', '#b48a6b']))); y += w + 8; }
      else if (r < 0.75) { quiet(cylinder(...frL(y + 6, y + 6, -20, -20).slice(0, 2), 129, 146 + rnd() * 10, 4 + rnd() * 2, pick(['#d8cbb6', '#e9e3d8', '#8f9a8a']))); y += 20; }
      else { quiet(b(...frL(y, y + 22, -27, -25), 129, 157, pick(['#efe9df', '#d9b8a8', '#3a3a3a']))); y += 30; }
    }

    // ---- sofa against the unit, facing the window / balcony door (3-seater, 200 x 95)
    const sofa = mat('#cbbfae', { roughness: 1 }), sofaDark = mat('#b9ad9b', { roughness: 1 });
    b(526, Y1, 621, Y2, 4, 40, sofa);                               // base
    b(600, Y1 + 15, 621, Y2 - 15, 40, 84, sofaDark);               // back
    b(526, Y1, 621, Y1 + 15, 40, 62, sofa);                        // arms
    b(526, Y2 - 15, 621, Y2, 40, 62, sofa);
    for (let k = 0; k < 3; k++) {                                   // seat cushions
      const y1 = Y1 + 15.5 + k * 56.3;
      b(528, y1, 600, y1 + 55.5, 40, 50, sofa);
      b(598, y1 + 2, 612, y1 + 53, 50, 82, sofaDark);              // back cushions
    }
    quiet(b(588, 410, 598, 448, 50, 82, C.sage));                   // throw pillows
    quiet(b(588, 512, 598, 550, 50, 82, mat('#c7a98a')));
    block([526, Y1, 621, Y2]);
    // rug + round walnut coffee table
    quiet(b(400, 395, 600, 568, 0, 1, mat('#e2d9cb', { roughness: 1 })));
    cylinder(452, 480, 34, 38, 40, C.walnut);
    cylinder(452, 480, 0, 34, 14, C.walnut);
    quiet(cylinder(440, 470, 38, 50, 5, mat('#d8cbb6')));
    quiet(b(458, 482, 482, 500, 38, 41, mat('#8a5a4a')));
    block([412, 440, 492, 520]);
  }

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
      b(x1 + 1, y1 + 2.5, x2 - 1, y2 - 2.5, 3.5, 257.5, glass, g),
    ];
    parts[4].castShadow = false;
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
