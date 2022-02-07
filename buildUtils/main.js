var fs = require('fs');
var path = require('path');


function GetFilePaths(path){
    const entries = fs.readdirSync(path, { withFileTypes: true });

    // Get files within the current directory and add a path key to the file objects
    const files = entries
        .filter(file => !file.isDirectory())
        .map(file => ({ ...file, path: path + file.name }));
	
    // Get folders within the current directory
    const folders = entries.filter(folder => folder.isDirectory());

    for (const folder of folders)
        /*
          Add the found files within the subdirectory to the files array by calling the
          current function itself
        */
        files.push(... GetFilePaths(`${path}${folder.name}/`));

    return files;
}

var filePaths =  GetFilePaths("../image/crafting/");
console.log(filePaths);