
import { mkdir, readdir } from 'fs';
import { join } from 'node:path';

const deepReadDir = async (dirPath) => await Promise.all(
  (await readdir(dirPath, {withFileTypes: true})).map(async (dirent) => {
    const path = join(dirPath, dirent.name)
    return dirent.isDirectory() ? await deepReadDir(path) : path
  }),
)

console.log("start")
let directories = ['pdf', 'mp3', 'img', 'iso', 'cbr']

directories.map( directoryName => {
    mkdir(directoryName, { recursive: true }, (err) => {
        if (err)  console.error(`cant create a ${directoryName} directory`);
      });
    }
)

await readdir('.', function (err, files) {
  if (err) {
      return console.error('Unable to scan directory: ' + err);
  } 
  files.forEach( file => {
      console.log(file); 
  });
});

console.log("finish")