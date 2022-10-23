const users = require("../models/usersModel");
const axios = require("axios");
exports.registerUser = async (req,res,next) => {
    try {
        let {userName} = req.body;
        let userData = await users.findOne({
            userName
        });
        if(!userData){
            let profile = await axios.get(`https://codeforces.com/api/user.info?handles=${userName}`);
            if(profile?.data?.result.length === 0){
                return res.status(404).json({
                    message:"no profile found for this handle"
                });
            }
            userData = new users({
                userName: userName,
                profile:profile?.data?.result[0]
            });
            console.log("helo bbg", userData);
            await userData.save();
        }
        return res.status(200).json({
            message:"userData fetched successfully",
            userData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error.message
        });
    }
}
