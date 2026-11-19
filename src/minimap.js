// 2D mini-map drawn from the same plan data as the 3D model.
export class Minimap {
  constructor(canvas, data) {
    this.c = canvas;
    this.g = canvas.getContext('2d');
    this.d = data; // { rooms, walls, doors, windows, landing }
    this.b = { x0: -50, y0: -160, x1: 1015, y1: 940 };
  }

  resize() {
    const rect = this.c.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.c.width = Math.max(1, rect.width * dpr);
    this.c.height = Math.max(1, rect.height * dpr);
    this.dpr = dpr;
    const { x0, y0, x1, y1 } = this.b;
    const bw = x1 - x0, bh = y1 - y0;
    this.s = Math.min(this.c.width / bw, this.c.height / bh);
    this.ox = (this.c.width - bw * this.s) / 2 - x0 * this.s;
    this.oy = (this.c.height - bh * this.s) / 2 - y0 * this.s;
  }

  // CSS pixel (relative to canvas) -> plan cm
  toPlan(px, py) {
    return [(px * this.dpr - this.ox) / this.s, (py * this.dpr - this.oy) / this.s];
  }

  rect(r, fill) {
    const { g, s, ox, oy } = this;
    g.fillStyle = fill;
    g.fillRect(r[0] * s + ox, r[1] * s + oy, (r[2] - r[0]) * s, (r[3] - r[1]) * s);
  }

  draw(player, roomId) {
    const { g, c, d } = this;
    g.clearRect(0, 0, c.width, c.height);
    this.rect(d.landing, '#d7d3cc');
    for (const room of d.rooms) {
      const fill = room.id === roomId ? '#ffd58a' : room.outdoor ? '#c9d4db' : '#f1ebe0';
      for (const r of room.rects) this.rect(r, fill);
    }
    for (const w of d.walls) this.rect(w, '#2b2f36');
    for (const o of d.doors) this.rect(o, '#e3dccf');
    for (const o of d.windows) this.rect(o, '#7fbde3');

    if (player) {
      const { s, ox, oy } = this;
      const px = player.x * 100 * s + ox, py = player.z * 100 * s + oy;
      const fx = -Math.sin(player.yaw), fy = -Math.cos(player.yaw);
      const len = 140 * s, spread = 0.6;
      g.fillStyle = 'rgba(232,93,63,0.22)';
      g.beginPath();
      g.moveTo(px, py);
      const a = Math.atan2(fy, fx);
      g.arc(px, py, len, a - spread, a + spread);
      g.closePath();
      g.fill();
      g.fillStyle = '#e85d3f';
      g.strokeStyle = '#fff';
      g.lineWidth = 2 * this.dpr;
      g.beginPath();
      g.arc(px, py, Math.max(4 * this.dpr, 18 * s), 0, Math.PI * 2);
      g.fill();
      g.stroke();
    }
  }
}
