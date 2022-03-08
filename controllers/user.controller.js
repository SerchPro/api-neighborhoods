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
    updateUser,
    deleteUser,
};