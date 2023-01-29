const competitions = require("../models/competitionsModel");
const problemsModel = require("../models/problemsModel");
const room = require("../models/roomsModel");
const chat = require("../models/chatModel");
const { findOne } = require("../models/usersModel");
const { getSocket } = require("../utils/socket.connection");

exports.addRoom = async (req, res, next) => {
  // console.log("first");
  try {
    let { roomId, password, roomType, host, problems, range } = req.body;
    // console.log(req.body);
    let roomData = new room({
      roomId,
      password,
      roomType,
      host,
      users: [
        {
          userId: host,
        },
      ],
    });
    await roomData.save();
    // console.log("successs ---------------")
    let problemsData = [];
    for (let i = 0; i < problems.length; i++) {
      const randomProblem = problems[i];
      let existingProblem = await problemsModel.findOne({
        difficultyIndex: randomProblem.index,
        contestId: randomProblem.contestId,
      });
      if (!existingProblem) {
        existingProblem = new problemsModel({
          link: `https://codeforces.com/problemset/problem/${randomProblem.contestId}/${randomProblem.index}`,
          ...randomProblem,
          difficultyIndex: randomProblem.index,
        });
        await existingProblem.save();
      }
      problemsData.push({
        problemId: existingProblem._id,
      });
    }
    let competitionData = new competitions({
      problems: problemsData,
      competitionName: `competition-${roomId}`,
      roomId: roomData._id,
      ratingRange: range,
    });
    await competitionData.save();
    return res.status(200).json({
      message: "room created successfully",
      roomData,
    });
  } catch (error) {
    console.log(error, "could not create room");
    return res.status(500).json({
      message: "something went wrong room not created",
    });
  }
};

exports.joinRoom = async (req, res, next) => {
  try {
    let { roomId, userId } = req.body;
    let roomData = await room
      .findOne({
        roomId,
      })
      .populate("users.userId", "userName");
    if (!roomData) {
      return res.status(404).json({
        message: "room not found",
      });
    }
    if (roomData.users.length === 2) {
      return res.status(400).json({
        message: "sorry the room is full",
      });
    }
    roomData.users.push({
      userId: userId,
    });
    await roomData.save();

    return res.status(200).json({
      message: "room joined successfully",
      roomData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllRooms = async (req, res, next) => {
  try {
    let allRooms = await room
      .find()
      .populate("users.userId", "userName profile");
    let newAllRooms = [];
    for (let i = 0; i < allRooms.length; i++) {
      const room = allRooms[i];
      let competitionData = await competitions
        .findOne({
          roomId: room._id,
        })
        .populate("problems.problemId");
      newAllRooms.push({
        ...room._doc,
        competitionData,
      });
    }
    return res.status(200).json({
      message: "rooms fetched successfully",
      allRooms: newAllRooms,
    });
  } catch (error) {
    return res.status(200).json({
      message: error.message,
    });
  }
};

exports.leaveRoom = async (req, res, next) => {
  try {
    let { userId, roomId } = req.body;
    let roomData = await room.findOne({
      roomId,
    });
    let userInRoomIndex = roomData.users.findIndex(
      (user) => user.userId.toString() === userId.toString()
    );
    if (userInRoomIndex === -1) {
      return res.status(404).json({
        message: "user already left or haven't joined the room",
      });
    }
    roomData.users.splice(userInRoomIndex, 1);
    await roomData.save();
    if (roomData.users.length === 0) {
      await room.findOneAndDelete({
        _id: roomData._id,
      });
    }
    return res.status(200).json({
      message: "room left successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getRoomById = async (req, res, next) => {
  try {
    let { roomId } = req.query;
    let roomData = await room
      .findOne({
        roomId,
      })
      .populate("users.userId")
      .populate("messages.chat");
    let competitionData = await competitions
      .findOne({
        roomId: roomData._id,
      })
      .populate("problems.problemId");
    return res.status(200).json({
      message: "success",
      roomData,
      competitionData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getChatById = async (req, res, next) => {
  try {
    console.log("first")
    const {roomId} = req.query;
    const chatData = await chat.find({roomId}).populate("sender");
    const chats = chatData.map(chat => {
      return {
        sender:chat.sender.userName,
        chat:chat.content,
        roomId
      }
    })
    // console.log("---------");
    // console.log(chatData);
    // console.log("---------")
    return res.status(200).json({
      message: "success",
      chats,
    });
  } catch (error) {
    console.log("eroor in getChatById ");
    return res.status(500).json({ message: error.message });
  }
};

exports.newMessage = async (req, res, next) => {
  const { sender, content, roomId } = req.body;
  // console.log("body: " + req.body.message);
  console.log(`sender : ${sender}, content: ${content}, roomId: ${roomId}`);
  // if (!sender || !content || !roomId) {
  //   console.log("give Valid sender and content and roomId");
  //   res.status(400).json("Not Valid sender or content or roomId");
  // }
  let currRoom;
  try {
    currRoom = await room.findOne({ roomId });
  } catch (err) {
    console.log({ err: err.message });
  }
  let newMessage = {
    sender,
    content,
    roomId: currRoom._id,
  };

  try {
    let message = await (
      await (await chat.create(newMessage)).populate("sender")
    ).populate("roomId");
    // message = await chat.populate("roomId.messages");
    currRoom.messages.push(message._id);
    // send socket 
    const socketInstance = getSocket();
    socketInstance.to(roomId).emit("chat",{
      chat:content,
      sender:message.sender.userName
    })
    await currRoom.save();
    // await room.findOne({ roomId }).populate("messages");
    res.status(200).json(message);
  } catch (error) {
    console.log(`firstt here, ${error}`);
    res.status(400).json({ error: error.message });
  }
};
