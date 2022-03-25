const { response } = require('express');
const Post = require("../models/Post.model");
const Review = require("../models/Review.model");
const axios = require("axios");


const createReview = async(req, res= response) =>{
    try {
        const { comment, userID, idPost } = req.body;

        const review = await Review.create({ comment, _user:userID, _post:idPost });
        const addReviewTopost = await axios.post(`${process.env.NEIGHBORHOODS_URI}/post/${idPost}/addReviewPost`, {
            "idReview": review._id
        });

        const newReview = await Review.findOne({ _id:review._id, active: true})
        .populate('_user', 'username email image_url');

        return res.json({
            ok: true,
            review:newReview
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "someting went wrong"
        });
    }
};

const getReview = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const review = await Review.findOne({ _id:id, active: true})
                .populate('_user', 'username email image_url');

        return res.json({
            ok: true,
            review
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "something went wrong"
        });
    }
};

const getReviewsPost = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const { skip = 0, limit = 5 } = req.query;
        const [count, reviews] = await Promise.all(
            [
                Review.countDocuments({  _post: id,active: true }),
                Review.find({_post: id, active: true })
                    .sort({createdAt: -1})
                    .populate('_user', 'username email image_url')
                .skip(Number(skip))
                .limit(Number(limit))
            ]);
        return res.json({
            ok:true,
            count,
            reviews
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "something went wrong"
        });
    }
};

const updateReview = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const {title , comment } = req.body;

        if(!title && !comment){
            return res.status(400).json({
                ok:false,
                msg: `missing parameteres to update a review`
            });
        }

        const dataupdate = {};

        if ( title) dataupdate.title = title;
        if ( comment) dataupdate.comment = comment;

        const newReview = await Review.findByIdAndUpdate(id, dataupdate , { new: true});

        return res.json({
            ok: true,
            msg:"update review",
            newReview
        });
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "something went wrong"
        });
    }
};


const deleteReview = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndUpdate(id, {active: false}, { new: true});
        
        return res.json({
            ok: true,
            msg:"delete review",
            review
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
    createReview,
    getReview,
    getReviewsPost,
    updateReview,
    deleteReview,
};