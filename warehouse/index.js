console.log("This is IXNAYs program. It will try to teach you what IXNAY would like to show you if he was here.")
console.log("~~~~~")

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is your name ? ", function(name) {
    console.log(`${name}`);
    rl.question("Where do you live ? ", function(country) {
        console.log(`${name}, is a citizen of ${country}`);
        rl.close();
    });
});

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});


// (function(){
//     console.log("Hello IXNAY")
//     setTimeout(arguments.callee, 300);
// })();