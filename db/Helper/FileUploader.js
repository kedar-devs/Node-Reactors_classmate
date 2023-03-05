const streamifier = require('streamifier')
const cloudinary = require('cloudinary').v2
exports.UploadFile=(req)=>{
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
      streamifier.createReadStream(req.data).pipe(stream);
    });
}