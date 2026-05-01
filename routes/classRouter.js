const express = require('express');
const router = express.Router();
const { createClass, addStudent, getClass, getStudents } = require('../controller/classController');
const { authenticate, requireTeacher, requireStudent } = require('../lib/middleware/auth');
const { validate, createClassSchema, addStudentSchema } = require('../lib/validation');
const { getMyAttendance } = require('../controller/attendanceController');


//teacher only routes

router.post("/", authenticate, requireTeacher, validate(createClassSchema), createClass);

router.post("/:id/add-student", authenticate , requireTeacher , validate(addStudentSchema), addStudent );


// get class ( teacher who owns OR enrolled studentḍḍ

router.get("/:id", authenticate , getclass )


router.get("/:id/-my-attendance", authenticate , requireStudent , getMyAttendance);


module.exports = router