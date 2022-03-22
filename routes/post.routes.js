/**
 * User routes 
 * host + /api/post
 */

const router = require("express").Router();
const { check } = require('express-validator');

const { createPost, getPost, updatePost, deletePost, getPosts, 
            addReviewPost, addRemoveFavoritePost} = require('../controllers/post.controller');
const { validateFileds } = require('../middleware/validator_fields');
const { categoryExists, userExists, postExists, reviewExists, typeExists } = require('../helpers/db-validator')
//const { validateJWT } = require("../middleware/validate-jwt");


//router.use( validateJWT )

router.post("/", [
    check('description', 'Description must be at least 10 characters.').isLength({ min: 10 }),
    check('userID', ' invalid id ').isMongoId(),
    check('userID', 'the user  doesnt exist').custom(userExists),
    check('neighborhood', 'the neighborhood is necessary').not().isEmpty(),
    validateFileds
], createPost);



router.get("/getAllPost/:neighborhood", [
    check('neighborhood', ' neighborhood is required').not().isEmpty(),
    validateFileds
], getPosts);

router.get("/:id", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(postExists),
    validateFileds
], getPost);

router.post("/:id/addReviewPost", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(postExists),
    check('idReview', 'invalid idReview').isMongoId(),
    check('idReview').custom(reviewExists),
    validateFileds
], addReviewPost);


router.post("/:id/addRemoveFavoritePost", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(postExists),
    check('idUser', 'invalid idUser').isMongoId(),
    check('idUser').custom(userExists),
    check('type').not().isEmpty(),
    check('type').custom(typeExists),
    validateFileds
], addRemoveFavoritePost);



router.put("/:id", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(postExists),
    validateFileds
], updatePost);

router.delete("/:id", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(postExists),
], deletePost);

module.exports = router;
