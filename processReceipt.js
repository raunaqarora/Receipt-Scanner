'use strict';

const tesseract = require('node-tesseract');
const fs = require('fs');
const rimraf = require('rimraf');

module.exports = function(filePath,res){
  let files = fs.readdirSync('/tmp/splitImage');
  let processed = 0;
  for(let i=0;i<files.length;i++){
    let path = files[i];
    let split = path.split('-');
    files[i] = {
      path: path,
      y: Number(split[1]),
      x: Number(split[2])
    }
    tesseract.process('/tmp/splitImage/'+files[i].path,function(err,text){
      if(err){
        console.error('Tesseract Error:')
        console.error(err);
      } else{
        files[i].text = text;
      }
      processed++;

      if(processed === files.length){
        console.log('done processing');
        console.log(files);

        fs.unlinkSync(filePath); //Delete file
        rimraf('/tmp/splitImage', function () { console.log('done'); }); //Delete temp dir
        res.send('Done')
      }
    });
  }
}