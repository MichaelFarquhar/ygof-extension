const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const packageJson = require("./package.json");

const version = packageJson.version; // Get version from package.json
const distPath = path.join(__dirname, "dist");
const output = fs.createWriteStream(path.join(__dirname, `ygof-${version}.zip`));
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  console.log(`ygof-${version}.zip created successfully. Total size: ${archive.pointer()} bytes`);
});

archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(distPath, false);
archive.finalize();
