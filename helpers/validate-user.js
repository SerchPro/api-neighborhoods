const validateDataUser = (user) => {

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        birthday: user.birthday,
        image_url: user.image_url,
        bio: user.bio,
        phone: user.phone,
        name: user.name,
        myPosts: user._posts,
        myFollowers: user._followers,
        myFollowings: user._following,
        myFavorites: user._favorites,
        created: user.createdAt,
        addressactive: user._address
    }

}

module.exports = {
    validateDataUser
}