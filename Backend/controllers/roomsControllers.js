const { default: axios } = require("axios");
const competitions = require("../models/competitionsModel");
const problems = require("../models/problemsModel");
const room = require("../models/roomsModel");


// working fine
exports.addRoom = async (req, res, next) => {
    console.log("first");
    try {
        let { roomId, password, roomType, host, problemsToSolve, userId } = req.body;
        console.log(req.body);
        let roomData = new room({
            roomId,
            password,
            roomType,
            host,
            users: [
                {
                    userId
                }
            ]
        });
        await roomData.save();
        // console.log("successs ---------------")
        let problems = Array(problemsToSolve)
            .fill()
            .map(async () => {
                let problemData = await axios.get("https://codeforces.com/api/problemset.problems");
                let randomProblem = problemData?.data?.result?.problems[Math.floor(Math.round() * 8128)];
                let existingProblem = await problems.findOne({
                    difficultyIndex: randomProblem.index,
                    contestId: randomProblem.contestId,
                    isRoomLeft: false
                });
                if (!existingProblem) {
                    existingProblem = new problems({
                        link: `https://codeforces.com/problemset/problem/${randomProblem.contestId}/${randomProblem.index}`,
                        ...randomProblem,
                        difficultyIndex: randomProblem.index
                    });
                    await existingProblem.save();
                }
                return {
                    problemId:existingProblem._id
                }
            })
        let competitionData = new competitions({
            problems,
            competitionName: `competition-${roomId}`,
            roomId: roomData._id
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
        });
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
            message: "room joined successfully"
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
