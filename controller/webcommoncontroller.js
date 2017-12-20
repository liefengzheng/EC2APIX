var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
var fs = require("fs");
var path = require('path');
var TealiumStatus = require('../orm/tealiumstatus');

var reStatus = require('../orm/status');

router.post('/stg/v01/entry/segments/:distributionType/:systemDate', function(req, res, next){
    console.log(req.body.a);
    
    TealiumStatus.create({
        batchymd: req.params.systemDate,
        batchtime: '000000',
        mikomi: '',
        status: 0,
        numfile: 5,    
        ready: 0,
        pending: 0,
        completed: 0,
        failed: 0,
        distriutiontype: req.params.distributionType
    },
    function(err,tealiumStatus){
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
    }
    );

    var reLimit = req.query.limit;
    if (reLimit === undefined){
        res.status(200).send('there is no limit parameter.');
    }else{
        res.status(200).send('post with a segments');
    }
});

router.get('/stg/v01/entry/count/segments/:distributionType/:systemDate', function(req, res, next){
    // console.log(req.params.distributionType);
    // console.log(req.params.systemDate);
    TealiumStatus.findOne({'batchymd':req.params.systemDate, 'distriutiontype':req.params.distributionType},function(err,tealiumStatus){
        if(err) return res.status(500).send("There was a problem finding the users.");
        if (tealiumStatus == null){
            res.status(404).send('respond with no resource');
        }else{
            // let obj = new Status(tealiumStatus.start,tealiumStatus.pending,tealiumStatus.completed,tealiumStatus.failed)
            var obj = new reStatus(tealiumStatus.ready,tealiumStatus.pending,tealiumStatus.completed,tealiumStatus.failed);
            // console.log(obj);
            res.status(200).send(obj);
        }
    });
});

router.get('/stg/v01/entry/error/segments/:distributionType/:systemDate', function(req, res, next) {

  var filename = '.\\data\\FailedList.zip';

  var boundaryKey = Math.random().toString(16);
  res.status(200);
  res.setHeader('Content-type', 'multipart/form-data; boundary="' + boundaryKey + '"' );
  // res.setHeader('Content-disposition', 'attachment; filename=' + filename);   
  res.write('--' + boundaryKey + '\r\n'
  // "filename" is the name of the original file
  + 'Content-Disposition: attachment; filename=' + path.basename(filename) + '\r\n'
  // + 'Content-Transfer-Encoding: binary\r\n\r\n' 
  + '\r\n');

  fs.createReadStream(filename, { bufferSize: 4 * 1024 }
    ).on('end',function(){
        res.end('\r\n--' + boundaryKey + '--');
    })
    .pipe(res,{end:false}); 
  
});

module.exports = router;