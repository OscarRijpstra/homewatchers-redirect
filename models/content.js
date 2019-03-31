const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const contentSchema = new Schema(
    {
        banner_src:  {type: String, minlength: 4, maxlength: 200},
        banner_text: {type: String, maxlength: 50},
        page_title: {type: String, required: true, minlength: 3, maxlength: 20},
        items: [
            {
                title: {type: String, maxlength: 20},
                img_src: {type: String, minlength: 4, maxlength: 200},
                text: {type: String, maxlength: 500}
            }
        ],
        page: {type: String, required: true, minlength: 3, maxlength: 30}
    }
)

module.exports = mongoose.model('Content', contentSchema);