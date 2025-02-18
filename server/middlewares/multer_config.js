import multer from "multer";
import multers3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

// add the screts
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const s3ServicePointer = new aws.S3();

const mystorage = multers3({
  s3: s3ServicePointer,
  acl: "public-read",
  bucket: process.env.BUCKET_NAME,
  contentType: multers3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    return cb(null, req.user._id);
  },
});

const upload = multer({
  storage: mystorage,
});

export default upload;
