var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
var TealiumStatus = require('../orm/tealiumstatus');

var reStatus = require('../orm/status');

router.post('/1/v01/entry/segments/:distributionType/:systemDate', function(req, res, next){
    console.log(req.body.a);
    
    TealiumStatus.create({
        batchymd: req.params.systemDate,
        batchtime: '000000',
        mikomi: '',
        status: 0,
        numfile: 5,    
        start: 0,
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

router.get('/1/v01/entry/count/segments/:distributionType/:systemDate', function(req, res, next){
    // console.log(req.params.distributionType);
    // console.log(req.params.systemDate);
    TealiumStatus.findOne({'batchymd':req.params.systemDate, 'distriutiontype':req.params.distributionType},function(err,tealiumStatus){
        if(err) return res.status(500).send("There was a problem finding the users.");
        if (tealiumStatus == null){
            res.status(404).send('respond with no resource');
        }else{
            // let obj = new Status(tealiumStatus.start,tealiumStatus.pending,tealiumStatus.completed,tealiumStatus.failed)
            var obj = new reStatus(tealiumStatus.start,tealiumStatus.pending,tealiumStatus.completed,tealiumStatus.failed);
            // console.log(obj);
            res.status(200).send(obj);
        }
    });
});

module.exports = router;