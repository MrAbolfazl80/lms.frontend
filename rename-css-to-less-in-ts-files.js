// rename-css-to-less-and-update-styleurls.js
const fs = require('fs');
const path = require('path');

function renameCssToLess(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      renameCssToLess(fullPath); 
    } else if (stats.isFile()) {
      if (fullPath.endsWith('.css')) {
        const newFullPath = fullPath.replace(/\.css$/, '.less');
        fs.renameSync(fullPath, newFullPath);
        console.log(`Renamed: ${fullPath} -> ${newFullPath}`);
      }

      
      if (fullPath.endsWith('.ts')) {
        let content = fs.readFileSync(fullPath, 'utf-8');
        const updatedContent = content.replace(/(\.\/.*)\.css/g, '$1.less');
        if (content !== updatedContent) {
          fs.writeFileSync(fullPath, updatedContent, 'utf-8');
          console.log(`Updated styleUrls in: ${fullPath}`);
        }
      }
    }
  });
}


renameCssToLess('./src');
