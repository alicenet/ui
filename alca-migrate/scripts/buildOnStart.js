const { buildBytecodeFiles } = require("./buildBytecodeFiles");
const { buildAbiAndContractNameFiles } = require("./buildAbiAndContractNameFiles");
const sleeper = (amt) => new Promise((res) => setTimeout(res, amt));

main();

async function main() {
    console.log("\x1b[1;35m=====================================");
    console.log("========= TRANSPILER  START =========");
    console.log("=====================================\x1b[0m");

    console.log("\n\x1b[1;36mPreparing to transpile ABI and Contract Names to ES6 formats for src/config...\x1b[0m\n");
    await sleeper(1500);

    console.log("Transpiling ABI and Contract names to ES6 Syntax...\n");
    await buildAbiAndContractNameFiles();

    await sleeper(1500);
    console.log("Transpiling Bytecodes to ES6 Syntax...\n");
    await buildBytecodeFiles();

    console.log("\x1b[1;35m=====================================");
    console.log("========== TRANSPILER  END ==========");
    console.log("=====================================\x1b[0m\n");

    if (process.argv[2] === "startRun") {
        await sleeper(1500);
        console.log("Resuming start up...\n");
        await sleeper(1250);
    }
}
