const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {
        type: String, // String is shorthand for {type: String}
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

userSchema.plugin(uniqueValidator);


module.exports = mongoose.model("User", userSchema);