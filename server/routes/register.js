const express = require('express');
const router = express.Router();
const pool = require('../models/mysql');
const sqliteDb = require('../models/sqlite');
const bcrypt = require('bcrypt');

function useSqlite() {
  return process.env.DB_TYPE && process.env.DB_TYPE.toLowerCase() === 'sqlite';
}

// Register a new user
router.post('/', async (req, res) => {
  console.log('Register route hit. DB_TYPE:', process.env.DB_TYPE);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  if (useSqlite()) {
    // SQLite logic
    sqliteDb.get('SELECT * FROM users WHERE email = ?', [email], async (err, existing) => {
      if (err) return res.status(500).json({ message: err.message });
      if (existing) return res.status(409).json({ message: 'Email already registered.' });
      const hashedPassword = await bcrypt.hash(password, 10);
      sqliteDb.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], function(err) {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'Registration successful.' });
      });
    });
  } else {
    // MySQL logic
    try {
      const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.status(409).json({ message: 'Email already registered.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
      res.status(201).json({ message: 'Registration successful.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
});

module.exports = router;
