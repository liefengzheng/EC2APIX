var mongoose = require('mongoose');
var EALogSchema = new mongoose.Schema({
    logymd: String,
    logno: String,
    logstatus: String,
    logfilename: String
},{collection:'weblog'});

module.exports = mongoose.model('eventaudiencelog',EALogSchema);