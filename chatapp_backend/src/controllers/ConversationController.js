const ConversationService = require('../services/ConversationService');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

class ConversationController {
    constructor(io) {
        this.io = io;
        this.createIndividualConversation =
        this.createIndividualConversation.bind(this);
    }

    // [GET] /:id
    async getOne(req, res, next) {
        const { id } = req.params;
        const {page=0, size=20} = req.query;
        const {userId} = req.body;

        try {
            const conversationService = new ConversationService();
            const conversation =
                await conversationService.getConversationById(id,userId,parseInt(page),parseInt(size));
            res.json(conversation);
        } catch (err) {
            next(err);
        }
    }

    // [GET] /
    async getAll(req, res, next) {
        let {userId} = req.body;
        const {page=0, size=20} = req.query;

        try {
            const conversationService = new ConversationService();
            const conversations =
                await conversationService.getAllConversation(userId,parseInt(page),parseInt(size));
            res.json(conversations);
        }catch (err) {
            next(err);
        }

    }

    // [POST] /individuals/:userId
    async createIndividualConversation(req, res, next) {
        const _id  = req.headers._id;
        const avatar = req.headers.avat;
        const name = req.headers.name;

        const user1 ={
            userId: _id,
            userLastName: name,
            avaUser: avatar
        }

        const  userId  = req.params.userId;
        const  avatUser  = req.headers.avat2;
        const  nameUser  = req.headers.name2;

        const user2 ={
            userId: userId,
            userLastName: nameUser,
            avaUser: avatUser
        }
    
        console.log(user1,user2);

        const conversationService = new ConversationService();

        try {
                const rs=  await conversationService.createIndividualConversation(
                    user1,
                    user2,
                );
                res.status(201).json(rs);
        } catch (err) {
            res.status(500).json({message: err.message});
            // console.log(err);
            // next(err);
        }
    }
}

module.exports = ConversationController;