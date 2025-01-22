const express = require('express');
const router = express.Router();
const { saveAttendance } = require('../controllers/nfcController');

router.post('/', saveAttendance);           // POST /api/nfc/ 

module.exports = router;