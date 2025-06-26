const express = require('express');
const router = express.Router();
const sqliteDb = require('../models/sqlite');
const bcrypt = require('bcrypt');

// Register a new user (SQLite only)
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    sqliteDb.get('SELECT * FROM users WHERE email = ?', [email], async (err, existing) => {
      if (err) return res.status(500).json({ message: err.message });
      if (existing) {
        return res.status(409).json({ message: 'Email already registered.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      sqliteDb.run(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        function (err) {
          if (err) return res.status(500).json({ message: err.message });
          res.status(201).json({ message: 'Registration successful.' });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
