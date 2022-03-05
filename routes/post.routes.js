/**
 * User routes 
 * host + /api/post
 */

const router = require("express").Router();
const { check } = require('express-validator');

const { createPost, getPost, updatePost, deletePost} = require('../controllers/post.controller');

//const { validateJWT } = require("../middleware/validate-jwt");


//router.use( validateJWT )

router.post("/", createPost);

router.get("/", getPost);

router.put("/", updatePost);

router.delete("/", deletePost);

module.exports = router;
