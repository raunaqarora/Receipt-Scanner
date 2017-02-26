'use strict';

const tesseract = require('node-tesseract');
const fs = require('fs');
const rimraf = require('rimraf');

module.exports = function(filePath,res){
  let files = fs.readdirSync('/tmp/splitImage');
  console.log(files.length+' files');
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
        if(text)
          text = text.trim();
        files[i].text = text;
      }
      processed++;

      if(processed === files.length){
        console.log('done processing');

        fs.unlinkSync(filePath); //Delete file
        rimraf('/tmp/splitImage', function () { console.log('done'); }); //Delete temp dir

        let structure = identifyGroups(files);

        res.send('Done')
      }
    });
  }
  if(!files.length){
    res.send('Error detecting text fields');
  }
}

function identifyGroups(files){
  let structure = {
    total: null,
    subtotal: null,
    items: [] //{name,price}
  }

  const maxDistance = 25;
  let rows = [];
  while(files.length){
    let file = files[0];
    let found = false;
    for(let row of rows){
      if(Math.abs(row[0].y-file.y) <= 25){
        row.push(file);
        files.splice(0,1);
        found=true;
      }
    }
    if(!found){
      rows.push([file]);
      files.splice(0,1);
    }
  }

  for(let row of rows){
    console.log("Row Start:");
    console.log(row);
    console.log();
  }

  return structure;
}