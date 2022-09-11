const friendService = require('../services/FriendService');

class FriendController {
    constructor(io) {
        this.io=io;
        this.acceptFriend = this.acceptFriend.bind(this);
        // this.sendFriendInvite = this.sendFriendInvite.bind(this);
        // this.deleteFriend = this.deleteFriend.bind(this);
        // this.deleteFriendInvite = this.deleteFriendInvite.bind(this);
        // this.deleteInviteWasSend = this.deleteInviteWasSend.bind(this);
    }

    // [GET] /?name
    // async getListFriends(req, res, next) {

    // }

    // [POST] /:userId
    async acceptFriend (req, res, next){
        const {_id}=req.body;
        const {userId}=req.params;
        try {
            const result = await friendService.acceptFriend(_id, userId);
            res.status(201).json(result);

        }catch (e) {
            next(e);
        }
    }
    

}

module.exports = FriendController;