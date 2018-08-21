const pg = require("pg");
const settings = require("./settings.json");
const userInput = process.argv[2];

const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
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


client.connect((err) => {
    //If there's an error, let me know. 
    if(err){
        return console.error("Connection Error", err)
    } else {
        console.log("Searching...");
    }

    client.query(`SELECT * FROM famous_people
    WHERE first_name LIKE '%${userInput}%' OR last_name LIKE '%${userInput}%'`, (err, result) => {
        //if the select doesn't work, let me know. 
        if (err) {
          return console.error("error running query", err);
        }
        //console.log(result.rows);
        console.log(`Found ${result.rows.length} person(s) by the name ${userInput}.`)
        result.rows.forEach((person) => {
            console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born ${datePrinter(person.birthdate)}`);
        })

        
        //end the connection once we're done with the db. 
        client.end();
    });
});