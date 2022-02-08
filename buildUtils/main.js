const fs = require('fs');
const path = require('path');

const basePath = '../image/crafting/';

const namingRules = {
    sectionSplitChar: '_',
    removeChar: '-',
    expectedSectionCount: 3,
    createdAtIndex: 0,
    nameIndex: 1,
    suffixIndex: 2,
};

function GetFilePaths(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    // Get files within the current directory and add a path key to the file objects
    // const files = entries
    //     .filter(file => !file.isDirectory())
    //     .map(file => ({ ...file, path: path + file.name }));

    const files = entries
        .filter(entry => !entry.isDirectory())
        .map(file => parseFileEntry(directory, file));

    // Get folders within the current directory
    const folders = entries.filter(entry => entry.isDirectory());

    // Traverse subfolders recursively
    for (const folder of folders) {
        files.push(...GetFilePaths(`${directory}${folder.name}/`));
    }

    return files;
}

function parseFileEntry(directory, file) {
    return {
        meta: parseFileName(file.name),
        fileName: file.name,
        path: directory + file.name
    };
}

function parseFileName(fileName) {
    var split = fileName.split(namingRules.sectionSplitChar);
    if (split.length !== namingRules.expectedSectionCount) {
        throw `Filename section count invalid! Expected: ${namingRules.expectedSectionCount} | Actual: ${split.length}`;
    }

    var name = split[namingRules.nameIndex].replace(namingRules.removeChar, " ");

    return {
        createdAt: split[namingRules.createdAtIndex],
        name: name
    }
}

var filePaths = GetFilePaths(basePath);
console.log(filePaths);