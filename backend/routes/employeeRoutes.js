const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();

// Get all employees
router.get('/view', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get employees by department
router.get('/:department', async (req, res) => {
  try {
    const employees = await Employee.find({ department: req.params.department });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new employee
router.post('/add', async (req, res, next) => {
  try {
    const existingEmployee = await Employee.findOne({ name: req.body.name });
    if (existingEmployee) {
      return res.status(409).json({ message: 'Employee already exists' });
    }

    const employee = new Employee(req.body);
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    next(err); // Pass error to the error handling middleware
  }
});


// Update an existing employee
router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;