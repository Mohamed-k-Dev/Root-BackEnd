const fs = require("node:fs");
const path = require("node:path");
const { createGzip } = require("node:zlib");
const gzip = createGzip();

const filePath = path.resolve("data/bigText.txt");
// const filePath = path.resolve("data/text.txt");
const fileDest = path.resolve("dest/text.txt");
const fileDestZip = path.resolve("dest/text.txt.gz");

// read file using stream
const readStreamFile = fs.createReadStream(filePath, {
  encoding: "utf-8",
  highWaterMark: 100,
  autoClose: true,
  emitClose: true,
});

const writeStreamFile = fs.createWriteStream(fileDest, { encoding: "utf-8" });
const writeStreamFileZip = fs.createWriteStream(fileDestZip, {
  encoding: "utf-8",
});

// readStreamFile.on("open", () => {
//   console.log("file is open");
//   console.log("**********");
// });
// readStreamFile.on("data", (chunk) => {
//   console.log("chunk : ", chunk);
//   writeStreamFile.write(chunk);
// });
// readStreamFile.on("end", () => {
//   console.log("**********");
//   console.log("end of file");
// });

readStreamFile.pipe(writeStreamFile);
readStreamFile.pipe(gzip).pipe(writeStreamFileZip);
