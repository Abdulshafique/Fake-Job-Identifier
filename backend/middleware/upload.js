const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const processImage = async (req, res, next) => {
    if (!req.file) return next();

    try {
        const imageBuffer = await sharp(req.file.buffer)
            .resize({ width: 800, height: 800, fit: 'cover' })
            .toBuffer();
        req.file.buffer = imageBuffer;
        next();
    } catch (error) {
        res.status(500).send('Error processing image: ' + error.message);
    }
};

module.exports = { upload, processImage };