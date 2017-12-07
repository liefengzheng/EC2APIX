var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    country: String,
    province: String,
    location: String,
    comment: String
},{collection:'User'});

module.exports = mongoose.model('User',UserSchema);