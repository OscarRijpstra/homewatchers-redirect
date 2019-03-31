const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const adminItemSchema = new Schema(
    {
        url: {type: String, required: true, minlength: 3, maxlength: 30},
        name: {type: String, required: true, minlength: 3, maxlength: 30}
    }
)

module.exports = mongoose.model('AdminItem', adminItemSchema);