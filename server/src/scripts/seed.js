require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const Pricing = require('../models/Pricing');
const Service = require('../models/Service');
const ContactInfo = require('../models/ContactInfo');
const Stat = require('../models/Stat');
const TeamMember = require('../models/TeamMember');
const AboutContent = require('../models/AboutContent');

const seed = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is required');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(password, 10);

  await AdminUser.findOneAndUpdate(
    { email },
    { email, passwordHash },
    { upsert: true, new: true }
  );
  console.log(`Admin user ready: ${email}`);

  await Pricing.deleteMany({});
  await Pricing.insertMany([
    {
      tier: 'Basic',
      price: '$499/mo',
      features: ['Lead capture forms', 'Email campaigns', 'Monthly reports', 'Email support'],
      highlighted: false,
      order: 0,
    },
    {
      tier: 'Pro',
      price: '$999/mo',
      features: [
        'Everything in Basic',
        'CRM integration',
        'A/B testing',
        'Priority support',
        'Weekly strategy calls',
      ],
      highlighted: true,
      order: 1,
    },
    {
      tier: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom automations',
        'SLA guarantee',
        'On-site workshops',
      ],
      highlighted: false,
      order: 2,
    },
  ]);

  await Service.deleteMany({});
  await Service.insertMany([
    {
      title: 'Lead Generation',
      description: 'Targeted campaigns that fill your pipeline with qualified prospects.',
      icon: 'Target',
      order: 0,
    },
    {
      title: 'Email Marketing',
      description: 'Nurture sequences and newsletters that convert subscribers into customers.',
      icon: 'Mail',
      order: 1,
    },
    {
      title: 'SEO & Content',
      description: 'Rank higher and attract organic traffic with optimized content strategies.',
      icon: 'Search',
      order: 2,
    },
    {
      title: 'Social Media',
      description: 'Build brand awareness and engagement across every major platform.',
      icon: 'Share2',
      order: 3,
    },
    {
      title: 'Analytics',
      description: 'Data-driven insights to measure ROI and refine your marketing mix.',
      icon: 'BarChart3',
      order: 4,
    },
    {
      title: 'PPC Advertising',
      description: 'Maximize ad spend with high-converting paid search and display campaigns.',
      icon: 'Megaphone',
      order: 5,
    },
  ]);

  await ContactInfo.deleteMany({});
  await ContactInfo.create({
    phone: '+1 (555) 123-4567',
    email: 'hello@leadflow.com',
    address: '123 Business Ave, Suite 100, New York, NY 10001',
  });

  await Stat.deleteMany({});
  await Stat.insertMany([
    { label: 'Happy Clients', value: '500+', order: 0 },
    { label: 'Leads Generated', value: '50K+', order: 1 },
    { label: 'Campaigns Launched', value: '1,200+', order: 2 },
    { label: 'Years Experience', value: '10+', order: 3 },
  ]);

  await TeamMember.deleteMany({});
  await TeamMember.insertMany([
    {
      name: 'Sarah Mitchell',
      role: 'CEO & Founder',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      order: 0,
    },
    {
      name: 'James Chen',
      role: 'Head of Marketing',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      order: 1,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Lead Strategist',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      order: 2,
    },
    {
      name: 'Michael Park',
      role: 'Analytics Director',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      order: 3,
    },
  ]);

  await AboutContent.deleteMany({});
  await AboutContent.create({
    story:
      'Founded in 2014, LeadFlow has helped hundreds of businesses transform their marketing from guesswork into a predictable growth engine. We combine creativity with analytics to deliver campaigns that actually move the needle.',
    mission:
      'We believe every business deserves access to world-class marketing. Our mission is to democratize lead generation through smart technology, transparent reporting, and partnerships built on trust.',
    values: [
      { title: 'Results First', description: 'We measure success by your ROI, not vanity metrics.' },
      { title: 'Transparency', description: 'Clear reporting and honest communication at every step.' },
      { title: 'Innovation', description: 'We stay ahead of trends so your brand stays competitive.' },
    ],
  });

  console.log('Seed completed successfully');
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
