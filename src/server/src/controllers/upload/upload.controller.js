
import { UploadModel } from '../../models/index.js'

import { uploadAvatar } from '../../middlewares/multer.middleware.js';

export default new class UploadController {

    // [POST] /api/upload/test/update
    updateTest(req, res) { 
        // Thực hiện upload file, truyền vào 2 biến req và res
        uploadTest(req, res, (error) => {
            setTimeout(() => {
                if (error) {
                    console.log(error);
                    return  res.status(500).json({message: "Error"})
                }
                return res.status(200).json({
                    message: 'success!',
                    url_file: req.upload_folder_path+req.upload_file_name
                })
            }, [1000])
        }); 
    }

    // [POST] /api/upload/avatar/update
    updateAvatar(req, res) { 
        // Thực hiện upload file, truyền vào 2 biến req và res
        uploadAvatar(req, res, (error) => {
            if (error) {
                console.log(error);
                return  res.status(500).json({message: "Error"})
            }
            return res.status(200).json({
                message: 'success!',
                url_file: req.upload_folder_path+req.upload_file_name
            })
        }); 
    }
 
}