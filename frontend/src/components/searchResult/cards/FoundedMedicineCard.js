import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import {
    setMedicinePackages,
    clusterSearch,
    clearMedicinePackage,

} from "../../../redux/actions/product.action";
import { getAllDeals } from "../../../utils/packaging";

function FoundedMedicineCard(props) {
    console.log("rerendering ho raha hai",props.productsInCluster)
    const [leastPackPrice, setLeastPackPrice] = useState(0);
    const [packages,setPackages]= useState([]);
    const classes = useStyle();
    const productsInCluster=props.productsInCluster
    
    let foundedMedicinesList = []
    let foundedItemCtn = 0;
    let totalLength=props.product.searchingList.length;
    if (productsInCluster && productsInCluster.length > 0) {
        console.log(productsInCluster);
        foundedItemCtn = productsInCluster && productsInCluster.length;
    }

    // ============================================================================
    useEffect(async () => {
        console.log("now the list is",props.product.searchingList,productsInCluster)
        if (productsInCluster.length>0) {
           console.log("called")
           const packagesArray=await getAllDeals(productsInCluster,props.location.storesInCluster);
           console.log("packages",props.product.searchingList.length,packagesArray)
           setPackages(packagesArray)
           props.setMedicinePackages(packagesArray)
           if(packages.length>0){setLeastPackPrice(packages[0].price)}
        }
    }, [props.product.foundedMedicineSearch]);

useEffect(()=>{
    if(packages.length>0){setLeastPackPrice(packages[0].price)}
},[props.product.medicinePackages])

    // useEffect(() => {
    //     if (props.product.medicinePackages.length > 0) {
    //         setLeastPackPrice(props.product.medicinePackages[0].price);
    //     }
    // }, [props.product.medicinePackages]);

    // useEffect(() => {
    //     if (props.product.searchingList.length > 1) {
    //         getAllDeals();
    //     }
    // }, []);

    let foundItemCard;
    if ( packages.length>0 && props.product.foundedMedicineSearch.length>0
    ) {
        foundItemCard = (
            <div className={classes.foundedItemCard}>
                <div className={classes.foundMedList}>
                    <h3>
                        {productsInCluster.length} out of {totalLength} medicine are
                        available around your locality{" "}
                    </h3>
                    <div className={classes.foundItemList}>
                        {productsInCluster &&
                            productsInCluster.map((med, i) => (
                                <p key={i}>{med.productName}</p>
                            ))}
                        {/* <p>Modafinil</p> */}
                    </div>
                </div>
                <div className={classes.buyOptionsCard}>
                    <p>{packages.length} Buying options available</p>
                    {/* { packages.length} */}
                    <p>starting from</p>
                    <div>
                        <h1>Rs. {leastPackPrice}</h1> 
                        {/* leastPackPrice */}
                        <Link to="/searchstore">
                            <button > 
                                {/* //onClick={getAllDeals} */}
                                Select <span>&#x2192;</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
   
    return <>{foundItemCard}</>;
}

const mapStateToProps = (state) => ({
    product: state.product,
    location: state.location,
});

export default connect(mapStateToProps, {
    setMedicinePackages,
    clusterSearch,
    clearMedicinePackage,

})(FoundedMedicineCard);

//style
const useStyle = makeStyles((theme) => ({
    foundedItemCard: {
        margin: "2rem 0rem",
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
            marginBottom: "0",
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
            margin: "2rem 1rem",
        },
        foundedItemCard: {
            flexDirection: "column",
            margin: "1rem 0rem",
            padding: "1rem",
        },
        foundMedList: {
            width: "100%",
            "& h3": {},
        },
        buyOptionsCard: {
            "& > div": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "& h1": {
                    fontSize: "20px",
                    lineHeight: "25px",
                },
            },
        },
    },
}));
