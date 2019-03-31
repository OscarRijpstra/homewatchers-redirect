const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {type: String, required: true, minlength: 8, maxlength: 30},
        password: {type: String, required: true, minlength: 60, maxlength: 60}
    }
)

module.exports = mongoose.model('User', userSchema);