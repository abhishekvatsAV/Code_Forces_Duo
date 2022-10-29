const competitionsModel = require("../models/competitionsModel");
const solvedProblemModel = require("../models/solvedProblems");
const { getTotalScore } = require("../utils/competition.utils");

exports.getTotalScore = async (req, res, next) => {
	try {
		let { userId, competitionId } = req.query;
		let totalScore = await getTotalScore(userId,competitionId);
		return res.status(200).json({
			message: "total score fetched successfully",
			totalScore
		})
	} catch (error) {
		return res.status(500).json({
			message: error.message
		})
	}
}
