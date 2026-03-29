import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const wappenDir = path.join(__dirname, '../wappen');
const publicWappenDir = path.join(__dirname, '../public/wappen');

// Ensure output directory exists
if (!fs.existsSync(publicWappenDir)) {
  fs.mkdirSync(publicWappenDir, { recursive: true });
}

// Define unique variations (skip duplicates)
const variations = [
  'Gemini_Generated_Image_e9ia85e9ia85e9ia.png', // Hero: variation 2
  'Gemini_Generated_Image_3hoo6t3hoo6t3hoo.png', // Gallery: 1
  'Gemini_Generated_Image_ev5e0mev5e0mev5e.png', // Gallery: 2
  'Gemini_Generated_Image_g2vqxdg2vqxdg2vq.png', // Gallery: 3
  'Gemini_Generated_Image_hdr4lohdr4lohdr4.png', // Gallery: 4
  'Gemini_Generated_Image_itna2mitna2mitna.png', // Gallery: 5
  'Gemini_Generated_Image_zdyf3ozdyf3ozdyf.png', // Gallery: 6
];

// Skip duplicates (indicated by "(1)" in filename)
const duplicates = [
  'Gemini_Generated_Image_g2vqxdg2vqxdg2vq (1).png',
  'Gemini_Generated_Image_zdyf3ozdyf3ozdyf (1).png',
];

async function optimizeImages() {
  console.log('Starting image optimization...\n');

  try {
    // Process hero image
    const heroSrc = path.join(wappenDir, variations[0]);
    console.log(`📸 Processing hero image: ${variations[0]}`);

    await sharp(heroSrc)
      .resize(800, 450, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(path.join(publicWappenDir, 'hero.webp'));

    await sharp(heroSrc)
      .resize(800, 450, { fit: 'cover', position: 'center' })
      .png({ quality: 85 })
      .toFile(path.join(publicWappenDir, 'hero.png'));

    console.log('   ✓ hero.webp & hero.png created\n');

    // Process gallery images
    const galleryVariations = variations.slice(1); // All except hero

    for (let i = 0; i < galleryVariations.length; i++) {
      const filename = galleryVariations[i];
      const src = path.join(wappenDir, filename);
      const num = i + 1;

      console.log(`📸 Processing gallery image ${num}: ${filename}`);

      // Thumbnail
      await sharp(src)
        .resize(400, 224, { fit: 'cover', position: 'center' })
        .webp({ quality: 80 })
        .toFile(path.join(publicWappenDir, `thumb-${num}.webp`));

      // Full size
      await sharp(src)
        .resize(1376, 768, { fit: 'cover', position: 'center' })
        .webp({ quality: 85 })
        .toFile(path.join(publicWappenDir, `full-${num}.webp`));

      console.log(`   ✓ thumb-${num}.webp & full-${num}.webp created\n`);
    }

    // Print summary
    console.log('\n✅ Image optimization complete!\n');
    console.log('Files created in public/wappen/:');
    const files = fs.readdirSync(publicWappenDir);
    let totalSize = 0;

    files.forEach((file) => {
      const filepath = path.join(publicWappenDir, file);
      const stats = fs.statSync(filepath);
      const sizeKb = (stats.size / 1024).toFixed(1);
      console.log(`  - ${file}: ${sizeKb}KB`);
      totalSize += stats.size;
    });

    const totalMb = (totalSize / 1024 / 1024).toFixed(2);
    console.log(`\nTotal size: ${totalMb}MB`);
    console.log(`Original size: ~70MB`);
    console.log(`Reduction: ${(((70 - totalMb) / 70) * 100).toFixed(0)}%`);

  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

optimizeImages();
