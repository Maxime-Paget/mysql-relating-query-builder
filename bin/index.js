#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

async function question(question) {
    return new Promise((resolve, reject) => {
        process.stdout.write(question)
        const stdin = process.openStdin()
        stdin.addListener("data", function(d) {
            resolve(d.toString().trim());
        });
       
    });
}

/**
 * 
 * @param {string} filePath 
 * @param {String} data 
 */
async function createFile(filePath, data) {
    const folders = filePath.split('/');
    let currentFolder = process.cwd();
    for (const folder of folders) {
        if(folder.includes('.ts')) {
            fs.writeFileSync(path.join(currentFolder, folder), data)
        } else if (!fs.existsSync(path.join(currentFolder, folder))) {
            fs.mkdirSync(path.join(currentFolder, folder)) 
        }
        currentFolder = path.join(currentFolder, folder);
    }
   
}

(async function main () {
    let title = await question('Entity name: ');
    while(/[^A-Za-z]/.test(title)) {
        console.error("\x1b[41mNo special characters or numbers are allowed\x1b[0m");
        title = await question('Entity name: ');
    }
    const filePath = `/src/models/${title.split('').join('')}.ts`;
    if (fs.existsSync(path.join(process.cwd(), filePath))) {
        let property = await question ('This entity already exist you can add it property, give a property name')

        while(/[^A-Za-z]/.test(property)) {
            console.error("\x1b[41mNo special characters or numbers are allowed\x1b[0m");
            property = await question('Entity name: ');
        }

        while (property.toLowerCase() !== '\r\n') {

        }
    } else {
        let property = await question('Give a property name: ')
        while(/[^A-Za-z]/.test(property)) {
            console.error("\x1b[41mNo special characters or numbers are allowed\x1b[0m");
            property = await question('Give a property name: ');
        }

    }

    const templateBuffer = await fs.promises.readFile(path.join(process.cwd(), '/bin/template/templateORM.ts'))
    const template = templateBuffer.toString();

    let newFileData = template.replace('ENTITY_NAME', title);

    createFile(filePath, newFileData);
    
})().then(() => {
    process.exit(0)
});
