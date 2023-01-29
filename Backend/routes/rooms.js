const express = require("express");

const roomController = require("../controllers/roomsControllers");

const router = express.Router();

router.post("/addRoom", roomController.addRoom);
router.post("/joinRoom", roomController.joinRoom);
router.get("/getAllRooms", roomController.getAllRooms);
router.get("/getRoomById", roomController.getRoomById);
router.post("/leaveRoom", roomController.leaveRoom);
router.post("/newMessage", roomController.newMessage);
router.get("/getAllMessages", roomController.getChatById);
module.exports = router;
