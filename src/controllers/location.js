const axios=require("axios");
const key = require("../config/keys.config").GOOGLE_API_KEY;
const Store = require('../models/store')

exports.setCordinates=(req,res)=>{
    const {longitude,lattitude}=req.body;
   console.log("longitude is ",longitude," lattitude is",lattitude);
}

exports.storesInCluster=(req,res)=>{
    console.log("req bodyis",req.body)
    const city=req.body.city;
    const area=req.body.loc;
    // city varanasi 
    
 if(city=="Varanasi"  && area!="Bhelupur"){
    const stores=[{
        "storeID": "1",
        "storeName": "Daya medicals",
        "cluster": "A",
        "city": "varanasi"
    },{"storeID": "3",
    "storeName": "CMR medicals",
    "cluster": "B",
    "city": "varanasi"},{
        "storeID": "2",
    "storeName": "SG medicals",
    "cluster": "A",
    "city": "varanasi"
    },{"storeID":"4",
      "storeName":"yash medicals",
      "cluster":"B",
        "city":"varanasi"}]
    res.send({stores:stores}) ;
 }
 else if(city=="Varanasi") {
    const stores=[{
        "storeID": "2",
    "storeName": "SG medicals",
    "cluster": "A",
    "city": "varanasi"
    },{
        "storeID": "1",
        "storeName": "Daya medicals",
        "cluster": "A",
        "city": "varanasi"
    }]
    res.send({stores:stores}) 
 }
 else{
    res.send({stores:[]})
 }
} //
exports.storesInCity=async (req,res)=>{
    const city=req.body.city;
    // console.log(city)
    const stores=await Store.find({city:new RegExp("^" + city + "$", "i")},{_id:0});
    // console.log(stores)
    res.send(stores)
}

exports.locationSuggestions=async (req,res)=>{
        const { string } = req.body;
    
        try {
            let locations = [];
    
            //Get data from API
            const { data } = await axios.get(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${string}&region=in&key=${key}&sessiontoken=19191919291`
            );

            data.predictions.map((item) => {
                let loc = {};
                loc.name = item.structured_formatting.main_text;
                loc.address = item.description;
                loc.id = item.place_id;
                locations.push(loc);
            });
            res.json(locations);
        } catch (err) {
            console.log(err);
            res.json({ message: "something went wrong" });
        }
 
}


exports.gps= async (req, res) => {
    const { lat, lng } = req.body;
    console.log(lat,lng)
    try {
        //Get data from API
        const { data } = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&region=in&key=${key}`
        );
        let currentLoc = data.plus_code.compound_code.split(" ");
        // console.log(currentLoc);
        let formatedLoc = {};
        formatedLoc.name = currentLoc[1].replace(",", "");
        formatedLoc.address = data.results[0].formatted_address;
        // formatedLoc.address = myLocation();
        // console.log(myLocation());
        // console.log("formattedLoc",formatedLoc)
        res.json(formatedLoc);
    } catch (error) {
        // console.log(error);
        
    }
}


exports.get_coords= async (req, res) => {
    const { location_name } = req.body;

    const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location_name}&sensor=true&region=in&key=${key}&sessiontoken=19191919291`
    );

    res.status(200).json(data.results[0].geometry.location);
    }

