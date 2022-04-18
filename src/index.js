#!/usr/bin/env node

const program = require("commander")
program.exitOverride()

const generateReport = require("../lib/generate-report")
// console.log(greet.jsonsInDir.then(()=>'hoje hoaa'));
// greet.jsonsInDir.then((val)=>console.log(val.filter(file => path.extname(file) === '.json')))
// console.log('aa');
program.showHelpAfterError()

// program
//   .command("")
//   .description("reading output from ./locales")
//   .action(function () {
//     console.log("dsa");
//   });

program
  .command("generate-report")
  .alias("gr")
  .description("generate the string report")
  .argument("[path]", "path to the translations", "locales")
  .argument("[baseLanguage]", "base language", "en")
  .action((path, baseLanguage) => {
    generateReport(path, baseLanguage)
  })

try {
  program.parse(process.argv)
} catch (err) {
  process.exit()
}
