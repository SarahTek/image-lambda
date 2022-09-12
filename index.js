const AWS = require('aws-sdk');

const S3 = new AWS.S3();

exports.handler = async (event) => {
  // TODO implement
  let { bucket, object } = event.Records[0].s3;
  // console.log(bucket, object);
  imgArray = [];
  try {
    let manifest = await S3.getObject({ Bucket: bucket.name, Key: 'images.json' }).promise();
    let json = JSON.parse(manifest.Body.toString());
    imgArray = json;

    let newObj = {
      image: object.key,
      size: object.size
    };
    imgArray.push(newObj);

  } catch (e) {
    console.log('Errorrrrr:', e);

    // what is the error?
    if (e.code == 'NoSuchKey') {
      let manifest = await S3.putObject({
        Bucket: bucket.name,
        Key: 'images.json',
        Body: JSON.stringify([{ name: object.key, size: object.size }]),
        ContentType: 'application/json'
      }).promise();
      console.log(manifest);
    }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(imgArray),
  };
  return response;
};
