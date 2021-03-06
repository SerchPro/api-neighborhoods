const { response } = require('express');
const { validateDataUser } = require('../helpers/validate-user');

const User = require("../models/User.model");

const getUser = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const user = await User.findOne({_id:id , active: true})
            .populate('_posts');
        const userSend = validateDataUser(user);

        return res.json({
            ok: true,
            user:userSend
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "Something went wrong"
        });
    }
};


const getUserbyUsername = async(req, res= response) =>{
    try {
        const { username } = req.params;
        const user = await User.findOne({username , active: true})
        .populate({
            path:'_posts',
            populate:{
                path:'_user',
                model:'User'
            }
        })
        .populate({
            path:'_favorites',
            populate:{
                path:'_user',
                model:'User'
            }
        })
        const userSend = validateDataUser(user);

        return res.json({
            ok: true,
            user:userSend
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "Something went wrong"
        });
    }
};

const getPostsUser = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { skip = 0, limit = 10 } = req.query;
        const [{_posts: posts}] = await User.find({ _id: id,  active: true })
                .populate('_posts')
                //.populate('categoria', 'nombre')
                .skip(Number(skip))
                .limit(Number(limit))
        return res.json({ 
            ok: true,
            posts
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "Something went wrong"
        });
    }
}

const addRemoveFavoriteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { idPost, type } = req.body;

        const user = await User.findOne({_id: id, active:true});
        const favorites = user._favorites;

        let newFavorities = []
        if (type == 'add'){
            newFavorities = [...favorites, idPost];
        }else{
            newFavorities = favorites.pull(idPost);
        }
        user._favorites = newFavorities;
        await user.save();

        return res.json({
            ok: true,
            msg:`${type} a favorite to a user`
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "Something went wrong"
        });
    }
}


const addFollowerUser = async (req, res) => {
    try {
        const { id } = req.params;//el id del auth
        const { idUser } = req.body; //
        const userFollowing = await User.findOne({_id: id, active:true});
        const followings = userFollowing._following;
        const newFollowings = [...followings, idUser];
        userFollowing._following = newFollowings;
        await userFollowing.save();


        const userFollow = await User.findOne({_id: idUser, active:true});
        const followers = userFollow._followers;
        const newFollowers = [...followers, id];
        userFollow._followers = newFollowers;
        await userFollow.save();


        return res.json({
            ok: true,
            newFollowers
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "Something went wrong"
        });
    }
}

const unFollowUser = async (req, res) => {
    try {
        const { id } = req.params;//el id del auth
        const { idUser } = req.body; //

        const userFollowing = await User.findOne({_id: id, active:true});
        const followings = userFollowing._following;
        const newFollowings = followings.pull( idUser)
        userFollowing._following = newFollowings;
        await userFollowing.save();

        const userFollow = await User.findOne({_id: idUser, active:true});
        const followers = userFollow._followers;
        const newFollowers = followers.pull( id)
        userFollow._followers = newFollowers;
        await userFollow.save();

        return res.json({
            ok: true,
            newFollowers
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "Something went wrong"
        });
    }
}

const addAddress = async(req, res = response) =>{
    try{
        const { id } = req.params;
        const { idAddress } = req.body;

        const user = await User.findOne({_id: id, active:true});
        user._address = idAddress;
        await user.save();

        return res.json({
            ok: true,
            msg:`Address add`
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "something went wrong"
        });
    }
}

const updateUser = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const {username, email, phone, birthday, bio, name } = req.body;
        const user = await User.findById(id)
        if(!username && !email && !phone && !birthday && !bio && !name){
            return res.status(400).json({
                ok:false,
                msg: `missing parameteres to update a user`
            });
        }
        const dataupdate = {};
        if (username && user.username != username) {
            userUsername =  await User.findOne({username});
            if(userUsername) return res.status(403).json({ ok:false, msg: `username already taken`});
            dataupdate.username = username
        }
        if (email && user.email != email) {
            userEmail =  await User.findOne({email});
            if(userEmail) return res.status(403).json({ ok:false, msg: `email already taken`});
            dataupdate.email = email
        }
        if ( phone && user.phone != phone) dataupdate.phone = phone;
        if ( birthday && user.birthday != birthday) dataupdate.birthday = birthday;
        if ( bio && user.bio != bio) dataupdate.bio = bio;
        if ( name && user.name != name) dataupdate.name = name;
        const newUser = await User.findByIdAndUpdate(id, dataupdate , { new: true});

        const userFind = await User.findOne({ _id:id, active: true })
                .populate('_address', '_id neighborhood description');

        const userSend = validateDataUser(userFind);

        return res.json({
            ok: true,
            user:userSend
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "something went wrong"
        });
    }
};


const addPostaUser = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const { idPost } = req.body;
        const user = await User.findOne({_id: id, active:true});
        const posts = user._posts;
        const newPosts = [...posts, idPost];
        user._posts = newPosts;
        await user.save();
        return res.json({
            ok: true,
            msg:"add a post a user"
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "something went wrong"
        });
    }
};


const deleteUser = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, {active: false}, { new: true});
        return res.json({
            ok: true,
            msg:"delete user",
            user
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "something went wrong"
        });
    }
};

module.exports = {
    getUser,
    getUserbyUsername,
    getPostsUser,
    addPostaUser,
    addRemoveFavoriteUser,
    addFollowerUser,
    unFollowUser,
    updateUser,
    deleteUser,
    addAddress
};