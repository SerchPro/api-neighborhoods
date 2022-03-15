
/*
 * Upload routes
 * host + /api/upload
 */
const router = require("express").Router();

const { userExists } = require('../helpers/db-validator')
const { check } = require('express-validator');
const { validateFileds } = require('../middleware/validator_fields');
const { validateFileUpload } = require("../middleware/validateFile");
const { uploadImageCloudinary } = require("../controllers/upload.controller");

router.put('/user', [
    validateFileUpload,
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
    validateFileds
], uploadImageCloudinary);


module.exports = router;