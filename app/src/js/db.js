const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("app/db/web-db.db");

// Create users table and insert some users
db.serialize(function() {
  db.run(
    "CREATE TABLE IF NOT EXISTS users(users_id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)",
    err => {
      if (err) {
        return console.log(err.message);
      }
    }
  ).run(
    // Would like this to contain hashes eventually so that it may be dumped via SQLMap
    "INSERT INTO users (username, password) VALUES ('admin', 'youWillNeverGuessThisAwesomelyLongPassword'), ('jordan', 'nonyabusiness'), ('chris', 'alsononyabusiness'), ('hackmac', 'gimmetheflag')",
    err => {
      if (err) {
        return console.error(err.message);
      }
    }
  );
});

module.exports = db;
