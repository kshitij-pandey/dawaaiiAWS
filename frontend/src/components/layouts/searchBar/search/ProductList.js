import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import {
    // getProductSearchResult,
    addSearchMed,
    clusterSearch,
} from "../../../../redux/actions/product.action";

function ProductList(props) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const classes = useStyle();
    const history = useHistory();

    const addProductToList = (item) => {
        console.log(props.location);

      let present=false;
      props.product.searchingList.forEach((prod)=>{
          if(prod.productID===item.productID){
              present=true;
          }
      })
     
      if ( present===false)
        {   
            props.addSearchMed(item);
        } 
        history.push("/searchResult");
    };

    useEffect(() => {
        if (props.location.selectedLocation !== null) {
            // props.clusterSearch(
            //     props.product.searchingList,
            //     props.location.selectedLocation.name
            // );
           
        } else {
            setError("Please select a location first...");
        }
        // setProducts(props.product.products)
    }, [props.product.searchingList]);

    //done
    useEffect(() => {
        if(props.productList)
        setProducts(props.productList);
    }, [props.productList]);

    return (
        <>
            <div className={classes.root}>
                {products.length > 0 && props.location.selectedLocation ? (
                    <div className={classes.products}>
                        <div className={classes.productList}>
                            {products.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={(e) => addProductToList(item)}
                                >
                                    <div className={classes.item}>
                                        <h4>{item.productName}</h4>
                                        {/* <p>
                                            Available in {item.storeCount}{" "}
                                            pharmacies nearby at avg cost of
                                            &#8377;{item.price.toFixed(2)}
                                        </p> */}
                                    </div>
                                    <hr style={{ margin: "0" }} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={classes.products}>
                        <div className={classes.productList}>
                            {error === null ? (
                                <div>
                                    <div className={classes.item}>
                                        <h4>Product Not Available Nearby</h4>
                                        <p>Available in 0 pharmacies nearby </p>
                                    </div>
                                    <hr style={{ margin: "0" }} />
                                </div>
                            ) : (
                                <div>
                                    <div className={classes.item}>
                                        <h4>{error}</h4>
                                        {/* <p>Available in 0 pharmacies nearby </p> */}
                                    </div>
                                    <hr style={{ margin: "0" }} />
                                </div>
                            )}
                            {/* <div>
                                <div className={classes.item}>
                                    <h4>Product Not Available Nearby</h4>
                                    <p>Available in 0 pharmacies nearby </p>
                                </div>
                                <hr style={{ margin: "0" }} />
                            </div> */}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    product: state.product,
    location: state.location,
});

export default connect(mapStateToProps, {
    // getProductSearchResult,
    addSearchMed,
    clusterSearch,
})(ProductList);

//styles
const useStyle = makeStyles((theme) => ({
    root: {
        width: "100%",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        // marginLeft: '5rem',
        // marginRight: '1rem',
        // textAlign: 'center',
        top: "1rem",
        right: "-2rem",
        zIndex: "10000",
    },
    products: {
        display: "center",
        justifyContent: "center",
    },
    productList: {
        width: "23rem",
        minHeight: "1rem",
        maxHeight: "29.3rem",
        background: "#fff",

        marginTop: "20px",

        border: "2px solid #C4C4C4",
        borderRadius: "10px",

        overflow: "scroll",
        overflowX: "hidden",

        "& ::-webkit-scrollbar": {
            width: "15px",
        },

        "& ::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 5px grey",
            borderRadius: "30px",
        },

        "& ::-webkit-scrollbar-thumb": {
            background: "#979797",
            borderRadius: "30px",
        },

        // '& ::-webkit-scrollbar-thumb': {
        //     '& :hover': {
        //         background: 'gray',
        //     },
        // },
    },
    item: {
        textAlign: "left",
        padding: "1rem 2rem",
        cursor: "pointer",

        // '& :hover': {
        //     backgroundColor: 'rgba(196, 196, 196, 0.27)',
        // },

        "& h4": {
            margin: "0",
            fontFamily: "gilroylight",
            fontSize: "17px",
            lineHeight: "22.92px",
        },
        "& p": {
            margin: "0",
            fontFamily: "gilroyregular",
            fontSize: "12px",
            lineHeight: "14.06px",
            color: "rgba(0, 0, 0, 0.62)",
        },
    },
    [theme.breakpoints.down(600)]: {
        root: {
            // marginLeft: '0rem',
            top: "8rem",
            right: "0rem",
        },
        productList: {
            width: "20rem",
            marginTop: "15px",
            // margin: '0 1rem',
        },
    },
}));
