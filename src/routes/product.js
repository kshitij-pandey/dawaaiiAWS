const express=require('express')
const Product=require('../controllers/products')
const Router=express.Router();


Router.post('/searchProduct',Product.searchProduct)

module.exports=Router;