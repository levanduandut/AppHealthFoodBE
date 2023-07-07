const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config({
    cloud_name: 'dbmp6vjoe',
    api_key: '144544153581334',
    api_secret: 'cclwx65wg5Hirc_bzxHGf7RSi1I'
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpg', 'png', 'jpeg'],
    params: {
        folder: 'healthfood',
        // format: async (req, file) => 'png', // supports promises as well
        // public_id: (req, file) => 'computed-filename-using-request',
    },
})
const uploadCloud = multer({ storage })
module.exports = uploadCloud;