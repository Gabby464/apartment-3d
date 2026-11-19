// Procedural textures (no image downloads needed).
import * as THREE from 'three';

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}

function finish(canvas, metres) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.userData.size = metres; // world metres covered by one repeat
  return t;
}

// Oak-like planks, 8 rows per repeat -> 20 cm wide planks over 1.6 m
export function woodTexture() {
  const S = 1024, rows = 8, ph = S / rows;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  const r = rng(11);

  const plank = (x, y, w, seed) => {
    const pr = rng(seed);
    const l = 60 + pr() * 9, hue = 30 + pr() * 6, sat = 30 + pr() * 12;
    g.fillStyle = `hsl(${hue},${sat}%,${l}%)`;
    g.fillRect(x, y, w, ph);
    for (let k = 0; k < 14; k++) {
      const gy = y + pr() * ph;
      g.strokeStyle = `hsla(${hue - 4},${sat + 10}%,${l - 18}%,${0.06 + pr() * 0.1})`;
      g.lineWidth = 1 + pr() * 2;
      g.beginPath();
      g.moveTo(x, gy);
      const amp = 2 + pr() * 4;
      for (let sx = 0; sx <= w; sx += 40) g.lineTo(x + sx, gy + Math.sin(sx / (60 + pr() * 40)) * amp);
      g.stroke();
    }
    g.strokeStyle = 'rgba(70,50,30,0.55)';
    g.lineWidth = 2;
    g.strokeRect(x + 1, y + 1, w - 2, ph - 2);
  };

  for (let i = 0; i < rows; i++) {
    let x = -r() * S * 0.7;
    while (x < S) {
      const w = S * (0.4 + r() * 0.45);
      const seed = (r() * 1e9) | 0;
      plank(x, i * ph, w, seed);
      if (x < 0) plank(x + S, i * ph, w, seed);
      if (x + w > S) plank(x - S, i * ph, w, seed);
      x += w;
    }
  }
  return finish(c, 1.6);
}

// Square/rectangular tiles with grout
export function tileTexture({ cols = 4, rows = 4, metres = 2.4, base = [215, 211, 204], vary = 8,
  grout = '#a8a39a', groutPx = 4, seed = 3, speckle = 0 } = {}) {
  const S = 1024;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  const r = rng(seed);
  g.fillStyle = grout;
  g.fillRect(0, 0, S, S);
  const tw = S / cols, th = S / rows;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const d = (r() - 0.5) * vary;
      g.fillStyle = `rgb(${base[0] + d},${base[1] + d},${base[2] + d})`;
      g.fillRect(i * tw + groutPx / 2, j * th + groutPx / 2, tw - groutPx, th - groutPx);
      for (let k = 0; k < speckle; k++) {
        g.fillStyle = `rgba(0,0,0,${r() * 0.08})`;
        g.fillRect(i * tw + r() * tw, j * th + r() * th, 2 + r() * 3, 2 + r() * 3);
      }
    }
  }
  return finish(c, metres);
}
