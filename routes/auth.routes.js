/**
 * User routes 
 * host + /api/auth
 */

const router = require("express").Router();
const { check } = require('express-validator');

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const { login, signup, logout, recreateToken} = require('../controllers/auth.controller');
const { emailExists,usernameExists } = require("../helpers/db-validator");
const { validateFileds } = require('../middleware/validator_fields');
const { correctPassword } = require("../helpers/validators");
const { validateJWT } = require("../middleware/validate-jwt");
const { isDate } = require("../helpers/isDate");


router.post("/signup", [
  isLoggedOut,
  check('password', 'Please provide a  password.').not().isEmpty(),
  check('username', 'Please provide a  username.').not().isEmpty(),
  check('email', 'Please provide a correct email.').isEmail(),
  check('birthday', 'Please provide a correct birthday.').custom( isDate),
  check('email').custom(emailExists),
  check('username').custom(usernameExists),
  check('password').custom(correctPassword),
  validateFileds
] , signup);

router.post("/", [
  isLoggedOut,
  check('username', 'Please provide a  username.').not().isEmpty(),
  check('password', 'Your password needs to be at least 8 characters long').not().isEmpty(),
  validateFileds
  ] , login);

router.get("/logout", [isLoggedIn], logout);

router.get("/renew", validateJWT, recreateToken);
//router.use( validateJWT )



module.exports = router;
