const room = require("../models/rooms");

exports.addRoom = async (req,res,next) => {
    try {
        let {roomId,password,roomType} = req.body;
        let roomData = new room({
            roomId,
            password,
            roomType
        });
        await roomData.save();
    } catch (error) {
        return res.status(500).json({
            message :"room created successfully"
        })
    }
}