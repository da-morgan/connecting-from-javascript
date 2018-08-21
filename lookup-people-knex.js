const settings = require("./settings.json");
const userInput = process.argv[2];

const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: settings
});

knex.select().table('famous_people').where('first_name', 'like', `%${userInput}%`).orWhere('last_name', 'like', `%${userInput}%`).asCallback(function(err, rows){
    console.log(rows);
});
