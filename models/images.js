const mongoose = require('mongoose');

const imageNames = mongoose.Schema({
    name: {type: String, default: ''},
    album: {type: String, default: ''},
    image: {type: String, default: 'default.png'},
    fans: [{
        username: {type: String, default: ''},
        email: {type: String, default: ''}
    }]
});

module.exports = mongoose.model('Image', imageNames);