const colors = require('colors');
const { 
    mainMenu, 
    pause, 
    readInput, 
    editEraseMenu,
    confirm,
    checklistMenu } = require('./helpers/inquirer');

const { saveDB, readDB } = require('./helpers/saveFile');
const Task = require('./models/task');
const Tasks = require('./models/tasks');

console.clear();

const main = async () => {

    let opt = '';
    const tasks = new Tasks();

    const tasksDB = readDB();

    if (tasksDB) tasks.loadTasks(tasksDB);

    do {
        // Show menu options
        opt = await mainMenu();

        switch (opt) {
            case '1':
                const description = await readInput('Description:');
                tasks.createTask(description);
                break;
            case '2':
                tasks.listAllTasks();
                break;
            case '3':
                tasks.listCompletedOrPending();
                break;
            case '4':
                tasks.listCompletedOrPending(false);
                break;
            case '5':
                const ids = await checklistMenu(tasks.tasksList);
                const response = tasks.toggleCompleted(ids);
                console.log(response);
                break;
            case '6':
                const editId = await editEraseMenu(tasks.tasksList);

                if (editId !== '0') {
                    const taskEdited = await readInput(tasks.tasksList[editId]);
                    const response = tasks.editTask(editId, taskEdited);
                    console.log(response)
                } 
                    
                break;
            case '7':
                const eraseId = await editEraseMenu(tasks.tasksList, true);
                if( eraseId !== '0') {
                    const ok = await confirm(`Are you sure you want to delete ${eraseId}`);
                    if ( ok ) {
                        tasks.deleteTask(eraseId);
                        console.log('Task deleted');
                    }
                }
                break;


        }

        saveDB(tasks.tasksList);
        await pause();

    } while (opt !== '0')

}

main();