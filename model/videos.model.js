const mongoose = require('mongoose');

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

mongoose.model('Videos', videosSchema);