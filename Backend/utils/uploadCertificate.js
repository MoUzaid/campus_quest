const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadCertificateToCloudinary = async (filePath, publicId) => {
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "raw",     
    folder: "certificates/campus-quest",
    public_id: publicId,
  });


  fs.unlinkSync(filePath);

  return result.secure_url;
};

module.exports = uploadCertificateToCloudinary;
