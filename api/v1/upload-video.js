const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const s3 = new AWS.S3({
  accessKeyId: 'AKIA6AQDAUTLSN6FMY72',
  secretAccessKey: 'k8srF3ONSOxf88F9j9Uryu/DqCuyhXLiFTqnUHxI',
  signatureVersion: 'v4',
  ACL: "public-read"
})
const uploadBucket = 'videosavebucket'  // Replace this value with your bucket name!   
const URL_EXPIRATION_SECONDS = 30000    // Specify how long the pre-signed URL will be valid for

// Main Lambda entry point
exports.handler = async (event) => {
  return await getUploadURL(event)
}

const getUploadURL = async function(event) {
  const randomID = parseInt(Math.random() * 100000000000)
  const Key = `${randomID}.mp4` // Random filename we will use when uploading files

  // Get signed URL from S3
  const s3Params = {
    Bucket: uploadBucket,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'video/*' // Change this to the media type of the files you want to upload
  }
  
  return new Promise((resolve, reject) => {
    // Get signed URL
    let uploadURL = s3.getSignedUrl('putObject', s3Params)
    resolve({
      "statusCode": 200,
      "isBase64Encoded": false,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      },
      "body": JSON.stringify({
          "uploadURL": uploadURL,
          "filename": Key
      })
    })
  })
}