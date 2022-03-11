/**
 * User routes 
 * host + /api/category
 */

const router = require("express").Router();
const { check } = require('express-validator');


const { createCategory, getCategory,
        updateCategory, deleteCategory, getAllCategory} = require('../controllers/category.controller');
const { categoryExists } = require("../helpers/db-validator");
const { validateFileds } = require('../middleware/validator_fields');

router.post("/", [
    check('name', 'Please provide a category name.').not().isEmpty(),
    check('name', 'name must be at least 5 characters.').isLength({ min: 5 }),
    validateFileds
    ] , createCategory);


router.get("/all", getAllCategory); ///validar el count

router.get("/:id", [
    check('id', 'invalid mongo id').isMongoId(),
    check('id').custom(categoryExists),
    validateFileds
], getCategory);


router.put("/", [
    check('id', 'invalid mongo id').isMongoId(),
    check('id').custom(categoryExists),
    check('name', 'Please provide a category name.').not().isEmpty(),
    check('name', 'name must be at least 2 characters.').isLength({ min: 2 }),
    validateFileds
    ], updateCategory)

router.delete("/", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(categoryExists),
    validateFileds
], deleteCategory)


module.exports = router;