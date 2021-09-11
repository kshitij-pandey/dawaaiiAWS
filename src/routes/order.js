const express=require('express')
const Order=require('../controllers/order')
const Router=express.Router();

Router.post('/saveCart',Order.saveCart);
Router.post('/newOrder',Order.newOrder);
module.exports=Router;