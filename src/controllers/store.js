const Store = require('../models/store');

exports.getStoreDetails=async (req,res)=>{
    let storeDetails=[];
   const storeIDs=req.body;
    for(let i=0;i<storeIDs.length;i++){
        const storeDet=await Store.findOne({storeID:storeIDs[i]},{
            _id:0
         });
       
        storeDetails.push(storeDet);
    }
   
    console.log(storeDetails)
    res.status(200).json(storeDetails);
}
