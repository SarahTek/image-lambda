const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  let bucket = event.Records[0].s3.bucket.name;
  let key = 'images'
}
