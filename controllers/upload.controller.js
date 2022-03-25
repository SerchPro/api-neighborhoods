const { uploadFile } = require('../helpers/upload-file');
const  User  = require('../models/User.model');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const uploadImageCloudinary = async(req, res = response) => {
    try {
        const { id } = req.body;

        user = await User.findById(id);
        secure_url = await uploadFile(user.image_url, req.files.archivo);
        
        user.image_url = secure_url;
        await user.save();

        return res.json({
            ok: true,
            image_url:user.image_url
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: "something went wrong"
        });
    }

    
}


module.exports = {
    uploadImageCloudinary
}