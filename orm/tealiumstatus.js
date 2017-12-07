var mongoose = require('mongoose');
var TealiumStatusSchema = new mongoose.Schema({
    batchymd: String,
    batchtime: String,
    mikomi: String,
    status: String,
    numfile: String,
    start: String,
    pending: String,
    completed: String,
    failed: String,
    distriutiontype: String
},{collection:'tealiumstatus'});

module.exports = mongoose.model('tealiumstatus',TealiumStatusSchema);