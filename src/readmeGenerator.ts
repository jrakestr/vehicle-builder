// Include packages needed for this application
import inquirer from 'inquirer';
const fs = require('fs');
const path = require('path');
import generateMarkdown from './utils/generateMarkdown';

// Define proper question types
interface BaseQuestion {
    type: string;
    name: string;
    message: string;
}

interface InputQuestion extends BaseQuestion {
    type: 'input';
    validate?: (input: string) => boolean | string;
    default?: string;
}

interface ListQuestion extends BaseQuestion {
    type: 'list';
    choices: string[];
}

type Question = InputQuestion | ListQuestion;

// Array of questions for user input
const questions: Question[] = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter your project title:',
        validate: (input: string): boolean | string => input ? true : 'Project title cannot be empty.',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter your project description:',
        validate: (input: string): boolean | string => input ? true : 'Description cannot be empty.',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter installation instructions:',
        default: 'npm install',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter usage information:',
        default: 'Provide usage details here.',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Enter contribution guidelines:',
        default: 'Provide contribution guidelines here.',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter test instructions:',
        default: 'Provide test instructions here.',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'Apache 2.0', 'GPL v3', 'BSD 3-Clause', 'None'],
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
        validate: (input: string): boolean | string => input ? true : 'GitHub username cannot be empty.',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
        validate: (input: string): boolean | string => {
            // Simple email validation regex
            const pass = /\S+@\S+\.\S+/.test(input);
            if (pass) {
                return true;
            }
            return 'Please enter a valid email address.';
        },
    },
] as const;

// Function to write README file
function writeToFile(fileName: string, data: string) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

// Function to initialize app
function init() {
    inquirer.prompt(questions)
    .then((answers) => {
        const markdownContent = generateMarkdown(answers);
        writeToFile('README.md', markdownContent);
        console.log('✅ Successfully generated README.md');
    })
    .catch((error) => {
        console.error('❌ Error generating README:', error);
    });
}

// Function call to initialize app
init();