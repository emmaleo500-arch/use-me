const express = require('express');
const router = express.Router();

const {
  createContact,
  getContacts,
  getContactById
} = require('../controllers/contactController');

const {
  getProjects,
  getProjectById
} = require('../controllers/projectController');

const { healthCheck } = require('../controllers/healthController');

router.get('/health', healthCheck);

router.post('/contact', createContact);
router.get('/contact', getContacts);
router.get('/contact/:id', getContactById);

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);

module.exports = router;
