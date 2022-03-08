/**
 * User routes 
 * host + /api/post
 */

const router = require("express").Router();
const { check } = require('express-validator');

const { createPost, getPost, updatePost, deletePost, getPosts, addReviewPost, addFavoritePost} = require('../controllers/post.controller');
const { validateFileds } = require('../middleware/validator_fields');
const { categoryExists, userExists, postExists, reviewExists } = require('../helpers/db-validator')
//const { validateJWT } = require("../middleware/validate-jwt");


//router.use( validateJWT )

router.post("/", [
    check('title', 'Title must be at least 2 characters.').isLength({ min: 2 }),
    check('title', 'Title must be at most 20 characters.').isLength({ max: 20 }),
    check('description', 'Description must be at least 10 characters.').isLength({ min: 10 }),
    check('userID', ' invalid id ').isMongoId(),
    check('userID', 'the user  doesnt exist').custom(userExists),
    check('idCategory', 'invalid id ').isMongoId(),
    check('idCategory', 'the category  doesnt exist').custom(categoryExists),
    validateFileds
], createPost);



router.get("/getAllPost", getPosts);

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


router.post("/:id/addFavoritePost", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(postExists),
    check('idUser', 'invalid idUser').isMongoId(),
    check('idUser').custom(userExists),
    validateFileds
], addFavoritePost);

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
