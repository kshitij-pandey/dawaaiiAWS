const shortid = require("shortid");
const Razorpay = require("razorpay");
const moment = require("moment");
require('dotenv').config();
const Order = require("../models/order");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.payment = async (req, res) => {
    console.log("body in payment is",req.body)
    const { products, city, phoneNo, address, status } = req.body;
    const receipt = shortid.generate();

    let statusString = `Expected Delivery by 5:00 PM ${moment()
        .add(1, "days")
        .format("Do MMM YYYY")}`;
    let orderDate = `${moment().format("llll")}`;
    let country_number = `+91${phoneNo}`;

    let newOrder = new Order({
        phoneNo: country_number,
        address,
        city,
        products,
        status,
        receipt,
        statusString,
        orderDate,
    });
    //Save Order on User Database left
    await newOrder.save();
    let totalPrice = 0;
    const findTotalPrice = new Promise((resolve, reject) => {
        products.map((prod, i) => {
            console.log(prod.productPrice);
            totalPrice += +prod.productPrice * +prod.productQuantity;
            if (products.length === i + 1) {
                console.log(totalPrice);
                resolve();
            }
        });
    });

    findTotalPrice.then(async () => {
        console.log(totalPrice);
        const payment_capture = 1;
        const amount = totalPrice;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: receipt,
            payment_capture,
        };

        try {
            const response = await razorpay.orders.create(options);
            if (response.id) {
            }
            res.json({
                id: response.id,
                currency: response.currency,
                amount: response.amount,
            });
        } catch (error) {
            console.log(error);
        }
    });
}