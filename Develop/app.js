const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var objectArray = [];

inquirer.prompt ([
    {
        type: "input",
        name: "managerName",
        message: "What is your manager's name?"
    },
    {
        type: "input",
        name: "managerID",
        message: "What is your manager's ID?"
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is your manager's email"
    },
    {
        type: "input",
        name: "managerOffice",
        message: "What is your manager's office number?",
    },
    {
        type: "list",
        name: "employeeType",
        message: "What type of team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "I don't have anymore team members to add"
        ]
    }
]).then(function (responses) {
    const newManager = new Manager(responses.managerName, responses.managerID, responses.managerEmail, responses.managerOffice);
    console.log(newManager);
    objectArray.push(newManager);
        if (responses.employeeType === "Engineer") {
           ifEngineer();
        }
        else if (responses.employeeType === "Intern") {
            ifIntern(); 
        }
        else if (responses.employeeType === "I don't have anymore team members to add") {
            console.log("Thank you for adding your employees!");
            makeHTML();
            
            
        }
          
    });

    //end of primary inquirer

    function ifEngineer () {
            console.log("You have chosen Engineer");
            inquirer.prompt ([
                {
                    type: "input",
                    name: "engineerName",
                    message: "What is your engineer's name?"
                },
                {
                    type: "input",
                    name: "engineerID",
                    message: "What is your engineer's ID?"
                },
                {
                    type: "input",
                    name: "engineerEmail",
                    message: "What is your engineer's email?"
                },
                {
                    type: "input",
                    name: "github",
                    message: "What is your engineer's GitHub username?"
                },
                {
                    type: "list",
                    name: "employeeType",
                    message: "What type of team member would you like to add?",
                    choices: [
                        "Engineer",
                        "Intern",
                        "I don't have anymore team members to add"
                    ]
                }

            ]).then(function (responses) {
                const newEngineer = new Engineer(responses.engineerName, responses.engineerID, responses.engineerEmail, responses.github);
                console.log(newEngineer);
                objectArray.push(newEngineer);
                if (responses.employeeType === "Engineer") {
                    ifEngineer();
                }
                else if (responses.employeeType === "Intern") {
                    ifIntern();
                }
                else if (responses.employeeType === "I don't have anymore team members to add") {
                    console.log("Thank you for adding your employees!");
                    makeHTML(); 
                }
        });
    }
    
    function ifIntern() {
        console.log("You have chosen Intern");
        inquirer.prompt ([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?"
            },
            {
                type: "input",
                name: "internID",
                message: "What is your interns's ID?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email?"
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is your intern's school?"
            },
            {
                type: "list",
                name: "employeeType",
                message: "What type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't have anymore team members to add"
                ]
            }

        ]).then(function (responses) {
            console.log(responses.internEmail)
            const newIntern = new Intern(responses.internName, responses.internID, responses.internEmail, responses.internSchool);
            console.log(newIntern);
            objectArray.push(newIntern);
            if (responses.employeeType === "Engineer") {
                ifEngineer();
            }
            else if (responses.employeeType === "Intern") {
                ifIntern();
            }
            else if (responses.employeeType === "I don't have anymore team members to add") {
                console.log("Thank you for adding your employees!");
                makeHTML();
                    
            }
        });
    }

function makeHTML() {
    const html = render(objectArray)
        console.log("why no work?")
                

        fs.writeFile(outputPath, html, function(err) {
        if (err) throw err
        });
}