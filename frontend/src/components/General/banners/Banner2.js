import React from 'react';
import { makeStyles } from '@material-ui/core';

const Banner2 = () => {
    const classes = useStyle();

    return (
        <>
            <div className={classes.root}>
                <div className={classes.services} >
                    <div className={classes.service} >
                        <img src="./assets/images/searchMed.png" alt="" />
                        <h1>Search Medicine</h1>
                        <p>from pharmacies near you.</p>
                    </div>
                    <div className={classes.service}>
                        <img src="./assets/images/OrderArrow.png" alt="" />
                        <h1>Order</h1>
                        <p>from as many stores as you like to</p>
                    </div>
                    <div className={classes.service}>
                        <img src="./assets/images/deliveryMan1.png" alt="" />
                        <h1>Delivery</h1>
                        <p>get it deliverd at your location</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner2


//Styles
const useStyle = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        margin: '5rem 0',
        // marginTop: '10rem',
    },
    // logo: {
    //     marginTop: '1.5rem',
    //     marginBottom: '3rem',
    //     '& img': {
    //         width: '230px',
    //     },
    // },
    // title: {
    //     // margin: '0 3rem',
    //     '& h1': {
    //         fontFamily: 'gilroybold',
    //         fontSize: '40px',
    //         lineHeight: '60px',
    //         color: 'rgba(49, 49, 49, 0.83)',
    //         '& strong': {
    //             color: '#48BF91',
    //         },
    //     },
    //     '& p': {
    //         marginTop: '1rem',
    //         fontFamily: 'gilroymedium',
    //         fontSize: '20px',
    //         lineHeight: '35px',
    //         color: 'rgba(49, 49, 49, 0.59)',
    //     },
    // },
    // search: {
    //     marginTop: '3rem',
    // },
    // contactType: {
    //     marginTop: '3rem',
    //     '& p': {
    //         fontFamily: 'gilroyregular',
    //         fontSize: '30px',
    //         lineHeight: '60px',
    //         color: '#000',
    //     }
    // },
    // contactLogo: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     marginTop: '2rem',
    // },
    // call: {
    //     marginRight: '5rem',
    //     cursor: 'pointer',
    //     '& img': {
    //         // width: '70px',
    //         padding: '1rem',
    //         background: 'rgba(196, 196, 196, 0.27)',
    //         borderRadius: '5px',
    //     }
    // },
    // vertical: {
    //     borderLeft: '2px solid black',
    //     height: '60px',

    // },
    // whatsapp: {
    //     // borderLeft: '1px solid #000',
    //     marginLeft: '5rem',
    //     cursor: 'pointer',
    //     '& img': {
    //         // width: '50px',
    //         padding: '1rem',
    //         background: 'rgba(196, 196, 196, 0.27)',
    //         borderRadius: '5px',
    //     }
    // },
    services: {
        margin: '0 7rem',
        display: 'flex',
        justifyContent: 'center',
        flex: '1 1 1',
        margin: '0 10rem',
    },
    service: {
        margin: '0 2rem',
        padding: '1rem',
        flexGrow: '1',
        flexBasis: '0',
        '& img': {
            width: '3rem',
        },
        '& h1': {
            margin: '1rem',
            fontFamily: 'gilroybold',
            fontSize: '20px',
            lineHeight: '25.16px',
            color: '#000',
        },
        '& p': {
            fontFamily: 'gilroylight',
            fontSize: '18px',
            lineHeight: '22.81px',
            color: '#000',
        },
    },
    [theme.breakpoints.down(600)]: {
        // logo: {
        //     marginTop: '1rem',
        //     marginBottom: '2rem',
        //     '& img': {
        //         width: '150px',
        //     },
        // },
        // title: {
        //     '& h1': {
        //         fontSize: '30px',
        //         lineHeight: '40px',
        //     },
        //     '& p': {
        //         fontSize: '17px',
        //         lineHeight: '25px',
        //     },
        // },
        contactType: {
            margin: '2rem 1rem',
            '& p': {
                fontSize: '25px',
                lineHeight: '40px',
            }
        },
        // call: {
        //     marginRight: '3rem',
        //     '& p': {
        //         fontSize: '20px',
        //     },
        // },
        // whatsapp: {
        //     marginLeft: '3rem',
        //     '& p': {
        //         fontSize: '20px',
        //     },
        // },
        services: {
            flexDirection: 'column',
            margin: '1rem 1rem',
        },
        service: {
            margin: '0',
            marginTop: '2rem',
            marginBottom: '2rem',
            padding: '0',
            '& h1': {
                fontSize: '25px',
            },
            '& p': {
                fontSize: '24px',
            },
        },
    }
}))