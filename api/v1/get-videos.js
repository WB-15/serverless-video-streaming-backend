
const util = require("./utils");
const { connectDB } = require('../../config/db')
const mongoose = require('mongoose');

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
    const response = await connectDB().then(async (connection) => {
      return new Promise((resolve, reject) => {
        const Videos = mongoose.model('Videos');
        Videos.find((err, docs) => {
          if (err) return reject(err);
          var res = {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(docs),
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
      headers: util.getResponseHqeaders(),
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};
