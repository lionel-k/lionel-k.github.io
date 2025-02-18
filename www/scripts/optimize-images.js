const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

async function optimizeImage(inputPath) {
  const outputPath = inputPath;
  const imageInfo = await sharp(inputPath).metadata();

  // Different optimization strategies based on image type
  if (inputPath.includes("/cover.png")) {
    // Cover images: maintain good quality but reduce size
    await sharp(inputPath)
      .resize(800, 800, { fit: "inside", withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(outputPath + ".temp");
  } else if (inputPath.includes("/reviews/")) {
    // Review images: can be more compressed
    await sharp(inputPath)
      .resize(600, 600, { fit: "inside", withoutEnlargement: true })
      .png({ quality: 70, compressionLevel: 9 })
      .toFile(outputPath + ".temp");
  } else {
    // Interior book images: balance quality and size
    await sharp(inputPath)
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .png({ quality: 75, compressionLevel: 9 })
      .toFile(outputPath + ".temp");
  }

  // Replace original with optimized version
  await fs.rename(outputPath + ".temp", outputPath);
}

async function processDirectory(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.name.toLowerCase().endsWith(".png")) {
      console.log(`Optimizing: ${fullPath}`);
      try {
        await optimizeImage(fullPath);
        console.log(`✓ Optimized: ${fullPath}`);
      } catch (error) {
        console.error(`Error optimizing ${fullPath}:`, error);
      }
    }
  }
}

// Start optimization
const publicImagesDir = path.join(__dirname, "../public/images");
processDirectory(publicImagesDir)
  .then(() => console.log("Image optimization complete!"))
  .catch(console.error);
