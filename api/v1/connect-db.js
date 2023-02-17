const util = require("./utils");
const { connectDB } = require("../../config/db");

module.exports.handler = async (event) => {
  console.log(event.headers.Authorization)
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

  var response = await connectDB().then(async (connection) => {
    return new Promise((resolve, reject) => {
      response = {
        statusCode: 200,
        headers: util.getResponseHeaders(),
        body: JSON.stringify({
          message: "Success" 
        }),
      };
  
      resolve(response)
    });
  })

  console.log("Console is working!")
  return response;
}