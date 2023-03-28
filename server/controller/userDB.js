var sqlite3 = require('sqlite3').verbose();
var bcrypt = require('bcrypt');
require("dotenv").config();

let userdb = new sqlite3.Database(process.env.DB_SOURCE, (err) => {
    if (err) {
      console.error(err.message) // in case of cannot open database
      throw err
    } 
    else {     
        console.log('Successfully connected to DB!')   
        var salt = bcrypt.genSaltSync(20);
        
        userdb.run(`CREATE TABLE Users (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Username text, 
            Email text, 
            Password text,             
            Salt text,    
            Token text,
            DateLoggedIn DATE,
            DateCreated DATE
            )`,
        (err) => {
            if (err) {
                // Table already created and exist
                console.log('Table already created and exist')
            } else{
                // We need to create a table with adding some records
                console.log('Table does NOT exist... INSERT INTO Users.....')
                var insert = 'INSERT INTO Users (Username, Email, Password, Salt, DateCreated) VALUES (?,?,?,?,?)'
                userdb.run(insert, ["user1", "user1@test.com", bcrypt.hashSync("user1", salt), salt, Date('now')])
                userdb.run(insert, ["user2", "user2@test.com", bcrypt.hashSync("user2", salt), salt, Date('now')])
                userdb.run(insert, ["user3", "user3@test.com", bcrypt.hashSync("user3", salt), salt, Date('now')])
                userdb.run(insert, ["user4", "user4@test.com", bcrypt.hashSync("user4", salt), salt, Date('now')])
                console.log('Done!')
            }
        });  
    }
});

module.exports = userdb