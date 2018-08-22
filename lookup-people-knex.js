const settings = require("./settings.json");
const userInput = process.argv[2];

const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: settings
});

function datePrinter(date){
    if((date.getMonth() + 1) < 10 && date.getDate() < 10){
        return date.getFullYear() +'-' + '0' +(date.getMonth() + 1) + '-' + '0' + date.getDate()
    } else if((date.getMonth() + 1) < 10 && date.getDate() >= 10) {
        return date.getFullYear() +'-' + '0' +(date.getMonth() + 1) + '-' + date.getDate()
    } else if((date.getMonth() + 1) >= 10 && date.getDate() < 10) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + '0' + date.getDate()
    } else {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
}

knex.select().table('famous_people').where('first_name', 'like', `%${userInput}%`).orWhere('last_name', 'like', `%${userInput}%`).asCallback(function(err, rows){
    console.log(`Found ${rows.length} person(s) by the name ${userInput}.`)
    rows.forEach((person) => {
        console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born ${datePrinter(person.birthdate)}`);
    })
}).finally(function(){
    knex.destroy();
});

