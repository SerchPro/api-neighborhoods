/**
 * User routes
 * host + /api/user
 */

const router = require("express").Router();
const { check } = require('express-validator');
const { validateFileds } = require('../middleware/validator_fields');
const { getUser, updateUser, deleteUser,} = require('../controllers/user.controller')
const { userExists } = require('../helpers/db-validator')

 //const { validateJWT } = require("../middleware/validate-jwt");


 //router.use( validateJWT )


router.get("/:id", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
    validateFileds
], getUser);

router.put("/:id", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
    validateFileds
], updateUser);

router.delete("/:id", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
], deleteUser);

module.exports = router;
