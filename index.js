const inquirer = require("inquirer");
const fs = require("fs");
const markDown = require("./utils/generateMarkdown");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);


const readMe = "";
var licenseImage = "";

// function writeToFile(fileName, data) {
//     writeFileAsync(fileName, data)
// }
//Question prompts for user- Array
function init() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is title of the application?"
        },
        {
            type: "input",
            name: "gitHubLink",
            message: "Please enter URL to where the project is deployed?"
        },
        {
            type: "input",
            name: "description",
            message: "Please provide a  brief description of your application."
        },
        {
            type: "input",
            name: "installation",
            message: "Please provide installation instructions?"
        },
        {
            type: "input",
            name: "usage",
            message: "Please provide instructions on how to use the application"
        },
        {
            type: "list",
            name: "isLicensed",
            message: "Does your project use a license?",
            choices: ["Yes", "No"]
        },
        {
            type: "list",
            name: "license",
            message: "Which license does your application use?.",
            choices: [
                "Apache License 2.0",
                "Boost Software License 1.0",
                "BSD 2-Clause 'Simplified' License",
                "BSD 3-Clause 'New' or 'Revised' License",
                "Creative Commons Zero v1.0 Universal",
                "Eclipse Public License 2.0",
                "GNU General Public License v3.0",
                "MIT License",
                "Mozilla Public License 2.0"
            ]
        },
        {
            type: "input",
            name: "tests",
            message: "Please provide testing instructions. ",
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub user name: "
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email address:",
            //regex for email validation ->https://stackoverflow.com/questions/4640583/what-are-these-javascript-syntax-called-a-za-z0-9-a-za-z0-9
            validate: answer => {
                if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(answer)) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
        }
    ]).then(function (answers) {
        licenseImage = licenseData(answers.license);
        return writeFileAsync("README.md", markDown(answers, licenseData(answers.license)));
        console.log("READMe successfully generated!");
    }).catch(function (err) {
        console.log(err);
    });
}

function licenseData(data) {
    let licenseImage;
    switch (data) {
        case "Apache License 2.0":
            licenseImage = "![License: MIT](https://img.shields.io/badge/License-Apache%202.0-blue.svg)";
            break;
        case "Boost Software License 1.0":
            licenseImage = "![License: MIT](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)";
            break;
        case "BSD 2-Clause 'Simplified' License":
            licenseImage = "![License: MIT](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)";
            break;
        case "BSD 3-Clause 'New' or 'Revised' License":
            licenseImage = "![License: MIT](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)";
            break;
        case "Creative Commons Zero v1.0 Universal":
            licenseImage = "![License: MIT](https://licensebuttons.net/l/zero/1.0/80x15.png)";
            break;
        case "Eclipse Public License 2.0":
            licenseImage = "![License: MIT](https://img.shields.io/badge/License-EPL%201.0-red.svg)";
            break;
        case "GNU General Public License v3.0":
            licenseImage = "![License: MIT](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)";
            break;
        case "MIT License":
            licenseImage = "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)";
            break;
        case "Mozilla Public License 2.0":
            licenseImage = "![License: MIT](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)";
            break;
        default:
            licenseImage = "![License: MIT](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)";
            break;
    }
    return licenseImage;
}


// function init() {
//     console.log("Hello! Welcome to README generator App");

//     return writeFileAsync("README.md", markDown(promptUser(), licenseImage));
//     // try {
//     //     let answers = promptUser();
//     //     const html = MarkDown(answers, licenseImage);
//     //     return writeFileAsync("README.md", html);
//     // } catch (err) {
//     //     console.log(err);
//     // }
// }
console.clear();
init();