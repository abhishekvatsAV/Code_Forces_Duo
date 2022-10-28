const competitionsModel = require("../models/competitionsModel");
const solvedProblemModel = require("../models/solvedProblems");

exports.getTotalScore = async (req, res, next) => {
	try {
		let { userId, competitionId } = req.query;
		let totalScore = await solvedProblemModel.aggregate([
			{
				$match: {
					userId,
					competitionId
				}
			},
			{
				$group: {
					_id: null,
					totalScore: {
						$sum: "$problemRating"
					}
				}
			}
		]);
		totalScore = totalScore.totalScore ? totalScore.totalScore : 0;
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
