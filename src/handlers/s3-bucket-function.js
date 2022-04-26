const AWS = require('aws-sdk');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME } = require('../../env.json').getXMLDataAndStoreToS3Function;

// initialize the S3 bucket
exports.getS3 = () => {
  return new AWS.S3({
    apiVersion: '2006-03-01',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });
};

// upload the JSON data to S3 bucket
exports.uploadJsonDataToS3Bucket = (key, payload) => {
  return new Promise((resolve, reject) => {
    try {
      // create the S3 bucket
      const s3 = this.getS3();
      // generate the payload
      const params = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: key,
        Body: payload,
      };

      // upload the payload to S3
      s3.upload(params, (err, _s3response) => {
        if (err) {
          reject(err.message);
        }
        resolve({
          statusCode: 200,
          filePath: `${key}`,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};
