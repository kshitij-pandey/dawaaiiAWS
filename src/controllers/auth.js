const User = require('../models/user');
const {sendEmail} = require('../utils/emailAndStorage');
const jwt = require("jsonwebtoken");
const twilio = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.login = async (req, res) => {
    const { phoneNo } = req.body;
    try {
        const code = Math.floor(100000 + Math.random() * 900000);
        const exists = await User.findOne({ phoneNo: phoneNo });
       
        if (exists) {
            exists.code = code;
            exists.codeGenTime = Date.now();
            const savedUser = await exists.save();
            res.status(200).json({
                msg: "OTP Sent successfully",
            });
        } else {
            const user = new User({
                phoneNo: req.body.phoneNo,
                code,
                codeGenTime: Date.now(),
            });
            const savedUser = await user.save();
            console.log("savedUser is",savedUser)
            res.status(201).json({
                msg: "OTP Sent successfully",
            });
        }
        twilio.messages
            .create({
                body: `Welcome to Dawaaii! Your verification code is ${code}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: req.body.phoneNo,
            })
            .then((message) => console.log(message.sid));
    } catch (err) {
        res.json(err);
    }
};

exports.verifyOTP = async (req, res) => {
    const { phoneNo, OTP } = req.body;
    console.log(OTP)
    const userExists = await User.findOne({ phoneNo: phoneNo });
    if (!userExists) {
       
        return res.status(400).json({
            msg: "Something went wrong... Try again",
        });
    }
    
    let timestamp = new Date(userExists.codeGenTime).getTime() + 5 * 60 * 1000;
    const futureDate = new Date(timestamp);
    const currentDate = Date.now();
    if (currentDate > futureDate) {
       
        return res.status(400).json({
            msg: "OTP Expired... Try Again",
        });
    } else {
        if (userExists.code != OTP) {
            return res.status(400).json({
                msg: "Invalid Code... Try Again",
            });
        } else {
           
            const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET, { expiresIn: '1d' }); //1
            res.status(200).json({
                token:token,id:userExists.id
            });
        }
    }
};

exports.verifyToken= async  (req,res) =>{
    console.log(req)
    const token = req.header("Authorization");
    console.log(token)
    if (!token)
        return res.status(401).json({
            msg: "Token Unavailable",
        });

    const finalToken = token

    try {
        const verified = jwt.verify(finalToken, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: verified.id });
        if (user) {
            return res.status(200).json(user._id);
        } else {
            return res.status(400).json({
                msg: "User not found",
            });
        }
    } catch (err) {
        return res.status(403).json({ message: err });
    }

};

exports.updateDetails = async (req, res) => {
    try {
       const {name,email}=req.body;
        const token = req.header("Authorization");
        if (!token)
            return res.status(401).json({
                msg: "Token Unavailable",
            });
        const finalToken = token.split(" ")[1];
        const verified = jwt.verify(finalToken, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: verified.id });
        if (user) {
            userID = user._id;
            console.log(userID);
        } else {
            return res.status(400).json({
                msg: "User not found",
            });
        }
        const userNew = await User.findOneAndUpdate(
            { _id: userID },
            {
                $set: { userName:name, userEmail:email },
            }
        );
        console.log(userNew);
        await sendVerificationEmail(userNew, req, res);
    } catch (err) {
        res.json(err);
    }
};

exports.updateAddress = async (req, res) => {
    try {
        const token = req.header("Authorization");
        if (!token)
            return res.status(401).json({
                msg: "Token Unavailable",
            });
        const finalToken = token.split(" ")[1];
        const verified = jwt.verify(finalToken, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: verified.id });
        if (user) {
            userID = user._id;
            console.log(userID);
        } else {
            return res.status(400).json({
                msg: "User not found",
            });
        }
        const userNew = await User.findOneAndUpdate(
            { _id: userID },
            {
                $push: { userAddress: req.body },
            }
        );
        res.status(200).json(userNew);
    } catch (err) {
        res.json(err);
    }
};

async function sendVerificationEmail(user, req, res){
    try{
        let subject = "Welcome to Dawaaii";
        let to = user.userEmail;
        let from = process.env.FROM_EMAIL;
        let html = `<p>Hi ${user.name}<p><br><p>Welcome to Dawaaii , open our website <a href="https://home.dawaaii.in">Dawaaii</a> and order all medicines withe service of instant delivery</p>`;
        await sendEmail({to, from, subject, html});
        res.status(200).json(user);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}
