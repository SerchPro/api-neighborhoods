const { response } = require('express');

const Post = require("../models/Post.model"); // Require the User model in order to interact with the database


const createPost = async(req, res= response) =>{
    try {
        //const { username, password } = req.body;
        return res.json({
            ok: true,
            msg:"create post"
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
        //const { username, password } = req.body;
        return res.json({
            ok: true,
            msg:"get post"
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};


const updatePost = async(req, res= response) =>{
    try {
        //const { username, password } = req.body;
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
        //const { username, password } = req.body;
        return res.json({
            ok: true,
            msg:"delete post"
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
    updatePost,
    deletePost,
};