import path from 'path'
import express from "express";
import multer from 'multer';

const router = express.Router();

// Create disk storage engine:
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Verify file type
const checkFileType = (file, cb) => {
    // Define allowed file types
    const fileTypes = /jpg|jpeg|png/;
    // Check input file type
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check media type
    const mimeType = fileTypes.test(file.mimeType);
    if (mimeType && extname) {
        return cb(null, true);
    } else {
        cb(new Error('jpg, jpeg, or png type only'));
    }
}
// Upload
const upload = multer({
    storage,
    // fileFilter: function (req, file, cb) {
    //     checkFileType(file, cb);
    // }
})

// Create file upload router
router.post('/', upload.single('image'), (req, res)=> {
    res.send('/'+req.file.path);
})
export default router;