const User = require('../models/user');
const Order = require('../models/order');
const jwt = require("jsonwebtoken");
// const {uploader, sendEmail} = require('../utils/emailAndStorage');

exports.userDetails = async function (req, res) {
    try {
        const token = req.body.token;
        // console.log("token is",token)
        if (!token)
            return res.status(401).json({
                msg: "Token Unavailable",
            });
           
        const finalToken = token.split(" ")[1];
       
        const verified = jwt.verify(finalToken, process.env.JWT_SECRET);
        
        const user = await User.findOne({ _id: verified.id });
        console.log("login successful")
        if (user) {
            id = user._id;
        } else {
            return res.status(400).json({
                msg: "User not found",
            });
        }
        const user1 = await User.findById(id);
        if (!user1) 
            return res.status(401).json({message: 'User does not exist'});
            
        res.status(200).json({user1});
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.orderDetails = async function (req, res) {
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
            id = user._id;
            console.log(userID);
        } else {
            return res.status(400).json({
                msg: "User not found",
            });
        }
        const orders = await Order.findAll({ userID : id });
        if (!orders) 
            return res.status(401).json({message: 'No orders till now'});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.updateDetails = async function (req, res) {
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
            id = user._id;
            console.log(userID);
        } else {
            return res.status(400).json({
                msg: "User not found",
            });
        }
        const update = req.body;
        const user1 = await User.findByIdAndUpdate(id, {$set: update}, {new: true});
        if (!req.file) 
            return res.status(200).json({user, message: 'User has been updated'});
        const result = await uploader(req);
        const user_ = await User.findByIdAndUpdate(id, {$set: update}, {new: true});
        if (!req.file) 
            return res.status(200).json({user: user_, message: 'User has been updated'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.updateAddress = async (req, res) => {
    try {
        console.log("updateAdresscalled",req.body,req.header("Authorization"))
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
                $push: { userAddress: req.body.addressString },
            }
        );
        console.log(userNew,req.body)
        res.status(200).json(userNew);
    } catch (err) {
        res.json(err);
    }
};