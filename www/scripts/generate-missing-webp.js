const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function generateMissingWebp(directory, force = false) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      // Recursively process subdirectories
      await generateMissingWebp(fullPath, force);
    } else if (entry.name.toLowerCase().endsWith(".png")) {
      const webpPath = fullPath.replace(/\.png$/i, ".webp");
      let shouldGenerate = true;

      try {
        // Check if WebP version already exists
        await fs.access(webpPath);
        console.log(`WebP exists for: ${fullPath}`);

        if (!force) {
          const answer = await question(
            "Do you want to override this WebP file? (y/N): "
          );
          shouldGenerate = answer.toLowerCase() === "y";
        }
      } catch {
        // WebP doesn't exist, we'll generate it
        console.log(`No WebP found for: ${fullPath}`);
      }

      if (shouldGenerate) {
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
            `  WebP version: ${(webpStats.size / 1024).toFixed(1)}KB (${reduction}% reduction)`
          );
        } catch (error) {
          console.error(`  Error processing ${fullPath}:`, error.message);
        }
      } else {
        console.log(`  Skipping WebP generation for: ${fullPath}`);
      }
    }
  }
}

// Start the process
const publicImagesDir = path.join(__dirname, "../public/images");
console.log("Checking for WebP versions...");

generateMissingWebp(publicImagesDir, process.argv.includes("--force"))
  .then(() => {
    console.log("\nWebP generation complete!");
    rl.close();
  })
  .catch((error) => {
    console.error(error);
    rl.close();
  });
