const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

async function uploadFile(image_url, file) {
    try {
        if (image_url) {
            if (!image_url.includes('google') || !image_url.includes('https://res.cloudinary.com/dfgwlfz48/image/upload/v1648158055/descarga_1_eusudf.png')) {
                const nombreArr = image_url.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
                const [public_id] = nombre.split('.');
                cloudinary.uploader.destroy(public_id);
            }
        }
        const { tempFilePath } = file;

        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

        return secure_url

    } catch (e) {
        console.log("error to upload the file ", e);
        return false;
    }
}



module.exports = {
    uploadFile
};