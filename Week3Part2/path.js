const path = require("node:path");

console.log(__filename);
console.log(__dirname);

console.log(path.basename(__filename));
console.log(path.basename(__dirname));

console.log(path.extname(__filename));
console.log(path.extname(__dirname));

console.log(path.parse(__filename));
console.log(path.parse(__dirname));

console.log(
  path.format({
    root: "E:\\",
    dir: "E:\\Courses\\Root\\BackEnd\\2_Elwan\\3_Node.js\\Week 3 Part 2\\Code",
    base: "index.js",
    ext: ".js",
    name: "index",
  })
);

console.log(path.isAbsolute(__filename));
console.log(path.isAbsolute(path.basename(__filename)));

console.log(path.join(__dirname, "text.js"));
console.log(path.resolve("text.js"));
console.log(path.resolve() == __dirname);