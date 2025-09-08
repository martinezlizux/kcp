#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const src = path.resolve(__dirname, '..', 'images', 'Jumbotron', '02Cleaning.jpg');
const out = path.resolve(__dirname, '..', 'images', 'og-cover.jpg');

async function run() {
  if (!fs.existsSync(src)) {
    console.error('Source not found:', src);
    process.exit(1);
  }
  try {
    await sharp(src)
      .resize({ width: 1200, height: 630, fit: 'cover' })
      .jpeg({ quality: 78 })
      .toFile(out);
    console.log('OG cover generated at', out);
  } catch (e) {
    console.error('Error generating OG cover:', e.message);
    process.exit(1);
  }
}

run();



