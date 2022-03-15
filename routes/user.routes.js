/**
 * User routes
 * host + /api/user
 */

const router = require("express").Router();
const { check } = require('express-validator');
const { validateFileds } = require('../middleware/validator_fields');
const { getUser, getUserbyUsername, updateUser, deleteUser, addPostaUser, getPostsUser,
        addFavoriteUser, addFollowerUser, addFollowingUser} = require('../controllers/user.controller')
const { userExists, postExists, userExistsByUsername } = require('../helpers/db-validator')

 //const { validateJWT } = require("../middleware/validate-jwt");


 //router.use( validateJWT )

 router.post("/:id/addPostaUser", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
    check('idPost', 'invalid idPost').isMongoId(),
    check('idPost').custom(postExists),
    validateFileds
], addPostaUser);


router.get("/:id/getPostsUser", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
    validateFileds
], getPostsUser);


router.get("/:username/username", [
    check('username').custom(userExistsByUsername),
    validateFileds
], getUserbyUsername);

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


router.post("/:id/addFavoriteUser", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
    check('idPost', 'invalid idPost').isMongoId(),
    check('idPost').custom(postExists),
    validateFileds
], addFavoriteUser);



router.post("/:id/addFollowerUser", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
    check('idUser', 'invalid idUser').isMongoId(),
    check('idUser').custom(userExists),
    validateFileds
], addFollowerUser);

router.post("/:id/addFollowingUser", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
    check('idUser', 'invalid idUser').isMongoId(),
    check('idUser').custom(userExists),
    validateFileds
], addFollowingUser);


router.delete("/:id", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
], deleteUser);

module.exports = router;
