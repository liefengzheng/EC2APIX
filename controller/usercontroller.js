var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
var User = require('../orm/user');

router.get('/v01/entry/count/segments/products', function(req,res){
    User.find({},function(err,User){
        if(err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(User);
    });
    // res.send('respond with a resource with segments');
});

function productsCallback(req,res,next){
    res.status(200).send("The call back function is triggered.");
}

router.get('/v01/entry/callback', productsCallback);

router.get('/v01/entry/count/segments/products/:paraname', function(req,res){
    User.findOne({'firstName':req.params.paraname},function(err,User){
        if(err) return res.status(500).send("There was a problem finding the users.");
        if (User == null){
            res.status(404).send('respond with no resource');
        }else{
            res.status(200).send(User);
        }
        
    });
    // res.send('respond with a resource with segments');
});

router.post('/v01/entry/count/segments/products', function(req,res){
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        country: req.body.country,
        province: req.body.province,    
        location: req.body.location,
        comment: req.body.comment
    },
    function(err,User){
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(User);
    }
    );
});
module.exports = router;
