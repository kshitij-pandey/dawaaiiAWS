const express=require('express')
const Location=require('../controllers/location')
const Router=express.Router();

Router.post('/setCordinates',Location.setCordinates);
Router.post('/storesInCluster',Location.storesInCluster);
Router.post('/storesInCity',Location.storesInCity);
Router.post('/locationSuggestions',Location.locationSuggestions)
Router.post('/getLocationFromCordinates',Location.gps)
Router.post('/get_coords',Location.get_coords)
module.exports=Router;