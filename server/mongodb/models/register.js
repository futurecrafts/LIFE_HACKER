const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    token: { type: String, required: false },
    dateLoggedIn: { type: Date, required: false },
    dateCreated: { type: Date, required: false },
});
  
const RegisterModel = mongoose.model('RegisterModel', RegisterSchema);
  
module.exports = RegisterModel;