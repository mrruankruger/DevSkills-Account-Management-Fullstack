var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')
const { v4: uuidv4 } = require('uuid'); //uuidv4();

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  } else {
    db.run(`CREATE TABLE accounts (
            accountID text PRIMARY KEY UNIQUE, 
            balance real
            )`,
      (err) => {
        if (err) {
          // Table already created
          // console.log(err)
        } else {
          // Table just created, creating some rows
          var insert = 'INSERT INTO accounts (accountID, balance) VALUES (?,?)'
          db.run(insert, ["123", "100"])
          db.run(insert, ["456", "55.55"])
          db.run(insert, ["a40bcc03-6f39-418c-ad0b-97e14f522ec1", "0"])
          db.run(insert, ["aaad2f95-aa52-4e04-a085-c5cc2a4d4ee4", "0"])
          db.run(insert, ["6113255d-318f-4128-9e2a-a1c1b796a29e", "0"])
          db.run(insert, ["0708c2b1-e1c9-4c31-8647-c2f44b7664e7", "0"])
          db.run(insert, ["0b230303-0156-45a9-b996-16574b6be525", "0"])
          db.run(insert, ["70ad2f95-aa52-4e04-a085-c5cc2a4d4ee4", "0"])
        }
      });

    db.run(`CREATE TABLE transactions (
            transactionID text PRIMARY KEY UNIQUE,
            accountID text,
            amount real,
            FOREIGN KEY (accountID)
              REFERENCES accounts (accountID)
            )`,
      (err) => {
        if (err) {
          // Table already created
          // console.log(err)
        } else {
          // Table just created, creating some rows
          var insert = 'INSERT INTO transactions (transactionID, accountID, amount) VALUES (?,?,?)'
          db.run(insert, [uuidv4(), '123', "1"])
          db.run(insert, [uuidv4(), '456', "5.50"])
        }
      });
  }
});


module.exports = db