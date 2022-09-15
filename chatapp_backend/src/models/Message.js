const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const messageSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    conversationId: {
        type: ObjectId,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    reacts: {
        type: [
            {
                userId: ObjectId,
                type: {
                    type: Number,
                    enum: [0, 1, 2, 3, 4, 5, 6],
                },
            },
        ],
        default: [],
    },
    replyMessageId: {
        type: ObjectId,
    },
    type: {
        type: String,
        enum: [
            'TEXT',
            'IMAGE',
            'STICKER',
            'VIDEO',
            'FILE',
            'HTML',
            'NOTIFY',
            'VOTE',
        ],
        require: true,
    },
    createdAt: Date,
    updatedAt: Date,


},
    { timestamps: true }
);

//total message 
messageSchema.statics.countDocumentsByConversationIdAndUserId = async (
    conversationId,
) => {
    const totalMessages = await Message.countDocuments({
        conversationId,
    });

    return totalMessages;
};
//list conversation individual
messageSchema.statics.getListByConversationIdAndUserIdOfIndividual = async (
    conversationId,
    skip,
    limit
) => {
    const messages = await Message.aggregate([
        {
            $match: {
                conversationId: ObjectId(conversationId),
            },
        },
        {
            $lookup: {
                from: 'conversations',
                localField: 'conversationId',
                foreignField: '_id',
                as: 'conversations',
            },
        },
        {
            $project: {
                userId: 1,
                conversationId: 1,
                conversations: {
                    _id: 1,
                    name: 1,
                    avatar: 1,
                    members: 1,
                    numberUnread: 1,
                },
                content: 1,
                type: 1,
                createdAt: 1,
                updatedAt: 1,
            },
        },
        {
            $skip: skip,
        },
        {
            $limit: limit,
        },
        
    ]);
    return messages;
};

messageSchema.statics.countUnread = async (time, conversationId) => {
    return await Message.countDocuments({
        createdAt: { $gt: time },
        conversationId,
    });
};

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;