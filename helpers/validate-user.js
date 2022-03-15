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
        myfollower: user._follower,
        myFollowings: user._following,
        myfavorites: user._favorites,
        created: user.createdAt
    }

}

module.exports = {
    validateDataUser
}