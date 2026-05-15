const express = require('express');
const { body, query } = require('express-validator');
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

const leadValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('company').optional().trim(),
  body('message').optional().trim(),
];

// Public: create lead
router.post('/', leadValidators, validate, async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: list leads with optional search and date filter
router.get(
  '/',
  auth,
  [
    query('search').optional().trim(),
    query('from').optional().isISO8601(),
    query('to').optional().isISO8601(),
  ],
  validate,
  async (req, res) => {
    try {
      const filter = {};
      const { search, from, to } = req.query;

      if (search) {
        const regex = new RegExp(search, 'i');
        filter.$or = [{ name: regex }, { email: regex }, { company: regex }];
      }

      if (from || to) {
        filter.createdAt = {};
        if (from) filter.createdAt.$gte = new Date(from);
        if (to) filter.createdAt.$lte = new Date(to);
      }

      const leads = await Lead.find(filter).sort({ createdAt: -1 });
      res.json(leads);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Admin: mark as contacted
router.patch('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { contacted: true },
      { new: true }
    );
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: delete lead
router.delete('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
