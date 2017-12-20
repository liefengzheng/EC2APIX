var app = require('./app');
var port = process.env.port || 3000;

var server = app.listen(port,function(){
    console.log('EC2 list RESTful API server started on: ' + port);
});

// var fs = require('fs');
// var key = fs.readFileSync('encryption/private.key');
// var cert = fs.readFileSync( 'encryption/primary.crt' );
// var ca = fs.readFileSync( 'encryption/intermediate.crt' );
// var options = {
//   key: key,
//   cert: cert,
//   ca: ca
// };
// var https=require('https');
// https.createServer(null, app).listen(3001);


