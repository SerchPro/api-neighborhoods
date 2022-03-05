const { response } = require('express');

const Post = require("../models/Post.model"); // Require the User model in order to interact with the database


const createReview = async(req, res= response) =>{
    try {
        //const { username, password } = req.body;
        return res.json({
            ok: true,
            msg:"create review"
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};

const getReview = async(req, res= response) =>{
    try {
        //const { username, password } = req.body;
        return res.json({
            ok: true,
            msg:"get review"
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};


const updateReview = async(req, res= response) =>{
    try {
        //const { username, password } = req.body;
        return res.json({
            ok: true,
            msg:"update review"
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};


const deleteReview = async(req, res= response) =>{
    try {
        //const { username, password } = req.body;
        return res.json({
            ok: true,
            msg:"delete review"
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
    createReview,
    getReview,
    updateReview,
    deleteReview,
};