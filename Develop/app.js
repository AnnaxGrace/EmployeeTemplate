const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// const html = require("./lib/htmlRenderer");

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
                // var userName = "github.com/" + responses.github
                if (responses.employeeType === "Engineer") {
                    // var newEngineer = new Engineer(responses.engineerName, responses.engineerID, responses.engineerEmail, responses.github)
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
    // render(objectArray);
    const html = render(objectArray)
        console.log("why no work?")
                

        fs.writeFile(outputPath, html, function(err) {
        if (err) throw err
        });
}
// render(objectArray);

// var newHTML = render.data
// console.log(render.data);

// fs.writeFile(outputPath, newHTML, function(err) {
//     if (err) throw err;
// });

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
