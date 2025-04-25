// backend/routes/projects.js
const express = require('express');
const router = express.Router();
const projectsData = require('../data/projects.json');

// GET /api/projects - returns a list of projects
router.get('/', (req, res) => {
  res.json(projectsData);
});

module.exports = router;
