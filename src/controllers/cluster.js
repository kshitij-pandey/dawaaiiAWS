
const Store=require("../models/store")
  function calDistance(coord1,coord2){
    var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((coord2.lat - coord1.lat) * p)/2+ 
          c(coord1.lat * p) * c(coord2.lat * p) * 
          (1 - c((coord2.long - coord1.long) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }
exports.storesInCluster=async (req,res)=>{
  const lat=req.body.coords.lat;
  const long=req.body.coords.lng;
  const userCity=req.body.city
console.log("from cluster.js",lat,long,userCity);
//new RegExp("^" + city + "$", "i")
// const stores=await Store.find({city:userCity},{_id:0});
const storesInCity = await Store.find( { city : userCity});
const storesInCluster=[];
// for(let i=0;i<stores.length;i++){

// }
storesInCity.map( (store)=>{
  const coord1={};
  coord1.lat=parseFloat(store.lat);
  coord1.long=parseFloat(store.long);
  const coord2={}
  coord2.lat=parseFloat(lat);
  coord2.long=parseFloat(long);
   const distance= calDistance(coord1,coord2);
console.log(distance);
if(distance<5){
  storesInCluster.push(store);
  
}
});

res.send(storesInCluster);
//Distance storeID storeName cluster City
}