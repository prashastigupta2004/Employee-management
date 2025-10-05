const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const { protect } = require('../middleware/auth');

// Get all employees
router.get('/', protect, async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get employee by id
router.get('/:id', protect, async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create employee
router.post('/', protect, async (req, res) => {
  const { name, email, position } = req.body;
  try {
    const employee = await Employee.create({ name, email, position });
    res.status(201).json(employee);
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update employee
router.put('/:id', protect, async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete employee
router.delete('/:id', protect, async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if(!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
