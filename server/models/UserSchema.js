const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username         : String,
    password         : String,
    firstName        : String,
    lastName         : String,
    email            : String,
    provider         : String,
	  provider_id      : String,
    date_of_birthday : Date,
    createdAt        : {type : Date, default: Date.now},
    categories       : [String],
    experience       : [Number],
    role             : [String],
    facebook         : {id: String, token: String, email: String, name: String}
});

module.exports = UserSchema;
