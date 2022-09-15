const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


const memberSchema = new Schema({
  isNotify: {
    type: Boolean,
    default: true
  },
  lastView: {
    type: Date,
    default: Date.now()
  },
  numberUnread: {
    type: Number
  },
  userId: {
    type: ObjectId,
  },
  conversationId: {
    type: ObjectId,
  }
});

module.exports = mongoose.model('Member', memberSchema);