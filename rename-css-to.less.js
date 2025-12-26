// rename-css-to-less.js
const fs = require('fs');
const path = require('path');

function renameCssToLess(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      renameCssToLess(fullPath);
    } else if (stats.isFile() && fullPath.endsWith('.css')) {
      const newFullPath = fullPath.replace(/\.css$/, '.less');
      fs.renameSync(fullPath, newFullPath);
      console.log(`Renamed: ${fullPath} -> ${newFullPath}`);
    }
  });
}


renameCssToLess('./src');
