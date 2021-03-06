/**
 * User routes
 * host + /api/user
 */

const router = require("express").Router();
const { check } = require('express-validator');
const { validateFileds } = require('../middleware/validator_fields');
const {
        getUser,
        getUserbyUsername,
        updateUser,
        deleteUser,
        addPostaUser,
        getPostsUser,
        addRemoveFavoriteUser,
        addFollowerUser,
        unFollowUser,
        addAddress
    } =
    require('../controllers/user.controller')
const {
    userExists,
    postExists,
    userExistsByUsername,
    typeExists ,
    addressExists
    } = 
    require('../helpers/db-validator')

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

router.put("/:id/addAddress", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
    check('idAddress').custom(addressExists),
    validateFileds
], addAddress);

router.put("/:id", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
    validateFileds
], updateUser);


router.post("/:id/addRemoveFavoriteUser", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
    check('idPost', 'invalid idPost').isMongoId(),
    check('idPost').custom(postExists),
    check('type').not().isEmpty(),
    check('type').custom(typeExists),
    validateFileds
], addRemoveFavoriteUser);



router.post("/:id/addFollowerUser", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
    check('idUser', 'invalid idUser').isMongoId(),
    check('idUser').custom(userExists),
    validateFileds
], addFollowerUser);

router.post("/:id/unFollow", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
    check('idUser', 'invalid idUser').isMongoId(),
    check('idUser').custom(userExists),
    validateFileds
], unFollowUser);


router.delete("/:id", [
    check('id', 'invalid id').isMongoId(),
    check('id').custom(userExists),
], deleteUser);

module.exports = router;
