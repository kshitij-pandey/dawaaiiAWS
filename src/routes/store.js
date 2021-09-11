const express=require('express')
const Store=require('../controllers/store')
const Router=express.Router();

Router.post('/getStoreDetails',Store.getStoreDetails);

module.exports=Router;