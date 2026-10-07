import { writeFileSync } from 'node:fs';

// ICO stores bitmap rows upside down and keeps a one-bit transparency mask
// after each 32-bit bitmap. Generate all common favicon sizes without a
// third-party image dependency.
const sizes = [16, 32, 48];
const blue = [33, 99, 232];
const white = [255, 255, 255];

function lineDistance(x, y, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(x - (ax + t * dx), y - (ay + t * dy));
}

function insideRoundRect(x, y) {
  const radius = 6;
  const cx = Math.max(radius, Math.min(24 - radius, x));
  const cy = Math.max(radius, Math.min(24 - radius, y));
  return Math.hypot(x - cx, y - cy) <= radius;
}

function onHouse(x, y) {
  const segments = [
    [4.5, 11, 12, 5],
    [12, 5, 19.5, 11],
    [5.5, 10.2, 5.5, 18.5],
    [5.5, 18.5, 10, 18.5],
    [10, 18.5, 10, 13.5],
    [10, 13.5, 14, 13.5],
    [14, 13.5, 14, 18.5],
    [14, 18.5, 18.5, 18.5],
    [18.5, 18.5, 18.5, 10.2],
  ];
  return segments.some(([ax, ay, bx, by]) => lineDistance(x, y, ax, ay, bx, by) <= 0.9);
}

function bitmap(size) {
  const xor = Buffer.alloc(size * size * 4);
  const mask = Buffer.alloc(Math.ceil(size / 32) * 4 * size);
  const samples = 4;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let alpha = 0;
      let house = 0;
      for (let sy = 0; sy < samples; sy++) {
        for (let sx = 0; sx < samples; sx++) {
          const px = ((x + (sx + 0.5) / samples) / size) * 24;
          const py = ((y + (sy + 0.5) / samples) / size) * 24;
          if (insideRoundRect(px, py)) {
            alpha++;
            if (onHouse(px, py)) house++;
          }
        }
      }
      const count = samples * samples;
      const blend = alpha ? house / alpha : 0;
      const offset = ((size - y - 1) * size + x) * 4;
      for (let channel = 0; channel < 3; channel++) {
        xor[offset + 2 - channel] = Math.round(
          blue[channel] * (1 - blend) + white[channel] * blend,
        );
      }
      xor[offset + 3] = Math.round((alpha / count) * 255);
    }
  }
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0);
  header.writeInt32LE(size, 4);
  header.writeInt32LE(size * 2, 8);
  header.writeUInt16LE(1, 12);
  header.writeUInt16LE(32, 14);
  header.writeUInt32LE(xor.length + mask.length, 20);
  return Buffer.concat([header, xor, mask]);
}

const images = sizes.map(bitmap);
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
images.forEach((image, index) => {
  const start = 6 + index * 16;
  directory.writeUInt8(sizes[index], start);
  directory.writeUInt8(sizes[index], start + 1);
  directory.writeUInt16LE(1, start + 4);
  directory.writeUInt16LE(32, start + 6);
  directory.writeUInt32LE(image.length, start + 8);
  directory.writeUInt32LE(offset, start + 12);
  offset += image.length;
});
writeFileSync(
  new URL('../public/favicon.ico', import.meta.url),
  Buffer.concat([directory, ...images]),
);
