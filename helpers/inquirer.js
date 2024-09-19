const inquirer = require('inquirer');
const colors = require('colors');

/*
type: it is the type of functionality on the menu 
message: it is the prompt that the user will see to select an option from the menu
name: it is the return value, which is the option selected by the user. It is the name to destructure the return value.
choices: They are the options that the user will see as part of the menu
*/

const questions = [
    {
        type: 'list',
        pageSize: 8,
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Create task`
            },
            {
                value: '2',
                name: `${'2.'.green} List all tasks`
            },
            {
                value: '3',
                name: `${'3.'.green} List completed tasks`
            },
            {
                value: '4',
                name: `${'4.'.green} List pending tasks`
            },
            {
                value: '5',
                name: `${'5.'.green} Complete task(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Edit task`
            },
            {
                value: '7',
                name: `${'7.'.green} Delete task`
            },
            {
                value: '0',
                name: `${'0.'.green} Exit`
            },
        ]
    }
];

const mainMenu = async() => {
    
    console.clear();
    console.log('==============================='.green);
    console.log('          Menu options');
    console.log('===============================\n'.green);

    const { option } = await inquirer.prompt(questions);

    // return a string
    return option;

}

const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'pause',
            message: `Press ${'ENTER'.green} to continue`,
            choices: []
        }
    ]
    
    console.log('\n');
    /* In this case it is not required to return anything, just cause a pause*/
    await inquirer.prompt(question);

}

// The validate function is to enforce the input of a value
const readInput = async( msj ) => {
    const question = [ 
        {
            type: 'input',
            name: 'description',
            message: msj,
            validate( value ) {
                if ( value.length === 0 ) {
                    return 'Please, write your task.'
                }
                return true;
            } 
        }
    ];

    const { description } = await inquirer.prompt(question);
    // returns a string (the user input)
    return description;
}

const editEraseMenu = async(tasks, erase = false) => {
    const choices = tasks.map( (task, i ) => {
        const index = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${ index } ${task.desc}`
        }
    });
    
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: erase ? 'Erase' : 'Edit',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    // returns a string
    return id;
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    // returns a boolean
    return ok;
}

const checklistMenu = async(tasks) => {

    const choices = tasks.map( (task, i ) => {
        const index = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${ index } ${task.desc}`,
            checked: task.completedAt ? true : false
        }
    });
    
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selections',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question);
    // returns a list of strings
    return ids;
}

module.exports = {
    mainMenu,
    pause,
    readInput,
    editEraseMenu,
    confirm,
    checklistMenu
}