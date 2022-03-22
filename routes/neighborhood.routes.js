const router = require("express").Router();
const { check } = require('express-validator');
const { validateFileds } = require('../middleware/validator_fields');
const {  getNeighborhoods } = require('../controllers/neighborhood.controller');



router.get("/:cp", [
    check('cp', 'Please provide a valid cp.').not().isEmpty(),
    validateFileds
], getNeighborhoods);

module.exports = router;
