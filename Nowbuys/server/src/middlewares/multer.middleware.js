
import multer from 'multer';
import path from 'path';
import fs from 'fs'; 
import CryptoJS from 'crypto-js';

function functionFilename(req, file, callback) { 
    // Make another with file in here  

    let match = ["image/png", "image/jpeg"]; // Allow file upload is .png, jpg
    if (match.indexOf(file.mimetype) === -1) {
        return callback(`The file upload is invalid. Only allowed to upload image jpeg or png!`, null);
    } else {
        let name_file_encypt = CryptoJS.SHA256(file.originalname).toString();
        let extend_file = file.originalname.split('.')[file.originalname.split('.').length-1];
        
        let file_modified = `${Date.now()}-nowbuys-${name_file_encypt}.${extend_file}`;
    
        req.upload_file_name = file_modified;

        return callback(null, file_modified);
    }

}; 
 
let diskStorageTest = multer.diskStorage({
    destination: (req, file, callback) => {
        const url = path.join(process.cwd(), `/public/test/${req.session.user.id}`);
        fs.mkdirSync(url, { recursive: true });

        req.upload_folder_path = `${req.protocol}://${req.get('host')}/static/test/${req.session.user.id}/`;

        callback(null, url)
    },
    filename: functionFilename
});

let diskStorageAvatar = multer.diskStorage({
    destination: (req, file, callback) => {
        const url = path.join(process.cwd(), `/public/upload/${req.session.user.id}`);
        fs.mkdirSync(url, { recursive: true });

        callback(null, url)
    },
    filename: functionFilename
});


let uploadTest = multer({storage: diskStorageTest}).single("image"); // image is filename from client
let uploadAvatar = multer({storage: diskStorageAvatar}).single("image"); // image is filename from client


export { uploadTest, uploadAvatar }