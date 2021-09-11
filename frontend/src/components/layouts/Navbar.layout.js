import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Button from "react-bootstrap/Button";
import { logoutUser,getUserDetails } from "../../redux/actions/Auth.action";
import Search from "./searchBar/Search.component";
import clsx from "clsx";
import LogoutConfModal from "../modals/LogoutConfModal";

function Navbar(props) {
    const history = useHistory();
    const [logoutModalShow, setLogoutModalShow] = useState(false);
    // --------------------Temp authentication start----bm-mayur---------
    let token = localStorage.getItem("Auth-token");
    useEffect(() => {
        if (token && window.location.pathname !== '/cart') {
            props.getUserDetails(token);
        }
    }, []);
    // --------------------temp authentication end---------------------------------

    useEffect(() => {
        if (localStorage.getItem("Auth-token")) {
            setLoginState(true);
        }
    }, []);

    const { cart } = props.order;
    const [showLogoutButton, setButtonState] = useState(false);
    const [loginState, setLoginState] = useState(false); //switch back to false
    // const [loginState, setLoginState] = useState(true); //switch back to false

    let cartLength = 0;
    if (cart !== undefined) {
        cartLength = cart.length;
    }

    const classes = useStyle();

    return (
        <div className={classes.root}>
            <div className={classes.main}>
                <div className={classes.logo}>
                    <Link to="/">
                        <img
                            className={classes.png_logo}
                            src="./assets/images/dawaaii_logo_new.png"
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className={classes.search}>
                    <Search searchInput={props.searchInput} />
                </div>
                {/* <div className={clsx(classes.cart, classes.mobileCart)}>
                    <Link to="/addnumber">
                        <img src="./assets/images/shoppingCart1.png" alt="" />
                        <p>{cartLength}</p>
                    </Link>
                </div> */}
                <div></div>
                <div className={classes.navAction}>
                    <div className={clsx(classes.cart)}>
                        <Link to="/cart">
                            <img
                                src="./assets/images/shoppingCart1.png"
                                alt=""
                            />
                        </Link>
                        <div className={classes.cartCounter}>
                            <p>{cartLength}</p>
                        </div>
                    </div>
                    {loginState ? (
                        <div className={classes.userDp}>
                            <img
                                src="./assets/images/UserDP.png"
                                alt="avatar"
                                onMouseEnter={() => {setButtonState(true)}}
                               
                                onClick={(e) => history.push("/profile")}
                            />
                            <LogoutConfModal
                                show={logoutModalShow}
                                onHide={() => setLogoutModalShow(false)}
                                decisionaccept={() => {
                                    // console.log("I ACCEPTED THE DECISION");
                                    localStorage.removeItem("Auth-token");
                                    props.logoutUser(); //*Clearing auth and cart state// keep it Important
                                    history.push("/");
                                }}
                                decisionreject={() => {
                                    setLogoutModalShow(false);
                                }}
                            />

        
                            {showLogoutButton && <div  onMouseLeave={() => {setButtonState(false) }} className={classes.overlay_menu}>

                                <button
                                    className="log-out"
                                    onClick={() => {
                                        setLogoutModalShow(true);

                                    }}
                                >
                                    Logout
                                </button>
                            </div>}
                        </div>
                    ) : (
                        <div className={classes.login}>
                            <button
                                onClick={props.showLogin}
                                id="login_btn"
                                className={classes.btn}
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className={classes.mobileSearch}>
                <Search />
            </div>

            <div className={classes.subtitle}>
                <p className={classes.subtitlePara}>Now you can </p>
                <a href="tel:+91 76783 94361">
                    <img
                        className={classes.subtitleImg}
                        src="./assets/images/Vector.png"
                        alt=""
                    />
                </a>
                <p className={classes.subtitlePara}>or </p>
                <a href="https://wa.me/917678394361">
                    <img
                        className={classes.subtitleImg}
                        src="./assets/images/whatsapp3.png"
                        alt=""
                        style={{ width: "40px", padding: ".5rem" }}
                    />
                </a>
                <p className={classes.subtitlePara}>to order from us.</p>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    order: state.order,
    auth:state.auth
});

export default connect(mapStateToProps, { getUserDetails,logoutUser })(Navbar);

const useStyle = makeStyles((theme) => ({
    root: {
        width: "100%",
        textAlign: "center",
        background: "#fff !important",

        padding: "3rem 2rem 1rem 2rem",
        zIndex: "10000",
    },
    overlay_menu: {
        position: "absolute",
        border: "1px solid #48BF91",
        width: "100px",
        transform: "translate(-78%, 13%)",
        height: "fit-content",
        transition: "all .5s ease-in-out",
        background: "#48BF91",
        padding: "5px",
        borderRadius: "5px",
        "& button": {
            background: "none",
            outline: "none",
            border: "none",
            fontFamily: "gilroylight",
            fontWeight: "bold",
            color: "#fff"
        }
    },
    main: {
        margin: "1rem",
        // marginRight: "3rem",

        height: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    png_logo: {
        margin: ".5rem 0",
        width: "170.87px",
        cursor: "pointer",
    },
    search: {
        marginRight: "8rem",
    },
    navAction: {
        // width: "13rem",
        position: "absolute",
        right: "0",
        marginRight: "3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        "& > div:nth-child(2)": {
            marginLeft: "3rem",
        },
    },
    login: {
        marginRight: "0",
    },
    btn: {
        background: "#48BF91",
        color: "#ffffff",

        fontSize: "20px",
        fontFamily: "gilroymedium",

        width: "123px",
        height: "42px",

        border: "none",
        borderRadius: "5px",

        "&:hover": {
            cursor: "pointer",
        },
    },
    cart: {
        // marginRight: '-2rem',
        // right: '2rem',
        cursor: "pointer",
        "& > div": {
            position: "absolute",
            width: "1.7rem",
            height: "1.7rem",
            padding: "2px 7px",
            margin: "-55px 25px",
            background: "rgba(196, 196, 196, 0.27)",

            borderRadius: "50px",
            border: "2px solid #000",
            "& p": {
                textAlign: "center",
                fontFamily: "gilroymedium",
                fontSize: "15px",
                color: "#000",
                zIndex: "1",
            },
            // textDecoration: 'none',
        },
        "& img": {
            // position: 'absolute',
            width: "40px",
            zIndex: "10",
        },
    },
    userDp: {
        textAlign: "center",
        cursor: "pointer",
        "&:hover": {
            cursor: "pointer",
           
        }
    },
    desktopCart: {
        display: "block",
    },
    mobileCart: {
        display: "none",
    },
    mobileSearch: {
        display: "none",
    },
    subtitle: {
        marginTop: "2rem",
        marginBottom: "1rem",
        // marginLeft: '-7rem',

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    subtitlePara: {
        margin: "0",
        fontFamily: "gilroyregular",
        fontSize: "18px",
        lineHeight: "60px",
    },
    subtitleImg: {
        padding: ".7rem",
        margin: "0 .5rem",
        background: "rgba(196, 196, 196, 0.27)",

        borderRadius: "5px",
        "&:hover": {
            cursor: "pointer",
        },
    },
    [theme.breakpoints.down(600)]: {
        root: {
            padding: "0",
        },
        main: {
            margin: "0",
            padding: ".6rem 1rem",

            height: "auto",

            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        },
        png_logo: {
            width: "120px",
        },
        navAction: {
            // margin: '1rem',
            // width: "8rem",
            marginRight: "1rem",
            display: "flex",
            justifyContent: "space-between",

            "& > div:nth-child(2)": {
                marginLeft: "1rem",
            },
        },
        btn: {
            fontSize: "10px",
            fontFamily: "gilroymedium",

            width: "73.21px",
            height: "25px",

            "&:hover": {
                cursor: "pointer",
            },
        },
        // cart: {
        //     marginRight: "1rem",
        //     "& p": {
        //         padding: "2px 7px",
        //         margin: "-38px 16px",

        //         border: "1px solid #000",

        //         fontSize: "10px",
        //     },
        //     "& img": {
        //         width: "25px",
        //     },
        // },
        cart: {
            marginRight: "1rem",
            // right: '2rem',
            "& > div": {
                position: "absolute",
                width: "1.5rem",
                height: "1.5rem",
                padding: "0px 5px",
                margin: "-44px 20px",
                background: "rgba(196, 196, 196, 0.27)",

                borderRadius: "50px",
                border: "2px solid #000",
                "& p": {
                    textAlign: "center",
                    fontFamily: "gilroymedium",
                    fontSize: "15px",
                    color: "#000",
                    zIndex: "1",
                },
                // textDecoration: 'none',
            },
            "& img": {
                // position: 'absolute',
                width: "30px",
                zIndex: "10",
            },
        },
        desktopCart: {
            display: "none",
        },
        mobileCart: {
            display: "block",
        },
        search: {
            display: "none",
        },
        mobileSearch: {
            display: "block",
        },
        subtitle: {
            marginTop: ".2rem",
            marginLeft: "0rem",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        subtitlePara: {
            fontFamily: "gilroyregular",
            fontSize: "12px",
            lineHeight: "60px",
        },
        subtitleImg: {
            padding: ".7rem",
            margin: "0 .5rem",
            background: "rgba(196, 196, 196, 0.27)",

            borderRadius: "5px",
        },
    },
}));
