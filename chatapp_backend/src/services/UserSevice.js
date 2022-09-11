const User = require('../models/User')

const userService = {
    // [POST] /users
    createUser: async (user) => {
        const newUser = new User(user);
        try {
            const rs = await newUser.save();
            return rs;
        } catch (err) {
            throw err;
        }

    }

}

module.exports = userService;