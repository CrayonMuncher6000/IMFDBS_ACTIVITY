const express = require('express');
const router = express.Router();
const db = require('../models/sqlite');

// Get all scholarships
router.get('/', (req, res) => {
  db.all('SELECT * FROM scholarships', [], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

// Add a new scholarship
router.post('/', (req, res) => {
  const { student_id, name, program, status } = req.body;
  db.run(
    'INSERT INTO scholarships (student_id, name, program, status) VALUES (?, ?, ?, ?)',
    [student_id, name, program, status],
    function (err) {
      if (err) return res.status(400).json({ message: err.message });
      res.status(201).json({ id: this.lastID, student_id, name, program, status });
    }
  );
});

// Update a scholarship
router.put('/:id', (req, res) => {
  const { student_id, name, program, status } = req.body;
  db.run(
    'UPDATE scholarships SET student_id=?, name=?, program=?, status=? WHERE id=?',
    [student_id, name, program, status, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ message: err.message });
      res.json({ id: req.params.id, student_id, name, program, status });
    }
  );
});

// Delete a scholarship
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM scholarships WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Scholarship deleted' });
  });
});

module.exports = router;
