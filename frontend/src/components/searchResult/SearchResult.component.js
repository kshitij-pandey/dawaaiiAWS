import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";

//compponent
import SearchingList from "./SearchingList";
// import AvailMedical from "./AvailMedical";
// import AvailMedicalV2 from "./AvailMedicalV2";
// import NotAvail from "./NotAvail";
import HelpFindInventory from "../General/patch/HelpFindInventory.patch";
import HelpNumber from "../General/patch/HelpNumber.patch";
import Footer from "../layouts/Footer.layout";
import FoundedMedicineCard from "./cards/FoundedMedicineCard";
import SinglePackageCard from "./cards/SinglePackageCard";

import { foundedSearchMedList,getProducts,setMedicinePackages} from '../../redux/actions/product.action';
import {getAllStoresInCluster} from '../../redux/actions/location.action'
import { DawaaiBest, bestPackageInCity} from '../../utils/packaging';
import CityPackageCard from "./cards/cityPackageCard";
function SearchResult(props) {
    const classes = useStyle();
// const products=props.products; To be Done but for now 

const [products,setProducts]=useState([])
// const pack=props.product.medicinePackages
const [cityPack,setCityPack]=useState({})
const [pack,setPack]=useState({})
const [availableProducts,setAvailableProducts]=useState([]);
const [unavailableProducts,setUnavailableProducts]=useState([]);
const storesInCluster=props.location.storesInCluster;
const [loc,setLoc]=useState(props.location.selectedLocation)
// useEffect(()=>{
console.log("location is changed ")
// },[products.length])

 

useEffect(async ()=>{
    // setProducts(props.product.searchingList)
    console.log("products are like ",unavailableProducts,availableProducts,props.product.searchingList)
    await segregrateProducts(props.product.searchingList)
    console.log("products are like ",unavailableProducts,availableProducts,props.product.searchingList)
    
},[props.product.searchingList,loc])

useEffect(async ()=>{
    props.foundedSearchMedList(availableProducts)
    const data=await DawaaiBest(props.product.searchingList);
    
    if(data && data.products && data.products.length>0){
       setPack(data)
    }

   const cityPackage=await bestPackageInCity(unavailableProducts,props.location.storesInCity);
        setCityPack(cityPackage)
     
},[availableProducts,unavailableProducts])

// useEffect(()=>{

// },[storesInCluster])
    function segregrateProducts(prods){
    
        const availableProducts= [...prods]
        const unavailable=[];
        if(availableProducts.length>0){
            availableProducts.map((product)=>{
             if(product.stores.length){
                 const req_stores=[];
                 product.stores.forEach(store=>{
                    storesInCluster.forEach((str)=>{
                    if(str.storeID==store.storeID){ //change here as str.storeID
                        req_stores.push(store)
                    }
                    });
                  })
                
                 if(!req_stores.length){
                    unavailable.push(product.productID); 
                 }else{
                  product.stores=req_stores;
                 }
             }
            })
            
         const prodsAvailableInCluster=availableProducts.filter((product)=> product.stores.length>0 && (!unavailable.includes(product.productID)) );
         const prodsUnavailableInCluster=[];
         prods.forEach((pro)=>{
          if(unavailable.includes(pro.productID)){
              prodsUnavailableInCluster.push(pro)
          }
         })
        
      setAvailableProducts(prodsAvailableInCluster);
      setUnavailableProducts(prodsUnavailableInCluster);
      console.log(prods,prodsAvailableInCluster,prodsUnavailableInCluster)
        }
        
    }

    return (
        <>
            <div className={classes.root}>
                <div className={classes.searchResult}>
               <SearchingList  availableProducts={availableProducts}/>
                </div>
               
                <div className={classes.searchResult}>
                <p className={classes.packageCardLabel}>Dawaais Best Deal</p>
                <SinglePackageCard singlePackage={pack}/>
                </div>
              
                <div className={classes.searchResult}>
               { availableProducts.length>0 ? <p className={classes.packageCardLabel}>Products available in your Locality</p> : <p className = {classes.packageCardLabel}> No products are available in your locality </p>}
                    <FoundedMedicineCard productsInCluster={availableProducts} />
                </div>
                <div className={classes.searchResult}>
                    {/* <AvailMedical /> */}
                    {/* <AvailMedicalV2 /> */}
                    {/* <NotAvail diffCluster={diffCluster} /> */}
                   {(cityPack && cityPack.products && cityPack.products.length>0) ? <p className={classes.packageCardLabel}> we can still procure these products within city</p> : <></>}
                    <CityPackageCard singlePackage={cityPack}/>
                </div>
                <div>
                    <HelpFindInventory />
                    <HelpNumber />
                    <Footer />
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    product: state.product,
    location:state.location
});

