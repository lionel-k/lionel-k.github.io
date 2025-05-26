const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");
const readline = require("readline");

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Promisify the question method
const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

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
        console.log(`WebP exists for: ${fullPath}`);

        // Get file modification times
        const [pngStats, webpStats] = await Promise.all([
          fs.stat(fullPath),
          fs.stat(webpPath),
        ]);

        // If PNG is newer than WebP, suggest regeneration
        if (pngStats.mtime > webpStats.mtime) {
          console.log("PNG file is newer than WebP version.");
          const answer = await question(
            "Do you want to regenerate this WebP file? (y/n): "
          );

          if (answer.toLowerCase() === "y") {
            await generateWebP(fullPath, webpPath);
          } else {
            console.log("Skipping regeneration.");
          }
        }
      } catch {
        // WebP doesn't exist, generate it
        console.log(`Generating WebP for: ${fullPath}`);
        await generateWebP(fullPath, webpPath);
      }
    }
  }
}

async function generateWebP(pngPath, webpPath) {
  try {
    // Determine optimization settings based on image path
    let quality = 80; // default quality

    if (pngPath.includes("/cover.png")) {
      quality = 85; // Higher quality for cover images
    } else if (pngPath.includes("/reviews/")) {
      quality = 75; // Lower quality acceptable for review screenshots
    }

    await sharp(pngPath).webp({ quality }).toFile(webpPath);

    // Get file sizes for comparison
    const pngStats = await fs.stat(pngPath);
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
    console.error(`  Error processing ${pngPath}:`, error.message);
  }
}

// Start the process
const publicImagesDir = path.join(__dirname, "../public/images");
console.log("Checking for missing WebP versions...");

generateMissingWebp(publicImagesDir)
  .then(() => {
    console.log("\nWebP generation complete!");
    rl.close();
  })
  .catch((error) => {
    console.error(error);
    rl.close();
  });
