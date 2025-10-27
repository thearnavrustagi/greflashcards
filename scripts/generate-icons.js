const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create a simple SVG icon
const svgIcon = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#4F46E5" rx="80"/>
  <text x="256" y="256" font-family="Arial, sans-serif" font-size="280" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">G</text>
</svg>
`;

async function generateIcons() {
  const outputDir = path.join(__dirname, '../public');
  
  // Generate 192x192 icon
  await sharp(Buffer.from(svgIcon))
    .resize(192, 192)
    .png()
    .toFile(path.join(outputDir, 'icon-192x192.png'));
  
  // Generate 512x512 icon
  await sharp(Buffer.from(svgIcon))
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'icon-512x512.png'));
  
  console.log('PWA icons generated successfully!');
}

generateIcons().catch(console.error);

