const fs = require('fs');
const inquirer = require('inquirer')
inquirer.prompt(
    [
        {
            type: "input",
            message: "What is your project name?",
            name: "name"
        },
        {
            type: "input",
            message: "Describe your project.",
            name: "descrip"
        },
        {
            type: "input",
            message: "Enter Installation Instructions.",
            name: "install"
        },
        {
            type: "input",
            message: "Enter Usage Information.",
            name: "use"
        },
        {
            type: "input",
            message: "Test Instruction.",
            name: "test"
        },
        {
            type: "list",
            message: "Any licenses?",
            name: "license",
            choices: ["MIT", "ISC", "none"]
        },
        {
            type: "input",
            message: "Contributors. Github profile names and separate by comma if more than one.",
            name: "contr"
        },
        {
            type: "input",
            message: "Add Email.",
            name: "Email"
        },
    ]
).then((res => {
  const title = res.name
  const descr = res.descrip
  const lic = res.license
  const install = res.install
  const usage = res.use
  const testInst = res.test
  const contArray = res.contr
  const email = res.Email
  const newArr = contArray.split(", ")
  const map = newArr.map(info => {
    return `https://github.com/${info} <br/>`
  }).join("") 
  const readMe = `
   # ${title} 
   ## Licenses:
   [![License: ${lic}](https://img.shields.io/badge/License-${lic}-blue.svg)](${lic})
   ## Description:
   ${descr}
   ## Table of Contents:
   -[Description](#description)<br />
   -[Installation](#installation)<br />
   -[Licenses](#licenses)<br />
   -[Usage](#usage-info)<br />
   -[Tests](#tests)<br />
   -[Contributors](#contributors)<br />
   -[Email](#email)<br />
   ## Installation:
   ${install}
   ## Usage Info:
   ${usage}
   ## Tests:
   ${testInst}
   ## Contributors:
   ${map}
   ## Email:
   ${email}
  `
    console.log(title, descr, lic, JSON.stringify(newArr))
    fs.writeFile('README.md', readMe,  {
        encoding: "utf8",
        flag: "w",
        mode: 0o666
      },
      (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync("README.md", "utf8"));
        }} )
  
})

)
