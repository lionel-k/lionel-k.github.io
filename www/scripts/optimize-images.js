const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

async function optimizeImage(inputPath) {
  const outputPath = inputPath;
  const imageInfo = await sharp(inputPath).metadata();
  const stats = await fs.stat(inputPath);
  const inputSize = stats.size;
  const isLargeFile = inputSize > 200 * 1024; // 200KB threshold

  // Create WebP version alongside PNG
  const webpOutputPath = outputPath.replace(/\.png$/, ".webp");

  // Different optimization strategies based on image type and size
  if (inputPath.includes("/cover.png")) {
    // Cover images: maintain good quality but reduce size
    await sharp(inputPath)
      .resize(800, 800, { fit: "inside", withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(outputPath + ".temp");

    // WebP version with higher compression
    await sharp(inputPath)
      .resize(800, 800, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(webpOutputPath);
  } else if (inputPath.includes("/reviews/")) {
    // Review images: can be more compressed
    await sharp(inputPath)
      .resize(600, 600, { fit: "inside", withoutEnlargement: true })
      .png({ quality: 70, compressionLevel: 9 })
      .toFile(outputPath + ".temp");

    await sharp(inputPath)
      .resize(600, 600, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(webpOutputPath);
  } else {
    // Interior book images: dynamic optimization based on size
    const config = isLargeFile
      ? {
          // More aggressive optimization for large files
          width: 1000,
          height: 1000,
          pngQuality: 70,
          webpQuality: 75,
        }
      : {
          // Standard optimization for smaller files
          width: 1200,
          height: 1200,
          pngQuality: 75,
          webpQuality: 80,
        };

    await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .png({ quality: config.pngQuality, compressionLevel: 9 })
      .toFile(outputPath + ".temp");

    await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: config.webpQuality })
      .toFile(webpOutputPath);
  }

  // Replace original PNG with optimized version
  await fs.rename(outputPath + ".temp", outputPath);

  // Log optimization results
  const optimizedStats = await fs.stat(outputPath);
  const webpStats = await fs.stat(webpOutputPath);
  const reduction = (
    ((inputSize - optimizedStats.size) / inputSize) *
    100
  ).toFixed(1);
  const webpReduction = (
    ((inputSize - webpStats.size) / inputSize) *
    100
  ).toFixed(1);

  console.log(`  Original size: ${(inputSize / 1024).toFixed(1)}KB`);
  console.log(
    `  Optimized PNG: ${(optimizedStats.size / 1024).toFixed(
      1
    )}KB (${reduction}% reduction)`
  );
  console.log(
    `  WebP version: ${(webpStats.size / 1024).toFixed(
      1
    )}KB (${webpReduction}% reduction)`
  );
}

async function processDirectory(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.name.toLowerCase().endsWith(".png")) {
      console.log(`\nOptimizing: ${fullPath}`);
      try {
        await optimizeImage(fullPath);
        console.log(`✓ Optimization complete`);
      } catch (error) {
        console.error(`Error optimizing ${fullPath}:`, error);
      }
    }
  }
}

// Start optimization
const publicImagesDir = path.join(__dirname, "../public/images");
processDirectory(publicImagesDir)
  .then(() => console.log("\nImage optimization complete!"))
  .catch(console.error);
