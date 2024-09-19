const colors = require('colors');
const Task = require("./task");

class Tasks {
    
    _list = {};

    get tasksList() {
        return Object.values(this._list);
    }

    createTask( desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    loadTasks(tasksDB) {
        for (const task of tasksDB ) {
            this._list[task.id] = task; 
        }
    }

    listAllTasks() {
        console.log();
        let i = 1;
        for( const task of this.tasksList ) {
            const index = `${ (i + '.').green }`;
            const { desc, completedAt } = task;
            const status = completedAt ? 'Completed'.green : 'Pending'.red;
            console.log(`${index} ${desc} :: ${status}`);
            i++;
        }
    }

    listCompletedOrPending(completed = true) {
        console.log();
        let i = 1;

        for( const task of this.tasksList ) {
            const { desc, completedAt } = task;
            const status = completedAt ? completedAt.green : 'PENDING'.red;

            if ( completed ) {
                if ( completedAt ) {
                    const index = `${ (i + '.').green }`;
                    console.log(`${index} ${desc} :: ${status}`);
                    i++;
                }
            } else {
                if ( !completedAt ) {
                    const index = `${ (i + '.').green }`;
                    console.log(`${index} ${desc} :: ${status}`);
                    i++;
                }

            }
        }
    }

    deleteTask(id) {
        if ( this._list[id] ) {
            delete this._list[id];
        }
    }

    editTask(id, message) {

        if ( this._list[id] && !this._list[id].completedAt) {
            this._list[id].desc = message;
            return 'Task Edited';
        }
        return 'Task already completed cannot be edited';
    }

    toggleCompleted(ids) {
        let counter = 0;
        for ( const id of ids ) {
            const task = this._list[id];

            if ( !task.completedAt ) {
                task.completedAt = this.parseDate(new Date().toISOString());
                counter = counter + 1;
            }
        }

        return counter > 0 ? 'Task(s) marked as completed'.green : 'The task(s) you selected were already completed. Cannot modify'.red;
    }

    parseDate(date) {
        // Create a new Date object from the ISO string
        const newDate = new Date(date);

        // Extract day and year
        const day = String(newDate.getDate()).padStart(2, '0');
        const year = newDate.getFullYear();

        // Create an array of abbreviated month names 
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        // Get month
        const month = months[newDate.getMonth()];
        
        // Combine them into the desired format
        const finalDate = `${day}/${month}/${year}`.green;

        return finalDate;
    }

}

module.exports = Tasks;