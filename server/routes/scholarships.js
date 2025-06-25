const express = require('express');
const router = express.Router();
const pool = require('../models/mysql');

// Get all scholarships
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM scholarships');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new scholarship
router.post('/', async (req, res) => {
  const { name, program, status } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO scholarships (name, program, status) VALUES (?, ?, ?)',
      [name, program, status]
    );
    res.status(201).json({ id: result.insertId, name, program, status });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a scholarship
router.put('/:id', async (req, res) => {
  const { name, program, status } = req.body;
  try {
    await pool.query(
      'UPDATE scholarships SET name=?, program=?, status=? WHERE id=?',
      [name, program, status, req.params.id]
    );
    res.json({ id: req.params.id, name, program, status });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a scholarship
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM scholarships WHERE id=?', [req.params.id]);
    res.json({ message: 'Scholarship deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
