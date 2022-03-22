const router = require("express").Router();

const { check } = require('express-validator');
const { getListNeighborhoods, createNeighborhood, updateNeighborhood } = require('../controllers/address.controller');
const { validateFileds } = require('../middleware/validator_fields');
const { neighborhoodExists } = require("../helpers/db-validator");


router.post("/", [
    check('idUser', 'Please provide a valid idUser.').not().isEmpty(),
    check('description', 'Please provide a valid description').not().isEmpty(),
    check('neighborhood', 'Please provide a valid neighborhood').not().isEmpty(),
    validateFileds
], createNeighborhood)

router.get("/:idUser", [
    check('idUser', 'Please provide a valid idUser.').not().isEmpty(),
    validateFileds
], getListNeighborhoods);


router.put("/:idNeighborhood", [
    check('idNeighborhood', 'Please provide a valid idNeighborhood.').isMongoId(),
    check('idNeighborhood').custom(neighborhoodExists),
    check('description', 'Please provide a valid description.').not().isEmpty(),
    validateFileds
], updateNeighborhood);

module.exports = router;