var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
var fs = require("fs");
var path = require('path');
var moment = require('moment');
var EALog = require("../orm/eventaudiencelog");

const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
  };

router.get("/obsolete/stg/v01/tealium/log", function(req, res, next) {
  var date = moment(new Date());
  var formattedDate = date.format("YYYYMMDD");
  var sended = 0;
  EALog.findOne({ logymd: formattedDate, logstatus: sended }, function(err,ealog)
  {
    if (err)
      return res.status(500).send("There was a problem finding the ealog.");
    if (ealog == null) {
      res.status(404).send("There is no file to be send.");
    } else {
        var filename = ealog.logfilename;
        fs.exists(filename, function(exist) {
        if (!exist) {
          // if the file is not found, return 404
          res.statusCode = 404;
          res.end(`File ${filename} not found!`);
          return;
        }
        var boundaryKey = Math.random().toString(16);
        // read file from file system
        fs.readFile(filename, function(err, data) {
          if (err) {
            res.status(500);
            res.end(`Error getting the file: ${err}.`);
          } else {
            // update status from 0->1(new->sent)
            EALog.update({_id:ealog._id},{logstatus:1}, {upsert:true}, function(err, obj){
                if (err) return res.send(500, { error: err });
            });
            // based on the URL path, extract the file extention. e.g. .js, .doc, ...
            const ext = path.parse(filename).ext;
            // if the file is found, set Content-type and send data
            res.status(200);
            res.setHeader("Content-type", "multipart/form-data" || "text/plain");
            res.end(data);
          }
        });
      });
    }
  });
});

router.get('/stg/v01/tealium/log', function(req, res, next) {
  var date = moment(new Date());
  var formattedDate = date.format("YYYYMMDD");
  var sended = 0;
  EALog.findOne({ logymd: formattedDate, logstatus: sended }, function(err,ealog)
  {
    if (err)
      return res.status(500).send("There was a problem finding the ealog.");
    if (ealog == null) {
      res.status(404).send("There is no file to be send.");
    } else {
        var filename = ealog.logfilename;
        fs.exists(filename, function(exist) {
        if (!exist) {
          // if the file is not found, return 404
          res.statusCode = 404;
          res.end(`File ${filename} not found!`);
          return;
        }
        // read file from file system
        EALog.update({_id:ealog._id},{logstatus:1}, {upsert:true}, function(err, obj){
                if (err) return res.send(500, { error: err });
            });

        var boundaryKey = Math.random().toString(16);
        res.status(200);
        res.setHeader('Content-type', 'multipart/form-data; boundary="' + boundaryKey + '"' );
        // res.setHeader('Content-disposition', 'attachment; filename=' + filename);   
        res.write('--' + boundaryKey + '\r\n'
          // "filename" is the name of the original file
          + 'Content-Disposition: attachment; filename='+ path.basename(filename) + '\r\n'
          // + 'Content-Transfer-Encoding: binary\r\n\r\n' 
          + '\r\n');

        fs.createReadStream(filename
          , { bufferSize: 4 * 1024 }
          ).on('end',function(){
            res.end('\r\n--' + boundaryKey + '--');
        })
        .pipe(res,{end:false}); 
      });
    }
  });
});

module.exports = router;
