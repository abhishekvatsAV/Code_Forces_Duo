const express = require("express");

const competitionController = require("../controllers/competitionControllers");

const router = express.Router();

router.get("/totalScore",competitionController.getTotalScore);

module.exports = router;