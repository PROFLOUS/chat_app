const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const classifySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    conversionIds:[ObjectId],
    userId: ObjectId,
    color_code: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Classify', classifySchema);