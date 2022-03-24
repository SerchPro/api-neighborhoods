const { response } = require('express');

const Category = require("../models/Category.model");


const createCategory = async(req, res= response) =>{
    try {
        const { name } = req.body;
        const category = await Category.create({name});

        return res.status(201).json({
            ok:true,
            category
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};
const getAllCategory = async(req, res = response) =>{
    try {
        const [Ncategories, categories ] = await Promise.all(
            [
                Category.countDocuments({ active: true }),
                Category.find({ active: true }, '_id, name')
            ]);
        return res.status(201).json({
            ok:true,
            Ncategories,
            categories
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
}

const getCategory = async(req, res = response) =>{
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        res.json({
            ok: true,
            category
        });;

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};

//bc670
const updateCategory = async(req, res = response) => {
    try {
        const { name, id } =  req.body;
        const category = await Category.findByIdAndUpdate(id, {name}, {new:true});

        res.json({
            ok: true,
            category
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: error
        });
    }
};

const deleteCategory = async (req, res = response) => {

    try {
        const {id}  = req.body;
        const category = await Category.findByIdAndUpdate(id, {active:false}, {new:true});
        return res.json({
            ok: true,
            category
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
    createCategory,
    getCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
};