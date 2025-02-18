const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

async function generateMissingWebp(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      // Recursively process subdirectories
      await generateMissingWebp(fullPath);
    } else if (entry.name.toLowerCase().endsWith(".png")) {
      const webpPath = fullPath.replace(/\.png$/i, ".webp");

      try {
        // Check if WebP version already exists
        await fs.access(webpPath);
        console.log(`✓ WebP exists for: ${fullPath}`);
      } catch {
        // WebP doesn't exist, generate it
        console.log(`Generating WebP for: ${fullPath}`);

        try {
          const imageInfo = await sharp(fullPath).metadata();

          // Determine optimization settings based on image path
          let quality = 80; // default quality

          if (fullPath.includes("/cover.png")) {
            quality = 85; // Higher quality for cover images
          } else if (fullPath.includes("/reviews/")) {
            quality = 75; // Lower quality acceptable for review screenshots
          }

          await sharp(fullPath).webp({ quality }).toFile(webpPath);

          // Get file sizes for comparison
          const pngStats = await fs.stat(fullPath);
          const webpStats = await fs.stat(webpPath);
          const reduction = (
            ((pngStats.size - webpStats.size) / pngStats.size) *
            100
          ).toFixed(1);

          console.log(`  Original PNG: ${(pngStats.size / 1024).toFixed(1)}KB`);
          console.log(
            `  WebP version: ${(webpStats.size / 1024).toFixed(
              1
            )}KB (${reduction}% reduction)`
          );
        } catch (error) {
          console.error(`  Error processing ${fullPath}:`, error.message);
        }
      }
    }
  }
}

// Start the process
const publicImagesDir = path.join(__dirname, "../public/images");
console.log("Checking for missing WebP versions...");

generateMissingWebp(publicImagesDir)
  .then(() => console.log("\nWebP generation complete!"))
  .catch(console.error);
