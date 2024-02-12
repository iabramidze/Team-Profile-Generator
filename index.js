const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

let teamArray = [];

// Ask for manager's details
let promptManager = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Manager's name:",
      },
      {
        name: "id",
        type: "input",
        message: "Manager's ID:",
      },
      {
        name: "email",
        type: "input",
        message: "Manager's email:",
      },
      {
        name: "officeNumber",
        type: "input",
        message: "Manager's office number:",
      },
    ])
    .then((input) => {
      // add Manager object to the teamArray
      const managerObj = new Manager(
        input.name,
        input.id,
        input.email,
        input.officeNumber
      );
      teamArray.push(managerObj);

      promptMenu();
    });
}

// Ask for engineer's details
let promptEngineer = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Engineer's name:",
      },
      {
        name: "id",
        type: "input",
        message: "Engineer's ID:",
      },
      {
        name: "email",
        type: "input",
        message: "Engineer's email:",
      },
      {
        name: "github",
        type: "input",
        message: "Engineer's GitHub username:",
      },
    ])
    .then((input) => {
      // Add Engineer object to the teamArray
      const engineerObj = new Engineer(
        input.name,
        input.id,
        input.email,
        input.github
      );
      teamArray.push(engineerObj);

      promptMenu();
    });
}

// Ask for intern's details
let promptIntern = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Intern's name:",
      },
      {
        name: "id",
        type: "input",
        message: "Intern's ID:",
      },
      {
        name: "email",
        type: "input",
        message: "Intern's email:",
      },
      {
        name: "school",
        type: "input",
        message: "Intern's school:",
      },
    ])
    .then((input) => {
      // Add Intern object to the teamArray
      const internObj = new Intern(
        input.name,
        input.id,
        input.email,
        input.school
      );
      teamArray.push(internObj);

      promptMenu();
    });
}

// Prompt user with menu options
let promptMenu = () => {
  inquirer
    .prompt([
      {
        name: "menu",
        type: "list",
        message: "Choose one of the options:",
        choices: ["Add an engineer", "Add an intern", "Finish building the team"],
      },
    ])
    .then((input) => {
      // Call the function based on user's choice, then generate the file
      switch (input.menu) {
        case "Add an engineer":
          promptEngineer();
          break;
        case "Add an intern":
          promptIntern();
          break;
        case "Finish building the team":
          generateHTML();
          break;
        default:
          console.error('Something went wrong with the menu');
          break;
      }
    });
}

// Generate HTML file
let generateHTML = () => {
    const generatedHtml = render(teamArray);
    // Check if the output dir exists, create one if it doesn't
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    // Write the file
    fs.writeFileSync(outputPath, generatedHtml);
    console.log(`Team HTML file is generated at ${outputPath}`);
  }
  
  promptManager();