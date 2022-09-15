const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const conversationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        required: true,
    },
    leaderId: {
        type: ObjectId,
    },
    lastMessageId:ObjectId,
    members: {
        type: [{
            userId: {
                type: ObjectId,
                required: true
              },
              userFistName: {
                type: String,
                required: true
              },
              userLastName: {
                type: String,
                required: true
              },
              avaUser: {
                type: String,
                required: true
              }
        }]
    },
    type:{
        type: Boolean,
        default: false,
    }
},
{timestamps: true}
);

conversationSchema.index({name: 'text'});

//check coveration co ton tai ko
conversationSchema.statics.existsIndividualConversation = async (
    userId1,
    userId2
) => {
    console.log("model");
    const conversation = await Conversation.findOne({
        type: false,
        members: { $all: [userId1, userId2] },
    });

    if (conversation) return conversation._id;
    return null;
};

conversationSchema.statics.getByIdAndUserId = async (
    _id,
    userId,
    message = 'Conversation'
) => {
    const conversation = await Conversation.findOne({
        _id,
        members: { $in: [userId] },
    });

    if (!conversation) throw new NotFoundError(message);

    return conversation;
};


//total conversation by userId 
conversationSchema.statics.countConversationByUserId = async (
    userId,
) => {
    const totalCon = await Conversation.countDocuments({
        "members.userId":{$all:[ObjectId(userId)]}
    });

    return totalCon;
};

conversationSchema.statics.getAllConversation = async (
    userId,
    skip,
    limit
) => {
    const getAll = await Conversation.aggregate([
        {
            $match: {
                    "members.userId":{$all:[ObjectId(userId)]}
            },
        },
        {
            $lookup: {
                from: 'messages',
                localField: 'lastMessageId',
                foreignField: '_id',
                as: 'lastMessage',
            },
        },
        {
            $lookup: {
                from: 'members',
                localField: '_id',
                foreignField: 'conversationId',
                as: 'mb',
            },
        },
        {
            $unwind:"$mb"
        },
        {
             $match: {
                  "mb.userId":ObjectId(userId)
              },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                avatar: 1,
                countUnread: 1,
                lastMessage: {
                    content: 1,
                    type: 1,
                    updatedAt: 1,
                },
                mb:{
                    numberUnread: 1,
                  }
            },
        },
        {
          $sort: {
            "lastMessage.updatedAt": -1,
          },
        },
        {
            $skip: skip,
        },
        {
            $limit: limit,
        },
        
    ]);
    return getAll;
};


const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;



