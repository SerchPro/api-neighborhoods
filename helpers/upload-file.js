const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

async function uploadFile(image_url, file) {
    try {
        if (image_url) {
            if (!image_url.includes('google') || !image_url.includes('notFound_wpeppw.jpg')) {
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


async function uploadFiles(images, file) {
    const dataResponse = {
        url : '',
        error: true
    };
    try {

        const { tempFilePath } = file;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        dataResponse.url = secure_url;
        dataResponse.error = false

        return dataResponse

    } catch (e) {
        console.log("error to upload the file ", e);
        return dataResponse;
    }
}
module.exports = {
    uploadFile,
    uploadFiles
};