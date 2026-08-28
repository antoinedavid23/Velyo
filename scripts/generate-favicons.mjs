import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const source = path.join(projectRoot, "public", "images", "brand", "velyo-mark.svg");

const png256 = await sharp(source).resize(256, 256).png().toBuffer();
const appleIcon = await sharp(source).resize(180, 180).png().toBuffer();

const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(0, 6);
header.writeUInt8(0, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png256.length, 14);
header.writeUInt32LE(header.length, 18);

await Promise.all([
  writeFile(path.join(projectRoot, "app", "favicon.ico"), Buffer.concat([header, png256])),
  writeFile(path.join(projectRoot, "app", "apple-icon.png"), appleIcon),
]);

console.log("Generated Velyo favicon.ico and apple-icon.png");
