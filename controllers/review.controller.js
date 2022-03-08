const { response } = require('express');

const Post = require("../models/Post.model");
const Review = require("../models/Review.model");


const createReview = async(req, res= response) =>{
    try {
        const { title, comment, userID, idPost } = req.body;

        const review = Review.create({ title, comment, _user:userID, _post:idPost })
        return res.json({
            ok: true,
            msg:"review created"
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
        const { id } = req.params;
        const review = await Review.findOne({ _id:id, active: true})
                .populate('_user', 'username email image_url');
        console.log(review)

        return res.json({
            ok: true,
            review
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};

const getReviewsPost = async(req, res= response) =>{
    try {
        const { id } = req.params;
        const { skip = 0, limit = 5 } = req.query;
        const [count, reviews] = await Promise.all(
            [
                Review.countDocuments({ active: true }),
                Review.find({ active: true })
                //.populate('usuario', 'nombre')
                //.populate('categoria', 'nombre')
                .skip(Number(skip))
                .limit(Number(limit))
            ]);
        return res.json({ 
            count, reviews 
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
        const { id } = req.params;
        const {title , comment } = req.body;

        if(!title && !comment){
            console.log("no parameters")
            return res.status(400).json({
                ok:false,
                msg: `missing parameteres to update a review`
            });
        }

        const dataupdate = {};

        if ( title) dataupdate.title = title;
        if ( comment) dataupdate.comment = comment;

        console.log("??", dataupdate)

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
            msg: error
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
            msg: error
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