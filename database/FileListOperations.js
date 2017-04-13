var FileListItem = require('./FileDBModel');

//Save file list item in the database
var saveFileListItem = (file,callback) =>{
    //Create new schema instance
    var fileList = new FileListItem({
      fileName: file.name,
      fileType: file.type,
      updatedTime: file.updateTime,
      size: file.size
    });

    //Save file entry in the database
    fileList.save(function(err,data){
        callback(err,data);
    });
}

//Fetch file list from the database
var getFileList = function(req,res,next){
  //Fetch the file list from the database
    FileListItem.find({}, function(error, data){
      console.log(data);
      res.json(data);
  });
}

//Delete single file  items from the database
var deleteFile = function(req,res,next){
   console.log(req.params.id);
   //Remove single file list item with give ID
    FileListItem.remove({ _id: req.params.id}, function(err) {
    if (!err) {
        res.send('success!');
    }
    else {
        res.send('err!');
    }
  });
}

//Batch delete items from the database
var batchDelete = function(req,res,next){
   var ids = req.body.fileIds;
   var error;
   //Remove all items in the array of FileIDs
   ids.forEach(function(id){
       FileListItem.remove({ _id: id}, function(err) {
         if(err){
           error = err;
         }
       });
   });
   //Send success / error message
   if(!error) {
       res.send('success!');
   }
   else{
        res.send('err!');
   }
}

//Module Export definitions
module.exports.saveFileListItem = saveFileListItem;
module.exports.getFileList = getFileList;
module.exports.deleteFile = deleteFile;
module.exports.batchDelete = batchDelete;
