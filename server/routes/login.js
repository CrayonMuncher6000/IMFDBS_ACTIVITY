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
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (useSqlite()) {
    // SQLite logic
    sqliteDb.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
      if (err) return res.status(500).json({ message: err.message });
      if (!user) return res.status(401).json({ message: 'Invalid username or password.' });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Invalid username or password.' });
      res.json({ message: 'Login successful.' });
    });
  } else {
    // MySQL logic
    try {
      const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if (users.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
      const user = users[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
      res.json({ message: 'Login successful.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
});

module.exports = router;
