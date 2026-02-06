import multer from "multer";
import cloudinary from "../Config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

function Upload(foldername) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `E-commerce/${foldername}`,
      allowed_formats: ["jpg", "jpeg", "png"],
      transformation: [{ 
        width: 500,
         height: 500,
          crop: "limit"
     }],
    },
  });

  return multer({ storage });
}

export default Upload;
