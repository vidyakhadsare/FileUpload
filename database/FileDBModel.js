var mongoose = require('mongoose');

//Define DB schema for File List
var fileList = new mongoose.Schema({
    fileName: String,
    fileType: String,
    updatedTime: Date,
    size: Number
});

//Export definition
module.exports = mongoose.model('fileList',fileList);
