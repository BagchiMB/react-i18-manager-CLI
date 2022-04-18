const fs = require("fs")

const initializingReport = (reportPath, baseLang) => {
  if (fs.existsSync(reportPath)) {
    // If file exists removing the directory
    fs.rmdirSync(reportPath, { recursive: true, force: true })
  }

  // Creating new Directory
  fs.mkdirSync(reportPath)
  // Creating Readme.txt
  fs.writeFileSync(
    `${reportPath}/readme.txt`,
    `Welcome to your translation man report\n\nBase Language selected: ${baseLang}\n\n1) <lang>.json files (in this directory) will contain keys present in your selected base language but not in <lang>.json file\n2) <lang>-extra-strings.json file (in this directory) will contain keys present in your <lang>.json but not in your base language file\n\nNOTE: If any language's json files are not present that means that the language is in sync with base language completely, don't panic :)\n\nEnjoy`
  )
}
module.exports = initializingReport
