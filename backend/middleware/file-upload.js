const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v1: uuid } = require('uuid');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'eu-west-2',
});

const s3 = new aws.S3();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
};

const fileUpload = multer({
  limits: 500000,
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: 'FILE_META_DATA' });
    },
    key: (req, file, cb) => {
      cb(null, uuid());
    },
  }),

  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');

    cb(error, isValid);
  },
});

module.exports = fileUpload;
