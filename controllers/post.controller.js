const { response } = require('express');

const Post = require("../models/Post.model"); // Require the User model in order to interact with the database
const Category = require('../models/Category.model');
const Features = require('../models/Features.model')


const { validateDataPost } = require('../helpers/validate-post');
const { findOneAndUpdate } = require('../models/Post.model');

const createPost = async(req, res= response) =>{
    try {
        const { title, description, userID, idCategory,  links, images} = req.body;
        const {name: nameCategory} = await Category.findById({ _id:idCategory, active: true });
        let dataPost = {
                title,
                description,
                category: idCategory,
                _user: userID
            }
        if ( links ) dataPost.links = links
        if ( images ) dataPost.images = images

        const { dataFeatures, dataError } = validateDataPost(nameCategory, req.body);

        if (dataError.error){ 
            return res.status(400).json({
                ok: false,
                msg: dataError.msg //"missing parameters"
        })}

        const post = await Post.create(dataPost);
        console.log(post)

        if (dataFeatures){
            dataFeatures._post = post._id
            console.log(post._id)
            console.log(dataFeatures)
            const features = await Features.create(dataFeatures)
        }

        return res.json({
            ok: true,
            msg:"post created"
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};

const getPost = async(req, res= response) =>{
    try {
        const { id } = req.params;
        let feature = {}
        const post = await Post.findOne({ _id:id, active: true})
                .populate('_user', 'username email image_url');
        console.log(post)
        if (post){
            feature = await Features.findOne({_post: post._id})
        }
        console.log(feature)
        return res.json({
            ok: true,
            msg:"get post",
            post,
            feature
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};


const getPosts = async(req, res = response) => {
    const { skip = 0, limit = 5 } = req.query;
    const [count, posts] = await Promise.all(
        [
            Post.countDocuments({ active: true }),
            Post.find({ active: true })
            //.populate('usuario', 'nombre')
            //.populate('categoria', 'nombre')
            .skip(Number(skip))
            .limit(Number(limit))
        ]);
    //console.log(count, posts)
    res.json({ count, posts });
}


const updatePost = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const {} = req.body;
        const post = await Post.findByIdAndUpdate(id, data, { new: true});
        return res.json({
            ok: true,
            msg:"update post"
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};


const deletePost = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndUpdate(id, {active: false}, { new: true});
        const features = await Features.findOneAndUpdate({_post: id}, {active: false}, { new: true});
        
        return res.json({
            ok: true,
            post,
            features
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
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost,
};