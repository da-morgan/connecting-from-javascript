const pg = require("pg");
const settings = require("./settings.json");

const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
});

//Connecting to DB. 
client.connect((err) => {
    //If there's an error, let me know. 
    if(err){
        return console.error("Connection Error", err)
    } else {
        console.log("connection successful");
    }
    //syntax we use to start actually doing things with the DB! nice.
    client.query("SELECT $1::int AS number", ["1"], (err, result) => {
        //if the select doesn't work, let me know. 
        if (err) {
          return console.error("error running query", err);
        }
        console.log("rows in results object that get passed back to us in cb: " + result.rows[0])
        //if it does work, it will pass something into 'result'. Do this with it:
        console.log(result.rows[0].number); //output: 1
        //end the connection once we're done with the db. 
        client.end();
    });
})