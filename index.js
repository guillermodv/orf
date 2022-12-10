
import { mkdir, readdir } from 'fs';
import { join } from 'node:path';


// async function readThisFile(filePath) {
//     try {
//       const data = await readFile(filePath);
//       console.log(data.toString());
//     } catch (error) {
//       console.error(`Got an error trying to read the file: ${error.message}`);
//    }
//   }



const deepReadDir = async (dirPath) => await Promise.all(
  (await readdir(dirPath, {withFileTypes: true})).map(async (dirent) => {
    const path = join(dirPath, dirent.name)
    return dirent.isDirectory() ? await deepReadDir(path) : path
  }),
)

async function readDirectory(filePath) {
   await readdir(filePath, function (err, files) {
        //handling error
        if (err) {
            return console.error('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        // files.forEach( file => {
        //     // Do whatever you want to do with the file
        //     console.log(file); 
        // });
});
return files;
}

console.log("start")

let directories = ['pdf', 'mp3', 'img', 'iso', 'cbr']

directories.map( directoryName => {
    mkdir(directoryName, { recursive: true }, (err) => {
        if (err)  console.error(`cant create a ${directoryName} directory`);
      });
    }
)

console.log("tuki tuki", deepReadDir('.'));
console.log("finish")