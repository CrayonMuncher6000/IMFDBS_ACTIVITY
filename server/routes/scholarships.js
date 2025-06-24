const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');

// Get all scholarships
router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new scholarship
router.post('/', async (req, res) => {
  const { name, program, status } = req.body;
  const scholarship = new Scholarship({ name, program, status });
  try {
    const newScholarship = await scholarship.save();
    res.status(201).json(newScholarship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a scholarship
router.put('/:id', async (req, res) => {
  try {
    const updated = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a scholarship
router.delete('/:id', async (req, res) => {
  try {
    await Scholarship.findByIdAndDelete(req.params.id);
    res.json({ message: 'Scholarship deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
