const express = require('express');
const router = express.Router();
const { startAttendance } = require('../controller/attendanceController');
const { authenticate, requireTeacher } = require('../lib/middleware/auth');
const { validate, startAttendanceSchema } = require('../lib/validation');

router.post('/start', authenticate, requireTeacher, validate(startAttendanceSchema), startAttendance);

module.exports = router;