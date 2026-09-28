const crypto = require('crypto');

class Contact {
  constructor({ name, email, subject, message }) {
    this.id = crypto.randomUUID();
    this.name = name.trim();
    this.email = email.trim().toLowerCase();
    this.subject = subject ? subject.trim() : 'No Subject';
    this.message = message.trim();
    this.createdAt = new Date().toISOString();
    this.read = false;
  }

  static validate(data) {
    const errors = [];
    const { name, email, message } = data;

    if (!name || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('A valid email is required');
    }
    if (!message || message.trim().length < 10) {
      errors.push('Message must be at least 10 characters');
    }

    return errors;
  }
}

module.exports = Contact;
