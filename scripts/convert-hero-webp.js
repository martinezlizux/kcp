#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const heroDir = path.resolve(__dirname, '..', 'images', 'Jumbotron');
const files = [
  '01Cleaning.jpg',
  '02Cleaning.jpg',
  '03Cleaning.jpg',
  '04Cleaning.jpg',
  '05Cleaning.jpg',
];

async function convert() {
  for (const file of files) {
    const inputPath = path.join(heroDir, file);
    const outputPath = path.join(heroDir, file.replace(/\.jpg$/i, '.webp'));
    if (!fs.existsSync(inputPath)) {
      console.warn(`[skip] not found: ${inputPath}`);
      continue;
    }
    try {
      await sharp(inputPath)
        .webp({ quality: 82 })
        .toFile(outputPath);
      console.log(`[ok] ${path.basename(outputPath)}`);
    } catch (err) {
      console.error(`[error] ${file}:`, err.message);
    }
  }
}

convert();


