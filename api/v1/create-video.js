const { connectDB } = require('../../config/db')
const mongoose = require('mongoose');
const util = require("./utils");

module.exports.handler = async (event) => {
  if (util.checkAuth(event.headers.Authorization) == null){
    var result = {
      statusCode: 401,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({
        message: "UnAuthorized!" 
      }),
    };
    return result
  }
  
  try {
    const videoData = JSON.parse(event.body);
    const currentTime = util.getCurrentDataTime();
    const response = await connectDB().then(async (connection) => {
      return new Promise((resolve, reject) => {
        const Videos = mongoose.model('Videos');
        let videos = new Videos()
        videos.title = videoData.title
        videos.tags = videoData.tags
        videos.link = videoData.link
        videos.timestamp = currentTime

        videos.save((err, doc) => {
          if (err) return reject(err);
          var res = {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({ message: "successfully created" }),
          };
          resolve(res);
        });
      });
    });
    return response;
  } catch (err) {
    console.log("Encountered an error:", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};
