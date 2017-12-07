var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ec2api', { useMongoClient: true }, function(err)
{
    if(err)console.log(mongoose.connection.readyState);
    console.log('connection is ok.');
});

module.exports = mongoose;
