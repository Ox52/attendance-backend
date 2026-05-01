const express  = require("express")

const router = express.Router();

const {signUp, login ,me } = require("../controller/authController");

const {authenticate} = require("../lib/middleware/auth");

const   {signupSchema,loginSchema,validate } = ("../lib/validation")



router.post("/signup", validate(signupSchema), signUp);
router.post("login", validate(loginSchema), login);
router.get("me", authenticate , me);

module.exports = router