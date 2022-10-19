const { default: axios } = require("axios");
const competitions = require("../models/competitionsModel");
const problems = require("../models/problemsModel");
const room = require("../models/roomsModel");

exports.addRoom = async (req, res, next) => {
    try {
        let { roomId, password, roomType, userId } = req.body;
        let roomData = new room({
            roomId,
            password,
            roomType
        });
        await roomData.save();
        let problemData = await axios.get("https://codeforces.com/api/problemset.problems?tags=implementation");
        let randomProblem = problemData?.data?.result?.problems[Math.floor(Math.round() * 8128)];
        let existingProblem = await problems.findOne({
            difficultyIndex: randomProblem.index,
            contestId: randomProblem.contestId,
            isRoomLeft:false
        });
        if (!existingProblem) {
            existingProblem = new problems({
                link: `https://codeforces.com/problemset/problem/${randomProblem.contestId}/${randomProblem.index}`,
                ...randomProblem,
                difficultyIndex: randomProblem.index
            });
            await existingProblem.save();
        }
        let competitionData = new competitions({
            problemId: existingProblem._id,
            user: userId,
            competitionName: `competition-${roomId}`,
            roomId: roomData._id
        });
        await competitionData.save();
        return res.status(200).json({
            message: "room created successfully",
            roomData
        })
    } catch (error) {
        return res.status(500).json({
            message: "room created successfully"
        })
    }
}

exports.joinRoom = async (req, res, next) => {
    try {
        let { roomId, userId } = req.body;
        let roomData = await room.findOne({
            roomId
        });
        if (!roomData) {
            return res.status(404).json({
                message: "room not found"
            })
        }
        let roomUserCount = await competitions.countDocuments({
            roomId
        });
        if (roomData.isRoomFull) {
            return res.status(400).json({
                message: "sorry the room is full"
            })
        }
        if (roomUserCount === 1) {
            roomData.isRoomFull = true;
            await roomData.save();
        }
        let existingCompetition = await competitions.findOne({
            roomId
        });
        let competitionData = new competitions({
            problemId: existingCompetition.problemId,
            user: userId,
            competitionName: `competition-${roomId}`,
            roomId
        });
        await competitionData.save();
        return res.status(200).json({
            message: "room joined successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllRooms = async (req, res, next) => {
    try {
        let allRooms = await room
            .find()
            .sort({
                isRoomFull: 1
            });
        return res.status(200).json({
            message: "rooms fetched successfully",
            allRooms
        });
    } catch (error) {
        return res.status(200).json({
            message: error.message
        });
    }
}

exports.leaveRoom = async (req,res,next) => {
    try {
        let {userId,roomId} = req.body;
        let roomData = await room.findOne({
            roomId
        });
        await competitions.updateOne({
            roomId,
            userId,
            isRoomLeft:false
        },{
            isRoomLeft:true
        });
        roomData.isRoomFull = false;
        await roomData.save();
        return res.status(200).json({
            message:"room left successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
