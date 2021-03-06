/**
 * User routes
 * host + /api/review
 */

const router = require("express").Router();
const { check } = require('express-validator');
const { validateFileds } = require('../middleware/validator_fields');
const { createReview, getReview, getReviewsPost, updateReview, deleteReview,} = require('../controllers/review.controller');
const { userExists, postExists, reviewExists } = require('../helpers/db-validator')

//const { validateJWT } = require("../middleware/validate-jwt");


//router.use( validateJWT )

router.post("/", [
    check('comment', 'comment must be at least 5 characters.').isLength({ min: 5 }),
    check('userID', ' invalid id ').isMongoId(),
    check('userID', 'the user  doesnt exist').custom(userExists),
    check('idPost', 'invalid id ').isMongoId(),
    check('idPost', 'the category  doesnt exist').custom(postExists),
    validateFileds
], createReview);

router.get("/:id/getReviewsPost", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(postExists),
    validateFileds
], getReviewsPost);

router.get("/:id", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(reviewExists),
    validateFileds
], getReview);

router.put("/:id", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(reviewExists),
    validateFileds
], updateReview);

router.delete("/:id", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(postExists),
], deleteReview);

module.exports = router;
