const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Easy learn",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const fileFilter = (req, file, cb) => {
  if (!["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
    return cb(new Error("File is not an image"));
  }
  return cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      if (err.message === "File is not an image")
        return res.json({ imageError: "Selected file is not an image" });
    }
    return next();
  });
};
