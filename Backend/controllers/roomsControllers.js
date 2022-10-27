
const competitions = require("../models/competitionsModel");
const problemsModel = require("../models/problemsModel");
const room = require("../models/roomsModel");


// working fine
exports.addRoom = async (req, res, next) => {
    console.log("first");
    try {
        let { roomId, password, roomType, host, problems, range } = req.body;
        console.log(req.body);
        let roomData = new room({
            roomId,
            password,
            roomType,
            host,
            users: [
                {
                    userId:host
                }
            ]
        });
        await roomData.save();
        // console.log("successs ---------------")
        let problemsData = [];
        for (let i = 0; i < problems.length; i++) {
            const randomProblem = problems[i];
            let existingProblem = await problemsModel.findOne({
                difficultyIndex: randomProblem.index,
                contestId: randomProblem.contestId
            });
            if (!existingProblem) {
                existingProblem = new problemsModel({
                    link: `https://codeforces.com/problemset/problem/${randomProblem.contestId}/${randomProblem.index}`,
                    ...randomProblem,
                    difficultyIndex: randomProblem.index
                });
                await existingProblem.save();
            }
            problemsData.push({
                problemId:existingProblem._id
            });
        }
        let competitionData = new competitions({
            problems:problemsData,
            competitionName: `competition-${roomId}`,
            roomId: roomData._id,
            ratingRange:range
        });
        await competitionData.save();
        return res.status(200).json({
            message: "room created successfully",
            roomData
        })
    } catch (error) {
        console.log(error, "could not create room")
        return res.status(500).json({
            message: "something went wrong room not created"
        })
    }

}

exports.joinRoom = async (req, res, next) => {
    try {
        let { roomId, userId } = req.body;
        let roomData = await room.findOne({
            roomId
        })
        .populate("users.userId","userName");
        if (!roomData) {
            return res.status(404).json({
                message: "room not found"
            })
        }
        if (roomData.users.length === 2) {
            return res.status(400).json({
                message: "sorry the room is full"
            })
        }
        roomData.users.push({
            userId:userId
        });
        await roomData.save();

        return res.status(200).json({
            message: "room joined successfully",
            roomData
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

// working fine
exports.getAllRooms = async (req, res, next) => {
    try {
        let allRooms = await room
            .find()
            .populate("users.userId","userName profile")
        let newAllRooms = [];
        for (let i = 0; i < allRooms.length; i++) {
            const room = allRooms[i];
            let competitionData = await competitions.findOne({
                roomId:room._id
            })
            .populate("problems.problemId");
            newAllRooms.push({
                ...room._doc,
                competitionData
            });
        }
        return res.status(200).json({
            message: "rooms fetched successfully",
            allRooms:newAllRooms
        });
    } catch (error) {
        return res.status(200).json({
            message: error.message
        });
    }

}

exports.leaveRoom = async (req, res, next) => {
    try {
        let { userId, roomId } = req.body;
        let roomData = await room.findOne({
            roomId
        });
        let userInRoomIndex = roomData.users.findIndex(user => user.userId.toString() === userId.toString())
        if(userInRoomIndex === -1){
            return res.status(404).json({
                message:"user already left or haven't joined the room"
            })
        }
        roomData.users.splice(userInRoomIndex,1);
        await roomData.save();
        return res.status(200).json({
            message: "room left successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.getRoomById = async (req,res,next) => {
    try {
        let { roomId } = req.query;
        let roomData = await room.findOne({
            roomId
        })
        .populate("users.userId");
        let competitionData = await competitions.findOne({
            roomId
        })
        .populate("problems.problemId");
        return res.status(200).json({
            message:"success",
            roomData,
            competitionData
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
