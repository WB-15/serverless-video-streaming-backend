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
    const searchData = JSON.parse(event.body);
    const response = await connectDB().then(async (connection) => {
      return new Promise((resolve, reject) => {
        const Videos = mongoose.model('Videos');
        const conditions = []
        searchData.tags.map((tag) => {
          let condition = {'tags': {"$regex": tag, "$options": "i"}}
          conditions.push(condition)
        })
        console.log("Condition Result: ", conditions)

        Videos.find({$or: conditions}, (err, docs) => {
        // Videos.find({"tags": {"$regex": "test1", "$options": "i"}}, (err, docs) => {
          if (!err) {
            var res = {
              statusCode: 200,
              headers: util.getResponseHeaders(),
              body: JSON.stringify(docs),
            };
            resolve(res);
          } else {
            return reject(err)
          }

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
