const { response } = require('express');

const Post = require("../models/Post.model"); // Require the User model in order to interact with the database
const Category = require('../models/Category.model');
const axios = require("axios");


const { validateDataPost } = require('../helpers/validate-post');
const { uploadFile } = require('../helpers/upload-file');

const createPost = async(req, res= response) =>{
    try {
        //parametros obligatorios
        const { title, description, userID, idCategory,  links} = req.body;
        //const {name: nameCategory} = await Category.findById({ _id:idCategory, active: true });
        let dataPost = {
                title,
                description,
                category: idCategory,
                _user: userID
            }
        if ( links ) dataPost.links = links

        if(req.files && req.files.archivo){
            console.log("tengo archivo", req.files)
            secure_url = await uploadFile(false, req.files.archivo);
            if (!secure_url){
                return res.status(500).json({
                    ok:false,
                    msg: "something went wrong"
                });
            }
            dataPost.images = [secure_url]
        }else{
            console.log("no tengo archivo", req.files)
        }

        /*const { dataFeatures, dataError } = validateDataPost(nameCategory, req.body);

        if (dataError.error){ 
            return res.status(400).json({
                ok: false,
                msg: dataError.msg //"missing parameters"
        })}*/

        const post = await Post.create(dataPost);
        const idPost = post._id
        const addPost = await axios.post(`${process.env.NEIGHBORHOODS_URI}/user/${userID}/addPostaUSer`, {
            "idPost": idPost
        });

        /*if (dataFeatures){
            dataFeatures._post = post._id
            console.log(post._id)
            console.log(dataFeatures)
            const features = await Features.create(dataFeatures)
        }*/

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
        return res.json({
            ok: true,
            msg:"get post",
            post
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};


const addReviewPost = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const { idReview } = req.body;
        const post = await Post.findOne({ _id:id, active: true});
        const reviews = post._reviews;
        const newReviews = [...reviews, idReview];
        post._reviews = newReviews;
        await post.save();

        console.log(post)
        return res.json({
            ok: true,
            msg:"add Review post",
            post
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};


const addFavoritePost = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const { idUser } = req.body;
        const post = await Post.findOne({ _id:id, active: true});
        const favorites = post._favorites;
        const newFavorites = [...favorites, idUser];
        post._favorites = newFavorites;
        await post.save();

        console.log(post)
        return res.json({
            ok: true,
            msg:"add Review post",
            post
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "something went wrong"
        });
    }
};

const getPosts = async(req, res = response) => {

    try{
        const { skip = 0, limit = 10 } = req.query;
        const [count, posts] = await Promise.all(
            [
                Post.countDocuments({ active: true }),
                Post.find({ active: true })
                .populate('_user', 'username image_url name')
                .populate('category', 'name')
                .skip(Number(skip))
                .limit(Number(limit))
            ]);

        return res.json({
            ok: true,
            count,
            posts
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "something went wrong"
        });
    }

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
        
        return res.json({
            ok: true,
            post
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
    addReviewPost,
    addFavoritePost,
    getPost,
    getPosts,
    updatePost,
    deletePost,
};