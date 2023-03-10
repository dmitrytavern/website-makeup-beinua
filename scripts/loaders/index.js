const path = require("path");
const glob = require("glob");

const log = glob.globSync(path.resolve(path.join("src/img", "/**/*.*")), {}, function (err, files) {
  for (let file of files) {
    createPublicRoute(file);
    moveImage(file);
  }
});

console.log(log);
