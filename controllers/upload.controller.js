const  User  = require('../models/User.model');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const uploadImageCloudinary = async(req, res = response) => {
    try {
        const { id } = req.body;
        user = await User.findById(id);

        if (user.image_url) {
            // Hay que borrar la imagen del servidor
            const nombreArr = user.image_url.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            cloudinary.uploader.destroy(public_id);
        }

        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
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
            msg: error
        });
    }

    
}


module.exports = {
    uploadImageCloudinary
}