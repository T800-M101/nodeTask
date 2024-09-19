const fs = require('fs');
const file = './db/data.json';

const saveDB = ( data ) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

const readDB = () => {
    
    if( !fs.existsSync(file) ) return;
    
    const info = fs.readFileSync(file, { encoding: 'utf-8' });

    return JSON.parse(info);

}


module.exports = {
    saveDB,
    readDB
}