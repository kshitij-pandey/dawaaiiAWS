const Product = require('../models/product');
const connection= require('../../server')
const mongoose=require('mongoose');
// const collection=connection.collection("products")
const collection=mongoose.connection.collection('products');

exports.searchProduct=async (request, response) =>{

    try { 
        console.log(collection,request.query.term)
        let result = await collection.aggregate([
        {
            
            "$search": {
                "autocomplete": {
                    "query": `${request.query.term}`,
                    "path": "productName",

                }
            }
        },
        {"$limit": 10}
    ]).toArray();
  console.log(result);
  response.send(result);
} catch (e) {
    try{
        product.getAll(req.query).then(products =>{
            response.status(200).json(products)
        }).catch(() => res.status(500).end())
    }
    catch{
        response.status(500).json("Searched Product Not Found.");
    }
}
};

async function getAll(query) {
let products = await Product.find({}).lean()
if (query.search) {
    products = products.filter(x => x.name.toLowerCase().includes(query.search))
}
return products;
}

// exp.get("/get/:id", async (request, response) => {
//     try {
//         let result = await collection.findOne({ "_id": ObjectID(request.params.id) });
//         response.send(result);
//     } catch (e) {
//         response.status(500).send({ message: e.message });
//     }
// });