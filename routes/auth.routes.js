/**
 * User routes 
 * host + /api/auth
 */

const router = require("express").Router();
const { check } = require('express-validator');

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const { login, signup, logout, recreateToken, forgotPassword, 
        resetPassword, changeOfPassword} = require('../controllers/auth.controller');
const { emailExists, usernameExists, userExists } = require("../helpers/db-validator");
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
  check('password', 'Please provide a  password.').not().isEmpty(),
  validateFileds
  ] , login);

router.get("/logout", [isLoggedIn], logout);

router.get("/renew", validateJWT, recreateToken);
//router.use( validateJWT )

router.get("/forgotPassword",[
  check('email', 'Please provide a correct email.').isEmail(),
  validateFileds
], forgotPassword);



router.post("/:id/resetPassword", [
  check('id', 'invalid id').isMongoId(),
  check('id').custom(userExists),
  check('newPassword', 'Please provide a  newPassword.').not().isEmpty(),
  check('newPassword').custom(correctPassword),
  check('confirmnewPassword', 'Please provide a confirmnewPassword.').not().isEmpty(),
  check('confirmnewPassword').custom(correctPassword),
  validateFileds
], resetPassword)

router.post("/:id/changePassword", [
  check('id', 'invalid id').isMongoId(),
  check('id').custom(userExists),
  check('actualPassword', 'Please provide a  actualPassword.').not().isEmpty(),
  check('newPassword', 'Please provide a  newPassword.').not().isEmpty(),
  check('newPassword').custom(correctPassword),
  check('confirmnewPassword', 'Please provide a confirmnewPassword.').not().isEmpty(),
  check('confirmnewPassword').custom(correctPassword),
  validateFileds
], changeOfPassword)


module.exports = router;
