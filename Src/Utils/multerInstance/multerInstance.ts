import multer from "multer";
import fs from "fs";
import path from "path";

const storage = (entity) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = `./uploads/${entity}`;
      fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Generate a unique filename for the uploaded file
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extname = path.extname(file.originalname);
      cb(null, `${entity}-${uniqueSuffix}${extname}`);
    },
  });
};
const uploadImage = (entity) =>
  multer({ storage: storage(entity) }).single("image");

export default uploadImage;
