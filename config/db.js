const mongoose = require('mongoose');
// const url = 'mongodb://127.0.0.1:27017/distributeStreaming';
const url = 'mongodb://3.83.132.156:27017/distributeStreaming';

exports.connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err, connection) => {
      if (!err) { 
        console.log('MongoDB Connection Succeeded.') 
        var videosSchema = new mongoose.Schema({
          title: {
              type: String,
              required: 'This field is required.'
          },
          tags: {
              type: String
          },
          link: {
              type: String
          },
          timestamp: {
              type: String
          }
        });
        
        try {
          mongoose.model('Videos', videosSchema);
          console.log("Schema is new!")
        } catch{
          console.log("Schema already created!")
        }
        
        resolve(connection)
      }
      else { 
        console.log('Error in DB connection : ' + err) 
        reject(err)
      }
    })
      
  });
};