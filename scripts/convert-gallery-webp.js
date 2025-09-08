#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const galleryDir = path.resolve(__dirname, '..', 'images', 'gallery');
const validExt = new Set(['.jpg', '.jpeg', '.png']);

async function walk(dir, out = []) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(p, out);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (validExt.has(ext)) out.push(p);
    }
  }
  return out;
}

async function convertFile(filePath) {
  const outPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  try {
    await sharp(filePath).webp({ quality: 80 }).toFile(outPath);
    console.log(`[ok] ${path.relative(galleryDir, outPath)}`);
  } catch (err) {
    console.error(`[error] ${filePath}: ${err.message}`);
  }
}

async function main() {
  if (!fs.existsSync(galleryDir)) {
    console.error('Gallery directory not found:', galleryDir);
    process.exit(1);
  }
  const files = await walk(galleryDir);
  for (const file of files) {
    await convertFile(file);
  }
}

main();


