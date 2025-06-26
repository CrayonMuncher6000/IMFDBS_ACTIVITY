const express = require('express');
const router = express.Router();
const pool = require('../models/mysql');
const sqliteDb = require('../models/sqlite');
const bcrypt = require('bcrypt');

function useSqlite() {
  return process.env.DB_TYPE && process.env.DB_TYPE.toLowerCase() === 'sqlite';
}

// Login route
router.post('/', async (req, res) => {
  console.log('Login route hit. DB_TYPE:', process.env.DB_TYPE);
  const { username, password } = req.body;
  if (!username || !password) {
    console.log('Login failed: missing username or password');
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (useSqlite()) {
    // SQLite logic
    sqliteDb.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
      if (err) {
        console.error('SQLite error:', err);
        return res.status(500).json({ message: err.message });
      }
      if (!user) {
        console.log('Login failed: user not found (sqlite)', username);
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log('Login failed: password mismatch (sqlite)', username);
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
      console.log('Login successful (sqlite):', username);
      res.json({ message: 'Login successful.' });
    });
  } else {
    // MySQL logic
    try {
      const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if (users.length === 0) {
        console.log('Login failed: user not found (mysql)', username);
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
      const user = users[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log('Login failed: password mismatch (mysql)', username);
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
      console.log('Login successful (mysql):', username);
      res.json({ message: 'Login successful.' });
    } catch (err) {
      console.error('MySQL error:', err);
      res.status(500).json({ message: err.message });
    }
  }
});

module.exports = router;
