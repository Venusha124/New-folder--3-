/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');

async function convertHeicToJpg(inputDir, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir);
  for (const file of files) {
    if (file.toLowerCase().endsWith('.heic')) {
      const inputPath = path.join(inputDir, file);
      const outputFilename = file.replace(/\.heic$/i, '.jpg');
      const outputPath = path.join(outputDir, outputFilename);
      
      console.log(`Converting ${file}...`);
      try {
        const inputBuffer = fs.readFileSync(inputPath);
        const outputBuffer = await heicConvert({
          buffer: inputBuffer, // the HEIC file buffer
          format: 'JPEG',      // output format
          quality: 0.8         // the jpeg compression quality, between 0 and 1
        });
        
        fs.writeFileSync(outputPath, outputBuffer);
        console.log(`Successfully converted to ${outputFilename}`);
      } catch (err) {
        console.error(`Failed to convert ${file}:`, err);
      }
    }
  }
}

const inputDirectory = path.join(__dirname, 'src', 'Taprovia Global Exports Pvt Ltd');
const outputDirectory = path.join(__dirname, 'public', 'gallery');

convertHeicToJpg(inputDirectory, outputDirectory).then(() => {
  console.log('Done!');
});
