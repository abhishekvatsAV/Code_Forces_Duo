const express = require("express");

const roomController = require("../controllers/rooms");

const router = express.Router();

router.post("/addRoom",roomController.addRoom);
router.post("/joinRoom",roomController.joinRoom);
router.get("/getAllRooms",roomController.getAllRooms);
router.post("/leaveRoom",roomController.leaveRoom);

module.exports = router;