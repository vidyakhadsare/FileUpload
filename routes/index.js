var express = require('express');
var logger = require('../utils/logger');
var constants = require('../utils/constants');
var utils = require('../utils/utils');
var path = require('path');
var fs = require('fs');
var util = require('util');
var _ = require('lodash');
var FileList = require('../database/FileListOperations');

var router = express.Router();
var upload = utils.getMulter();

//*********************  Node js routing ***************************/
//File upload route
router.post('/files/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      logger.l.log(logger.LEVEL.ERROR, 'Upload failed', err);
      res.status(500).send();
    }
    logger.l.log(logger.LEVEL.INFO, 'Upload succeeded');
    var error;
    var filesInfo = [];

    //If file upload is scuccessful, save it in the DB
    _.each(req.files, function(file) {
      fileStat = fs.statSync(file.path);
      var info = {
        name: file.originalname,
        size: (file.size / 1048576).toFixed(5),
        type: file.mimetype,
        updateTime: fileStat.mtime.getTime()
      };
      //Call save function to save file entry in DB
      FileList.saveFileListItem(info,function(err,data){
        error = err;
      });
    });
    if(error){
      res.send(err);
    }
    else {
      res.status(200).send(filesInfo);
    }
  });
});

//Get File List route
router.get('/files',FileList.getFileList);

//Delete Single File route
router.delete('/files/:id',FileList.deleteFile);

//Batch Delete route
router.post('/files/batch',FileList.batchDelete);

router.all(function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

//Module Export definition
module.exports = router;
