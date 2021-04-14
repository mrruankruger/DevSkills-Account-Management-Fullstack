var express = require("express")
const app = express()
const { v4: uuidv4 } = require('uuid'); //uuidv4();
var db = require("./database.js");


//PING
app.get("/ping", (req, res, next) => {
  res.json({
    "message": "success",
    "data": ''
  })
});

//AMOUNT
app.post("/amount", (req, res, next) => {
  var errors = []
  if (!req.is('application/json')) {
    errors.push("wrong request headers");
    res.status(415).json({ "error": errors.join(",") });
    return;
  }
  if (!req.body.account_id) {
    errors.push("No account_id specified");
    res.status(400).json({ "error": errors.join(",") });
    return;
  }
  if (!req.body.amount) {
    if (req.body.amount !== 0) {
      errors.push("No amount specified");
      res.status(400).json({ "error": errors.join(",") });
      return;
    }
  }

  if (errors.length) {
    res.status(415).json({ "error": errors.join(",") });
    return;
  }

  var data = {
    account_id: req.body.account_id,
    amount: req.body.amount,
  }

  //check if acc iD exists
  var sql1 = "select * from accounts WHERE accountID = ?"; // WHERE accountID = ?
  var params1 = [data.account_id]
  db.all(sql1, params1, (err, rows) => {
    console.log("ROW", rows)

    if (!rows.length > 0) {
      res.status(400).send('no account');
      return;
    } else
      if (err) {
        res.status(400).json({ "error": res.message })
        return;
      }
    //updates accounts table with amount deducted
    db.run(
      `UPDATE accounts set 
        balance = balance + ?
        WHERE accountID = ?`,
      [data.amount, data.account_id],
      (err, result) => {
        if (err) {
          res.status(400).json({ "error": res.message })
          return;
        }
        // //Inserts into transaction table
        // var sql = 'INSERT INTO transactions (transactionID, accountID, amount) VALUES (?,?,?)'
        // var params = [req.get('Transaction-Id'), data.account_id, data.amount]

        // db.run(sql, params, function (err, result) {
        //   if (err) {
        //     res.status(400).json({ "error": err.message })
        //     return;
        //   }
        // });
        res.end('Transaction created.')

      });
  })
});
app.put("/amount", (req, res) => {
  res.status(405).send();
});

///balance/{account_id}
app.get("/balance/:account_id", (req, res, next) => {
  var sql = "select * from accounts where accountID = ?"
  var params = [req.params.account_id]
  db.all(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    if (row[0]) {
      res.json({
        "balance": row[0].balance
      })
    } else {
      res.status(404).send('NOT_FOUND')
      return
    }
  });
});

//drops tables and recreates them
app.get("/api/refresh", (req, res, next) => {
  var sql = `DROP TABLE accounts`
  var sql2 = `CREATE TABLE accounts (
              accountID text PRIMARY KEY UNIQUE, 
              balance real
              )`;
  var sql3 = `DROP TABLE transactions`
  var sql4 = `CREATE TABLE transactions (
              transactionID text PRIMARY KEY UNIQUE,
              accountID text,
              amount real,
              FOREIGN KEY (accountID)
                REFERENCES accounts (accountID)
              )`;
  db.all(sql, (err, rows) => {
    db.all(sql3, (err, rows) => {
      db.all(sql2, (err, rows) => {
        db.all(sql4, (err, rows) => {
          var insert = 'INSERT INTO accounts (accountID, balance) VALUES (?,?)'
          db.run(insert, ["123", "100"])
          db.run(insert, ["456", "55.55"])
          db.run(insert, [uuidv4(), "100"])
          db.run(insert, ["a40bcc03-6f39-418c-ad0b-97e14f522ec1", "0"])
          db.run(insert, ["aaad2f95-aa52-4e04-a085-c5cc2a4d4ee4", "0"])
          db.run(insert, ["6113255d-318f-4128-9e2a-a1c1b796a29e", "0"])
          db.run(insert, ["0708c2b1-e1c9-4c31-8647-c2f44b7664e7", "0"])
          db.run(insert, ["0b230303-0156-45a9-b996-16574b6be525", "0"])
          db.run(insert, ["70ad2f95-aa52-4e04-a085-c5cc2a4d4ee4", "0"])

          var insert2 = 'INSERT INTO transactions (transactionID, accountID, amount) VALUES (?,?,?)'
          db.run(insert2, [uuidv4(), '123', "1"])
          db.run(insert2, [uuidv4(), '456', "5.50"])

          res.json({
            "message": "success",
            "data": ''
          })
        })
      })
    });
  });
});

app.get("/api/accounts", (req, res, next) => {
  var sql = "select * from accounts"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
});

app.get("/api/transactions", (req, res, next) => {
  var sql = "select * from transactions"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
});

// Default response for any other request
app.use(function (req, res) {
  res.status(405);
});

module.exports = app;