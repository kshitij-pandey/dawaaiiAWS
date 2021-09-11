import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import notFoundAvatar from "../../assets/images/not_found_avatar.png";
import {
    removeSearchMed,
    clearMedicinePackage,
} from "../../redux/actions/product.action";

function SearchingList(props) {
    let history = useHistory();
    console.log("searching list", props);
    const { searchResult, searchingList } = props.product;
    const classes = useStyle();



    let foundedMedicinesList = [];

    props.product.foundedMedicineSearch.map((product) => {
        foundedMedicinesList.push(product);
    });
//  console.log("founded ",foundedMedicinesList)
    useEffect(() => {
        if (props.product.searchingList.length === 0) {
            props.clearMedicinePackage();
            history.push("/");
        }
    }, [props.product.searchingList, history, props]);


    return (
        <>
            <div className={classes.container}>
                <div className={classes.elementHead}>
                    <p>We are searching</p>
                </div>
                <div className={classes.elementSec}>
                    {window.location.pathname === "/searchstore"
                        ? foundedMedicinesList.map((item, i) => (
                            <Element
                                key={i}
                                classes={classes}
                                item={item}
                                removeSearchMed={props.removeSearchMed}
                            />
                        ))
                        : props.product.searchingList.map((item, i) => (
                            <Element
                                key={i}
                                classes={classes}
                                item={item}
                                removeSearchMed={props.removeSearchMed}
                            />
                        ))}
                </div>
                {/* <p onClick={() => props.searchInput.current.focus()}>
                    + Add More Medicine
                </p> */}
                {!(props.product.searchingList.length) && <div className={classes.notFoundContainer}>
                    <div className={classes.notFoundText}><h2>Oops,</h2><br />Dawaaii is not yet available at your location</div>
                    <img src={notFoundAvatar} alt="not_found_avatar" />

                </div>}
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    order: state.order,
    product: state.product,
});

export default connect(mapStateToProps, {
    removeSearchMed,
    clearMedicinePackage,
})(SearchingList);

function Element(props) {
    const { classes, item, removeSearchMed } = props;
    function removeFromSearch(name) {
        console.log(name);
        removeSearchMed(name);
    }

    return (
        <>
            <div className={classes.element}>
                <p>{item.productName}</p>
                <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={(e) => removeFromSearch(item)}
                ></i>
            </div>
        </>
    );
}

//styles
const useStyle = makeStyles((theme) => ({
    container: {
        margin: "2rem",
        flexDirection: "column",
        display: "flex",
        // flexWrap: 'wrap',
        justifyContent: "flex-start",
    },
    notFoundContainer: {
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        "& img": {
            width: "750px",
            height: "auto"
        }

    }
    ,
    notFoundText: {
        fontFamily: "Poppins",
        fontSize: "30px",
        color: "#000",
        "& h2": {
            color: "#D93636"
        }


    },
    elementHead: {
        flexShrink: "0",
        // width: '10rem',
        margin: "10px 20px",
        alignItems: "center",
        "& p": {
            margin: "0",
            fontFamily: "gilroyregular",
            fontSize: "18px",
            color: "#000",
        },
    },

    elementSec: {
        // width: '50em',
        alignItems: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
        "& p": {
            margin: "0",
            fontFamily: "gilroyregular",
            // fontSize: '18px',
            // lineHeight: '60px',
            color: "#000",
            cursor: "pointer",
        },
    },
    element: {
        // width: '160px',
        margin: ".5rem",
        padding: ".5rem 1.2rem",
        display: "flex",
        alignItems: "center",
        background: "rgba(196, 196, 196, 0.27)",

        borderRadius: "5px",

        textAlign: "center",

        "& p": {
            margin: "0",
            fontFamily: "gilroymedium",
            fontSize: "13px",
            // lineHeight: '60px',
            color: "#000",
        },
        "& i": {
            marginLeft: "1rem",
        },
    },
    [theme.breakpoints.down(600)]: {
        container: {
            margin: "0rem",
            marginTop: "2rem",
            flexDirection: "column",
        },
        elementSec: {
            justifyContent: "center",
        },
        elementHead: {
            textAlign: "center",
        },
    },
}));
