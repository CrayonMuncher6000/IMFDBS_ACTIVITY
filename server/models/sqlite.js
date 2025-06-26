const sqlite3 = require('sqlite3').verbose();
const path = require('path');
// Use the IMFDBS file in the database folder
const dbPath = path.resolve(__dirname, '../../database/IMFDBS');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at', dbPath);
  }
});
module.exports = db;
