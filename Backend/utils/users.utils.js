const users = require("../models/usersModel");

exports.getUserData = async (userId) => {
    try {
        return users.findOne({
            _id:userId
        },{
            userName:1
        })
    } catch (error) {
        console.log(error);
        return error;
    }
}
