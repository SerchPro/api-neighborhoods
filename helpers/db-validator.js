
const Usuario = require('../models/User.model');
const Category = require('../models/Category.model');
const Post = require('../models/Post.model');
const Review = require('../models/Review.model')

const emailExists = async(email) => {
    const user = await Usuario.findOne({ email });
    if (user) {
        throw new Error(`the email: ${ email } is already registered`)
    }
}

const usernameExists = async( username ) => {
    const user = await Usuario.findOne({ username });
    if (user) {
        // If the user is found, send the message username is taken
        throw new Error(`the username: ${ username } already taken.`)
    }
}

const categoryExists = async( _id ) =>{
    console.log("hello", _id);
    try{
        const category = await Category.findById({ _id });
        if ( !category ) throw new Error(`the category: ${ category } doesnt exist.`)
    }catch(err){
        console.log(err)
        throw new Error(`Error to validate category`)
    }
    
}

const userExists = async( _id ) =>{
    const user = await Usuario.findById({ _id });
    if ( !user ) {
        throw new Error(`the user: ${ user } doesnt exist.`)
    }
}

const postExists = async( _id ) =>{
    const post = await Post.findById({ _id });
    if ( !post ) {
        throw new Error(`the post: ${ post } doesnt exist.`)
    }
}

const reviewExists = async( _id ) =>{
    const post = await Review.findById({ _id });
    if ( !post ) {
        throw new Error(`the Review: ${ Review } doesnt exist.`)
    }
}

module.exports = {
    emailExists,
    usernameExists,
    categoryExists,
    userExists,
    postExists,
    reviewExists
}