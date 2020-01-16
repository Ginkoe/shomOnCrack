const inquirer = require('inquirer');
const fetcher = require('./shom_fetcher');
const csvgen = require('./csv_generator');
const asciichart = require('./terminal_chart');

const actions = {
    "CSV File": csvgen,
    "Output to Terminal": asciichart
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
                answers.outputOptions.forEach(e => actions[e](reqs, answers.harborName));
            } else {
                console.log("Harbor not Found")
            }
        })
    });