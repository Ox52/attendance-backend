const express = require("express");

const router =express.Router();

const { getstudents} = require("../controller/classController");

const {authenticate, requireTeacher} = require("../lib/middleware/auth")


router.get("/", authenticate, requireTeacher , getstudents);

module.exports = router;

