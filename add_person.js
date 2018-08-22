const settings = require("./settings.json");
const userInput = process.argv[2];

const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: settings
});

knex("famous_people").insert(
    {first_name: process.argv[2],
    last_name: process.argv[3],
    birthdate: process.argv[4]}
).returning("*").asCallback(function(err, rows){
    if(err){
        console.log("error", err);
    }
    else {
        console.log("nice");
        knex.destroy();
    }

})