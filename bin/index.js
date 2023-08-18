#! /usr/bin/env node

let userResponse = '';

async function question(question) {
    return new Promise((resolve, reject) => {
        process.stdout.write(question)
        const stdin = process.openStdin()
        stdin.addListener("data", function(d) {
            resolve(d.toString().trim());
        });
       
    });
}

(async function main () {
    while (userResponse.toLowerCase() !== '\r\n') {
        userResponse = await question('Entity name: ');
        console.log(3, userResponse)
    }
})().then(() => {
    process.exit(0)
});
