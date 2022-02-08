const fs = require('fs');
const path = require('path');

const basePath = '../image/crafting/';
const codeFilePath = '../js/craftingProjects.js';

const namingRules = {
    sectionSplitChar: '_',
    removeChar: '/-/g',
    expectedSectionCount: 3,
    createdAtIndex: 0,
    nameIndex: 1,
    suffixIndex: 2,
};

function GetFilePaths(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

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
    var meta = parseFileName(file.name);
    var cleanedDirectory = directory.substring(1);

    return {
        name: meta.name,
        createdAt: meta.createdAt,
        fileName: file.name,
        path: cleanedDirectory + file.name,
        category: path.basename(directory)
    };
}

function parseFileName(fileName) {
    var split = fileName.split(namingRules.sectionSplitChar);
    if (split.length !== namingRules.expectedSectionCount) {
        throw `Filename section count invalid! Expected: ${namingRules.expectedSectionCount} | Actual: ${split.length}`;
    }

    var name = split[namingRules.nameIndex].replace(/-/g, " ");
    var rawCreatedAt = split[namingRules.createdAtIndex];
    var createdAt = [rawCreatedAt.substr(0, 4), rawCreatedAt.substr(4, 2), rawCreatedAt.substr(6)].join('-');

    return {
        name: name,
        createdAt: createdAt
    }
}

function groupFileEntriesByCategory(fileEntries) {

    var grouping = fileEntries.reduce((acc, value) => {
        acc[value.category] = acc[value.category] || [];
        acc[value.category].push(value);
        return acc;
    }, {});

    var cleanedGrouping = [];
    for (const [key, value] of Object.entries(grouping)) {
        cleanedGrouping.push({
            category: key,
            items: value
        });
    }

    return cleanedGrouping;
}

function aggregateFilesByName(groupedByCategory) {
    var aggregated = [];
    for (const category of groupedByCategory) {
        // Find unique Names, those define projects
        var uniqueNames = category.items
            .map(e => e.name)
            .filter((val, ind, arr) => arr.indexOf(val) === ind);

        // Aggregate all files belonging to a project
        var aggregatedCategory = { ...category, items: [] };
        for (const name of uniqueNames) {
            var images = category.items.filter(val => val.name === name).map(val => val.path);

            var uniqueEntry = category.items.find(val => val.name === name);
            uniqueEntry = { ...uniqueEntry, images: images };

            aggregatedCategory.items.push(uniqueEntry);
        }

        aggregated.push(aggregatedCategory);
    }

    return aggregated;
}

function generateCode(json) {
    var code = `const craftingProjectsJson = '${json}';`;
    console.log(`Writing to ${codeFilePath}`);
    fs.writeFileSync(codeFilePath, code);
}

console.log("Collecting...");
var filePaths = GetFilePaths(basePath);
var grouped = groupFileEntriesByCategory(filePaths);
var aggregated = aggregateFilesByName(grouped);
var json = JSON.stringify(aggregated);

console.log("JSON Result");
console.log("------------------------------------------");
console.log(json);
console.log("------------------------------------------");

console.log("Generating code...");
generateCode(json);

console.log("\nDONE!");