const express = require('express');
const router = express.Router();
const pool = require('../models/mysql');
const bcrypt = require('bcrypt');

// Login route (MySQL only)
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    // Find user by username
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    const user = users[0];
    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    res.json({ message: 'Login successful.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
