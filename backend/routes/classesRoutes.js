const express = require('express');
const router = express.Router();
const { getClassByProfessorId } = require('../controllers/classesController');

router.get('/', getClassByProfessorId);    // GET /api/classes/

module.exports = router;