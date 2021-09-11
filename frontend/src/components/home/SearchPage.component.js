import React from 'react';
import { makeStyles } from '@material-ui/core';

//Component
import Search from '../layouts/searchBar/Search.component';
import HelpFindInventory from '../General/patch/HelpFindInventory.patch';
import HelpNumber from '../General/patch/HelpNumber.patch';
import Footer from '../layouts/Footer.layout';
//import GoogleSearch from '../layouts/searchBar/GoogleSearch';


function SearchPage() {
    const classes = useStyle();

    return (
        <>
            <div className={classes.root}>
                <div className={classes.logo}>
                    <img src="./assets/images/DawaaiLogo1.png" alt="" />
                </div>
                <div className={classes.title} >
                    <h1>Check <strong>medicine</strong> availability around local pharmacies</h1>
                    <p>Find medicines in nearby pharmacies, order using Whatsapp OR Call and get it deliverd home.</p>
                </div>
                <div className={classes.search} >
                    {/* <SearchOptionInput /> */}
                    <Search />
                    {/* <GoogleSearch /> */}
                </div>
                <div className={classes.contactType} >
                    <p>Order medicine with call or text.</p>
                    <div className={classes.contactLogo} >
                        <div className={classes.call} >
                            <img src="./assets/images/phoneCall1.png" alt="" />
                            <p>Call</p>
                        </div>
                        <div className={classes.vertical}></div>
                        <div className={classes.whatsapp} >
                            <img src="./assets/images/whatsapp3.png" alt="" />
                            <p>Text</p>
                        </div>
                    </div>
                </div>
                <div className={classes.services} >
                    <div className={classes.service} >
                        <img src="./assets/images/searchMed.png" alt="" />
                        <h1>Search Medicine</h1>
                        <p>from pharmacies near you.</p>
                    </div>
                    <div className={classes.service}>
                        <img src="./assets/images/whatsap2.png" alt="" />
                        <h1>Call or Whatsapp</h1>
                        <p>us to order medicine from local pharmacy </p>
                    </div>
                    <div className={classes.service}>
                        <img src="./assets/images/deliveryMan1.png" alt="" />
                        <h1>Delivery</h1>
                        <p>get it deliverd at your location</p>
                    </div>
                </div>
                <div >
                    <HelpFindInventory />
                    <HelpNumber />
                    <Footer />
                </div>

            </div>
        </>
    )
}

export default SearchPage;

//Styles
const useStyle = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
    },
    logo: {
        marginTop: '1.5rem',
        marginBottom: '3rem',
        '& img': {
            width: '230px',
        },
    },
    title: {
        // margin: '0 3rem',
        '& h1': {
            fontFamily: 'gilroybold',
            fontSize: '40px',
            lineHeight: '60px',
            color: 'rgba(49, 49, 49, 0.83)',
            '& strong': {
                color: '#48BF91',
            },
        },
        '& p': {
            marginTop: '1rem',
            fontFamily: 'gilroymedium',
            fontSize: '20px',
            lineHeight: '35px',
            color: 'rgba(49, 49, 49, 0.59)',
        },
    },
    search: {
        marginTop: '3rem',
    },
    contactType: {
        marginTop: '3rem',
        '& p': {
            fontFamily: 'gilroyregular',
            fontSize: '30px',
            lineHeight: '60px',
            color: '#000',
        }
    },
    contactLogo: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
    },
    call: {
        marginRight: '5rem',
        cursor: 'pointer',
        '& img': {
            // width: '70px',
            padding: '1rem',
            background: 'rgba(196, 196, 196, 0.27)',
            borderRadius: '5px',
        }
    },
    vertical: {
        borderLeft: '2px solid black',
        height: '60px',

    },
    whatsapp: {
        // borderLeft: '1px solid #000',
        marginLeft: '5rem',
        cursor: 'pointer',
        '& img': {
            // width: '50px',
            padding: '1rem',
            background: 'rgba(196, 196, 196, 0.27)',
            borderRadius: '5px',
        }
    },
    services: {
        display: 'flex',
        justifyContent: 'center',
        flex: '1 1 1',
        margin: '5rem 3rem',
    },
    service: {
        margin: '2rem',
        padding: '1rem',
        flexGrow: '1',
        flexBasis: '0',
        '& h1': {
            margin: '1rem',
            fontFamily: 'gilroybold',
            fontSize: '30px',
            lineHeight: '35.16px',
            color: '#000',
        },
        '& p': {
            fontFamily: 'gilroylight',
            fontSize: '28px',
            lineHeight: '32.81px',
            color: '#000',
        },
    },
    [theme.breakpoints.down(600)]: {
        logo: {
            marginTop: '1rem',
            marginBottom: '2rem',
            '& img': {
                width: '150px',
            },
        },
        title: {
            '& h1': {
                fontSize: '30px',
                lineHeight: '40px',
            },
            '& p': {
                fontSize: '17px',
                lineHeight: '25px',
            },
        },
        contactType: {
            margin: '2rem 1rem',
            '& p': {
                fontSize: '25px',
                lineHeight: '40px',
            }
        },
        call: {
            marginRight: '3rem',
            '& p': {
                fontSize: '20px',
            },
        },
        whatsapp: {
            marginLeft: '3rem',
            '& p': {
                fontSize: '20px',
            },
        },
        services: {
            flexDirection: 'column',
            margin: '1rem 1rem',
        },
        service: {
            margin: '0',
            marginTop: '3rem',
            marginBottom: '3rem',
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
