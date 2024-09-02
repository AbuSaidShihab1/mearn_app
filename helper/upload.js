const cloudinary = require("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name:"dwukwvqbl",
  api_key: "173591496731661",
  api_secret:"nVx81_IOpwrkIgpIoYC-PsU7IPw"
});

const uploadFile = async(filePath) => {

    try {
        
        const result = await cloudinary.uploader.upload(filePath);
        console.log(result)
        return result;
    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    uploadFile
}