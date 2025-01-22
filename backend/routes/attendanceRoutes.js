const express = require('express');
const router = express.Router();
const { getStudentByUID } = require('../controllers/attendanceController');

router.get('/', getStudentByUID);    // GET /api/attendances/

module.exports = router;