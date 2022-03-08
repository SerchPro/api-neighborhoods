const { response } = require('express');
const { uploadFile } = require('../helpers/upload-file');

const User = require("../models/User.model");

const getUser = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const user = await User.findOne({_id:id , active: true});
        return res.json({
            ok: true,
            user
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
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
        console.log(posts)
        return res.json({ 
            ok: true,
            posts
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
}

const addFavoriteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { idPost } = req.body;
        const user = await User.findOne({_id: id, active:true});
        const favorites = user._favorites;
        const newFavorities = [...favorites, idPost];
        user._favorites = newFavorities;
        await user.save();
        return res.json({
            ok: true,
            msg:"add a new favorite to a user"
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
}

const addFollowerUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { idUser } = req.body;
        const user = await User.findOne({_id: id, active:true});
        const followers = user._followers;
        const newFollowers = [...followers, idUser];
        user._followers = newFollowers;
        await user.save();
        return res.json({
            ok: true,
            msg:"add a new follower to a user"
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
}

const addFollowingUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { idUser } = req.body;
        const user = await User.findOne({_id: id, active:true});
        const followings = user._following;
        const newFollowing = [...followings, idUser];
        user._following = newFollowing;
        await user.save();
        return res.json({
            ok: true,
            msg:"add a new following to a user"
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
}

const updateImgUser = async(req, res = response) => {
    try {
        const { id } = req.params;
        const {image_url } = req.body;
        const user = await User.findById(id)
        uploadFile(user.image_url, )
        return res.json({
            ok: true,
            user
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
}

const updateUser = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const {username, email, phone, birthday, bio } = req.body;
        const user = await User.findById(id)
        if(!username && !email && !phone && !birthday && !bio){
            console.log("no parameters")
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
        console.log("dataUpdate", dataupdate)
        const newUser = await User.findByIdAndUpdate(id, dataupdate , { new: true});
        return res.json({
            ok: true,
            msg:"update user",
            newUser
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
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
            msg: error
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
            msg: error
        });
    }
};

module.exports = {
    getUser,
    getPostsUser,
    addPostaUser,
    addFavoriteUser,
    addFollowerUser,
    addFollowingUser,
    updateUser,
    deleteUser,
};