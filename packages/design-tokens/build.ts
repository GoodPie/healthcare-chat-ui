import path from 'path';
import * as fs from "node:fs";


// Get all source files in the src directory
const srcFiles = fs.readdirSync(path.join(__dirname, 'src')).filter((file: string) => file.endsWith('.css'));

// Copy all the source files to the dist directory for now
// We will later add a build step to process these files
let combined = "";

srcFiles.forEach((file: string) => {
  const srcPath = path.join(__dirname, 'src', file);
  const destPath = path.join(__dirname, 'dist', file);

  // Ensure the dist directory exists
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  // Copy the file
  fs.copyFileSync(srcPath, destPath);

  // Append the file content to the combined string
  const fileContent = fs.readFileSync(srcPath, 'utf-8');
  combined += fileContent;
});

// Write the combined content to a single file
const combinedPath = path.join(__dirname, 'dist', 'index.css');
fs.writeFileSync(combinedPath, combined);


