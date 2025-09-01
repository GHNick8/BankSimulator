const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist', 'ng-bank-sim');
const indexFile = path.join(distPath, 'index.html');
const errorFile = path.join(distPath, '404.html');

fs.copyFile(indexFile, errorFile, (err) => {
  if (err) {
    console.error('Error copying index.html to 404.html:', err);
  } else {
    console.log('Copied index.html to 404.html');
  }
});
