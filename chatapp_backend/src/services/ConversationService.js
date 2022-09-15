const Conversation = require('../models/Conversation');
const Member = require('../models/Member');
const messageService = require('../services/MessageService');
const Message = require('../models/Message');
const commonUtils = require('../utils/commonUtils');
const ArgumentError = require('../exception/ArgumentError');


class ConversationService {


    async getConversationById(conversationId,userId,page, size){
        if (!conversationId || !size || page < 0 || size <= 0)
            throw new ArgumentError();

        

        const totalMessages =
        await Message.countDocumentsByConversationIdAndUserId(
            conversationId
        );

        const { skip, limit, totalPages } = commonUtils.getPagination(
            page,
            size,
            totalMessages
        );


        try {
            let messages = await Message.getListByConversationIdAndUserIdOfIndividual(conversationId,skip,limit);
            

            await Member.updateOne(
                { conversationId, userId },
                { $set: { lastView: new Date() } },

            );
            const member = await Member.findOne({conversationId, userId});
            const { lastView, isNotify } = member;
            const countUnread = await Message.countUnread(lastView, conversationId);
            console.log(countUnread);
            await member.updateOne({ $set: { numberUnread: countUnread } });

            return {
                data: messages,
                page,
                size,
                totalPages
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getAllConversation(userId,page, size){
        if (!userId || !size || page < 0 || size <= 0)
            throw new ArgumentError();

        // const member = await Member.findOne({conversationId, userId});
        // const { lastView, isNotify } = member;
        // const countUnread = await Message.countUnread(lastView, conversationId);

        // await member.updateOne({ $set: { numberUnread: countUnread } });

        const totalCon =
        await Conversation.countConversationByUserId(
            userId
        );

        const { skip, limit, totalPages } = commonUtils.getPagination(
            page,
            size,
            totalCon
        );

        const consId = await Conversation.find({
            "members.userId":{$in:[userId]},
        })

        consId.map(async(con) => {
            const {_id} =con;
            const member = await Member.find({
                conversationId:{$in:[_id]}
                , userId
            });
            console.log("1"+member);

            const { lastView } = member[0];
            const countUnread = await Message.countUnread(lastView, _id);
            console.log(countUnread);
            const mb = await Member.find({
                conversationId:{$in:[_id]}
                , userId
            });
            await mb[0].updateOne({ $set: { numberUnread: countUnread } });
            const mb2 = await Member.find({
                conversationId:{$in:[_id]}
                , userId
            });

            console.log("2"+mb2);



            // const rs = await Member.updateMany(
            //     { conversationId:{$in:[_id]}, userId },
            //     { $set: { numberUnread: countUnread } }
            // )



            // await member[0].updateOne(
            //     { $set: { numberUnread: countUnread } });
            // console.log(member[0]);
            
        });


        try {
            let conversations = await Conversation.getAllConversation(
                userId,
                skip,
                limit
            );


            return {
                data: conversations,
                page,
                size,
                totalPages
            }

        }catch (err) {
            console.log(err);
        }

    }

    

    
    // return id conversation
    async createIndividualConversation(user1, user2) {

        // const { userName1, userName2, conversationId } =
        //     await conversationValidate.validateIndividualConversation(
        //         userId1,
        //         userId2
        //     );

        // if (conversationId) return { _id: conversationId, isExists: true };

        // add new conversation
        const newConversation = new Conversation({
            name: user2.userLastName,
            avatar: user2.avaUser,
            members: [user1, user2],
            type: false,
        });
        const saveConversation = await newConversation.save();
        const { _id } = saveConversation;

        // tạo 2 member
        const member1 = new Member({
            conversationId: _id,
            userId: user1.userId,
        });

        const member2 = new Member({
            conversationId: _id,
            userId: user2.userId,
        });

        // save
        await member1.save()
        await member2.save();

        return { _id, isExists: false };
    }

    //create conversation when was friend
    async createIndividualConversationWhenWasFriend(user, sender) {
        const { _id, isExists } = await this.createIndividualConversation(
            user,
            sender
        );

        // tao loi chao mung
        const newMessage = new Message({
            content: 'Đã là bạn bè',
            type: 'NOTIFY',
            conversationId: _id,
        });

        const saveMessage = await messageService.addText(newMessage, user.userId);

        return { conversationId: _id, isExists , message: saveMessage};
    }




}

module.exports = ConversationService;