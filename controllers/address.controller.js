const { response } = require('express');
const Address = require("../models/Address.model")
const axios = require("axios");


const getListNeighborhoods = async(req, res= response) => {
    try {
        const { idUser } = req.params;

        const [count, address] = await Promise.all(
            [
                Address.countDocuments({_user: idUser,  active: true }),
                Address.find({ _user: idUser, active: true }, '_id neighborhood description')
                .sort({createdAt: -1})
            ]);

        return res.json({
            ok:true,
            count,
            address
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "something went wrong"
        });
    }
};


const createNeighborhood = async(req, res= response) => {
    try {
        const { neighborhood, description , idUser, cp} = req.body;
        const data = {
            neighborhood,
            description,
            _user: idUser,
            cp
        }
        const address = await Address.create(data)
        /*await axios.put(`${process.env.NEIGHBORHOODS_URI}/user/${idUser}/addAddress`, {
            "idAddress": address._id
        });*/

        const addressSent = await Address.findOne({ _id: address._id, active: true }, '_id neighborhood description')

        return res.json({
            ok:true,
            address: addressSent
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "something went wrong"
        });
    }
};

const updateNeighborhood = async(req, res= response) => {
    try {
        const {idNeighborhood} = req.params;
        const { description } = req.body;

        const data = {
            description
        };

        const address = await Address.findByIdAndUpdate(idNeighborhood, data, { new: true});

        return res.json({
            ok:true,
            address
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
    getListNeighborhoods,
    createNeighborhood,
    updateNeighborhood
};