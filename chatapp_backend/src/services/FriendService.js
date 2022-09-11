const User = require('../models/User');
const Friend = require('../models/Friend');
const FriendReq = require('../models/FriendRequest');
const ConversationService = require('./ConversationService');
const MyError = require('../exception/MyError');


const FriendService = {
    getList:async(name,_id)=> {

    },

    acceptFriend:async(_id, senderId)=> {

        //check co ton tai loi moi
        // await FriendReq.checkByIds(senderId, _id);

        // check đã là bạn 
        // if (await Friend.existsByIds(_id, senderId))
        //     throw new MyError('Friend exists');

        // delete invite
        // await FriendRequest.deleteOne({ senderId, receiverId: _id });

        // add friend
        const friend = new Friend({ userIds: [_id, senderId] });
        await friend.save();

        const conversationService = new ConversationService();
        return await conversationService.createIndividualConversationWhenWasFriend(
            _id,
            senderId
        );
    }

}



module.exports = FriendService;