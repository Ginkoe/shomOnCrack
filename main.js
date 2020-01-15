const inquirer = require('inquirer');
const fetcher = require('./shom_fetcher');
const csvgen = require('./csv_generator');

const actions = {
    "CSV File": csvgen,
}

inquirer
    .prompt([
        {
            name: 'harborName',
            message: 'Harbor name :',
        },
        {
            type: 'checkbox',
            name: 'outputOptions',
            message: 'Action :',
            choices: [
                'CSV File', 'Output to Terminal'
            ],
        },
    ])
    .then(answers => {
        fetcher(answers.harborName).then(reqs => {
            if(reqs) {
                console.log(answers.outputOptions)
                answers.outputOptions.forEach(e => actions[e](reqs));
            } else {
                console.log("Harbor not Found")
            }
        })
    });