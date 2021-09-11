const Order = require('../models/order');

exports.saveCart = async (req,res)=>{
  const userID=req.body.user;
  const cartObj=JSON.parse(req.body.cart)
  try{
    cartObj.forEach(async (order)=>{
      const productID=order.productId;
      const storeID=order.storeId
      const _order=new Order({
        userID:userID,productID:productID,storeID:storeID
        });
        const savedOrder= await _order.save();
     })
    
    res.status(201).send({
        msg: "Order Saved successfully"
    });
  }
  catch(err){
    res.status(404).send({
      msg: "Order Saved successfully"
  });
  };
   
}

exports.newOrder=(req,res)=>{
  res.status(200).send({});
}
