/**
 * User routes
 * host + /api/review
 */

const router = require("express").Router();
const { check } = require('express-validator');

const {createReview, getReview, updateReview, deleteReview,} = require('../controllers/review.controller');

//const { validateJWT } = require("../middleware/validate-jwt");


//router.use( validateJWT )

router.post("/", createReview);

router.get("/", getReview);

router.put("/", updateReview);

router.delete("/", deleteReview);

module.exports = router;
