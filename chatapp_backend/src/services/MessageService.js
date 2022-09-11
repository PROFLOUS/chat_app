const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const MyError = require('../exception/MyError');
const User = require('../models/User');
const commonUtils = require('../utils/commonUtils');
const MessageService ={

    //get list messages of conversationId
    getList:async(conversationId,userId,page,size)=>{
        if (!conversationId || !userId || !size || page < 0 || size <= 0)
            throw new ArgumentError();

        const conversation = await Conversation.getByIdAndUserId(
            conversationId,
            userId
        );
        //tong so message
        const totalMessages =
            await Message.countDocumentsByConversationIdAndUserId(
                conversationId,
                userId
            );
        //phan trang
        const { skip, limit, totalPages } = commonUtils.getPagination(
            page,
            size,
            totalMessages
        );
        //lay danh sach message
        let messages;
        
        //neu conversation la group
        if (conversation.type) {
            const messagesTempt =
                await Message.getListByConversationIdAndUserIdOfGroup(
                    conversationId,
                    userId,
                    skip,
                    limit
                );

            messages = messagesTempt.map((messageEle) =>
                messageUtils.convertMessageOfGroup(messageEle)
            );
            
        } else {
            const messagesTempt =
                await Message.getListByConversationIdAndUserIdOfIndividual(
                    conversationId,
                    userId,
                    skip,
                    limit
                );
            messages = messagesTempt.map((messageEle) =>
                messageUtils.convertMessageOfIndividual(messageEle)
            );
        }

        // await lastViewService.updateLastViewOfConversation(
        //     conversationId,
        //     userId
        // );

        return {
            data: messages,
            page,
            size,
            totalPages,
        };
        
    },

    // async getById(_id, type) {
    //     if (type) {
    //         const message = await Message.getByIdOfGroup(_id);

    //         return messageUtils.convertMessageOfGroup(message);
    //     }

    //     const message = await Message.getByIdOfIndividual(_id);
    //     return messageUtils.convertMessageOfIndividual(message);
    // },



    // send text
    addText:async(message, userId) => {

        const { conversationId } = message;

        const newMessage = new Message({
            userId,
            ...message,
        });

        // lưu xuống
        const saveMessage = await newMessage.save();

        return saveMessage;
    },

    // async updateWhenHasNewMessage(saveMessage, conversationId, userId) {
    //     const { _id } = saveMessage;

    //         await Conversation.updateOne(
    //             { _id: conversationId },
    //             { lastMessageId: _id }
    //         );

    //         await lastViewService.updateLastViewOfConversation(
    //             conversationId,
    //             userId
    //         );

    //     const { type } = await Conversation.findById(conversationId);

    //     return await this.getById(_id, type);
    // }

}

module.exports = MessageService;