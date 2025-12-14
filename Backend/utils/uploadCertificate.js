const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadCertificateToCloudinary = async (filePath, publicId) => {
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "raw",      // 👈 PDF ke liye MUST
    folder: "certificates/campus-quest",
    public_id: publicId,
  });

  // cleanup local file
  fs.unlinkSync(filePath);

  return result.secure_url;
};

module.exports = uploadCertificateToCloudinary;