export default connect(mapStateToProps, { foundedSearchMedList,getProducts,getAllStoresInCluster,setMedicinePackages})(SearchResult);

//style
const useStyle = makeStyles((theme) => ({
    searchResult: {
        margin: "0rem 10rem",
    },
    foundedItemCard: {
        margin: "3rem 10rem",
        padding: "2rem",

        display: "flex",
        justifyContent: "space-between",
        flexGrow: "1",

        border: "1px solid rgba(229, 229, 229, 1)",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        borderRadius: "7px",
    },
    foundMedList: {
        width: "27em",
        "& h3": {
            marginBottom: "2rem",
            fontFamily: "gilroymedium",
            fontSize: "18px",
            lineHeight: "21.09px",
            color: "#000",
        },
    },
    packageCardLabel:{
    fontSize:"20px",
    fontWeight:"590",
    fontFamily: "gilroymedium",
    },
    foundItemList: {
        display: "flex",
        flexWrap: "wrap",
        "& p": {
            width: "auto",
            padding: "0rem 2rem",
            // margin: '0 1rem',
            marginRight: "1rem",
            marginBottom: "1rem",
            background: "rgba(116, 185, 249, 0.35)",

            borderRadius: "5px",

            fontFamily: "gilroymedium",
            fontSize: "12px",
            lineHeight: "30px",
            color: "#000",
        },
    },
    buyOptionsCard: {
        padding: "1rem 2rem",
        textAlign: "center",

        border: "1px solid rgba(229, 229, 229, 1)",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        borderRadius: "7px",

        "& p": {
            fontFamily: "gilroyregular",
            fontSize: "15px",
            // lineHeight: '30px',
            color: "#000",
        },

        "& h1": {
            fontFamily: "gilroybold",
            fontSize: "25px",
            lineHeight: "60px",
            color: "#000",
        },
        "& button": {
            padding: "0 2rem",
            background: "#F36D31",

            cursor: "pointer",

            border: "none",
            borderRadius: "5px",

            fontFamily: "gilroylight",
            fontSize: "18px",
            lineHeight: "40px",
            color: "#fff",
        },
    },
    [theme.breakpoints.down(600)]: {
        searchResult: {
            margin: "0 1rem",
        },
    },
}));

//style
// const useStyle = makeStyles((theme) => ({
//     searchResult: {
//         margin: '0 0rem',
//     },
//     foundedItemCard: {
//         margin: '3rem 10rem',
//         padding: '2rem',

//         display: 'flex',
//         justifyContent: 'space-between',
//         flexGrow: '1',

//         border: '1px solid rgba(229, 229, 229, 1)',
//         boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
//         borderRadius: '7px'
//     },
//     foundMedList: {
//         width: '27em',
//         '& h3': {
//             marginBottom: '2rem',
//             fontFamily: 'gilroymedium',
//             fontSize: '18px',
//             lineHeight: '21.09px',
//             color: '#000',
//         }
//     },
//     foundItemList: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         '& p': {
//             width: 'auto',
//             padding: '0rem 2rem',
//             // margin: '0 1rem',
//             marginRight: '1rem',
//             marginBottom: '1rem',
//             background: 'rgba(116, 185, 249, 0.35)',

//             borderRadius: '5px',

//             fontFamily: 'gilroymedium',
//             fontSize: '12px',
//             lineHeight: '30px',
//             color: '#000',
//         },
//     },
//     buyOptionsCard: {
//         padding: '1rem 2rem',
//         textAlign: 'center',

//         border: '1px solid rgba(229, 229, 229, 1)',
//         boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
//         borderRadius: '7px',

//         '& p': {
//             fontFamily: 'gilroyregular',
//             fontSize: '15px',
//             // lineHeight: '30px',
//             color: '#000',
//         },

//         '& h1': {
//             fontFamily: 'gilroybold',
//             fontSize: '25px',
//             lineHeight: '60px',
//             color: '#000',
//         },
//         '& button': {
//             padding: '0 2rem',
//             background: '#F36D31',

//             cursor: 'pointer',

//             border: 'none',
//             borderRadius: '5px',

//             fontFamily: 'gilroylight',
//             fontSize: '18px',
//             lineHeight: '40px',
//             color: '#fff',
//         }
//     },
//     [theme.breakpoints.down(600)]: {
//         searchResult: {
//             margin: '0 1rem',
//         },
//     }
// }))
