const express = require('express');
const { body } = require('express-validator');
const Pricing = require('../models/Pricing');
const Service = require('../models/Service');
const ContactInfo = require('../models/ContactInfo');
const Stat = require('../models/Stat');
const TeamMember = require('../models/TeamMember');
const AboutContent = require('../models/AboutContent');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// --- Pricing ---
router.get('/pricing', async (req, res) => {
  const plans = await Pricing.find().sort({ order: 1 });
  res.json(plans);
});

router.put(
  '/pricing',
  auth,
  [body('plans').isArray({ min: 1 }).withMessage('Plans array is required')],
  validate,
  async (req, res) => {
    await Pricing.deleteMany({});
    const plans = await Pricing.insertMany(
      req.body.plans.map((p, i) => ({ ...p, order: i }))
    );
    res.json(plans);
  }
);

// --- Services ---
router.get('/services', async (req, res) => {
  const services = await Service.find().sort({ order: 1 });
  res.json(services);
});

router.put(
  '/services',
  auth,
  [body('services').isArray().withMessage('Services array is required')],
  validate,
  async (req, res) => {
    await Service.deleteMany({});
    const services = await Service.insertMany(
      req.body.services.map((s, i) => ({ ...s, order: i }))
    );
    res.json(services);
  }
);

// --- Contact Info ---
router.get('/contact-info', async (req, res) => {
  let info = await ContactInfo.findOne();
  if (!info) info = await ContactInfo.create({});
  res.json(info);
});

router.put(
  '/contact-info',
  auth,
  [
    body('phone').optional().trim(),
    body('email').optional().isEmail(),
    body('address').optional().trim(),
  ],
  validate,
  async (req, res) => {
    let info = await ContactInfo.findOne();
    if (!info) info = await ContactInfo.create(req.body);
    else {
      Object.assign(info, req.body);
      await info.save();
    }
    res.json(info);
  }
);

// --- Stats ---
router.get('/stats', async (req, res) => {
  const stats = await Stat.find().sort({ order: 1 });
  res.json(stats);
});

router.put(
  '/stats',
  auth,
  [body('stats').isArray({ min: 1 }).withMessage('Stats array is required')],
  validate,
  async (req, res) => {
    await Stat.deleteMany({});
    const stats = await Stat.insertMany(
      req.body.stats.map((s, i) => ({ ...s, order: i }))
    );
    res.json(stats);
  }
);

// --- Team ---
router.get('/team', async (req, res) => {
  const team = await TeamMember.find().sort({ order: 1 });
  res.json(team);
});

router.put(
  '/team',
  auth,
  [body('members').isArray().withMessage('Members array is required')],
  validate,
  async (req, res) => {
    await TeamMember.deleteMany({});
    const members = await TeamMember.insertMany(
      req.body.members.map((m, i) => ({ ...m, order: i }))
    );
    res.json(members);
  }
);

// --- About (bonus CMS for About page) ---
router.get('/about', async (req, res) => {
  let about = await AboutContent.findOne();
  if (!about) about = await AboutContent.create({});
  res.json(about);
});

router.put('/about', auth, async (req, res) => {
  let about = await AboutContent.findOne();
  if (!about) about = await AboutContent.create(req.body);
  else {
    Object.assign(about, req.body);
    await about.save();
  }
  res.json(about);
});

module.exports = router;
