var fs = require('fs');

fs. readdir('.', function(err, items) {
  for (let path of items) {
    if (path !== "rename.js") {
      var idPath = path.match(/\d+---\d+\.\w+$/)[0].replace('---','-');
      fs.renameSync(path, idPath)
    }
  }
});