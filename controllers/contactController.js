const { readDB, writeDB } = require('../config/db');
const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  const errors = Contact.validate({ name, email, message });

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  const contact = new Contact({ name, email, subject, message });
  const db = readDB();
  db.contacts.push(contact);
  writeDB(db);

  res.status(201).json({
    success: true,
    message: 'Message sent successfully! I will get back to you soon.',
    data: contact
  });
};

exports.getContacts = (req, res) => {
  const db = readDB();
  res.json({
    success: true,
    count: db.contacts.length,
    data: db.contacts
  });
};

exports.getContactById = (req, res) => {
  const db = readDB();
  const contact = db.contacts.find(c => c.id === req.params.id);

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact message not found'
    });
  }

  res.json({
    success: true,
    data: contact
  });
};
