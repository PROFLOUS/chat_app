const userService = require('../services/UserSevice');

const userController ={

    // [POST] /users
    createUser: async (req, res, next) => {
        try {
            const rs = await userService.createUser(req.body);
            console.log(req.body);
            res.status(201).json(rs);
        } catch (err) {
            res.status(500).json({message: err.message});
            // console.log(err);
            // next(err);
        }
    }

}

module.exports = userController;