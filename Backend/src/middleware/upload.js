import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "multivendor-products", // dossier sur Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // formats autorisés
  },
});

const parser = multer({ storage });

export default parser;

