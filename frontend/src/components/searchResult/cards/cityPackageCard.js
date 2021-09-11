import React,{useState} from 'react';
import { connect } from 'react-redux';

import { Accordion, AccordionSummary,AccordionDetails, Button, makeStyles, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import ViewDetails from '../../common/ViewDetails.component';
import { formatePack } from '../../../utils/storeWiseProducts';

import { addProductToCart, removeFromCart } from '../../../redux/actions/order.action';
import { expectedDelivery } from '../../../utils/ExpectedDelivery';



function CityPackageCard(props) {
    const { loading } = props.product;
    console.log(props)
    const classes = useStyle();
    console.log("~~~~ is",props.singlePackage)
    const cityPackage=props.singlePackage;
    const [isAdded, setIsAdded] = useState(false)

    let newArray=[]
    if(cityPackage && cityPackage.products ){newArray=formatePack(cityPackage)}


    function addPackageToCart() {
    
        console.log("does cityaPAckage contain cluster",cityPackage);
        setIsAdded(true)
        cityPackage.products.map(product=> {
        
                let obj = {}
                obj.storeID = product.storeID;
                obj.city = product.city;
                obj.cluster=product.cluster;
                obj.storeName = product.storeName;
                obj.itemCount = 1;
                obj.productName = product.productName;
                obj.productID = product.productID;
                obj.productPrice = product.productPrice;
                obj.productDiscount = '0';
                props.addProductToCart(obj);
                console.log(obj);
            })
    }

    function removeFromCart() {
    
        setIsAdded(false)
        cityPackage.products.map(product=> {
        
            let obj = {}
            obj.storeID = product.storeID;
            obj.city = product.city;
             obj.cluster=product.cluster;
            obj.storeName = product.storeName;
            obj.itemCount = 1;
            obj.productName = product.productName;
            obj.productID = product.productID;
            obj.productPrice = product.productPrice;
            obj.productDiscount = '0';
            props.removeFromCart(obj);
            console.log(obj);
        })
    }
   
   
    let displayMedicals;
    if (cityPackage === undefined || loading) {
        displayMedicals = (<p>Loading</p>)
    } else {
        if (cityPackage && cityPackage.products && cityPackage.products.length > 0) {

               displayMedicals= (<FoundItem
                    cart={props.order.cart}
                    classes={classes}
                    cityPackage={cityPackage}
                    isAdded={isAdded}
                    addProductToCart={addPackageToCart}
                    removeFromCart={removeFromCart}
                />)
         
        }
    }

    return (
        <div className={classes.root} >
           {/* <p>Dawaai's Best Deal</p> */}
                   {displayMedicals}
 
        </div>
    )
}

const mapStateToProps = state => ({
    order: state.order,
    product: state.product
})

export default connect(mapStateToProps, { addProductToCart, removeFromCart })(CityPackageCard)


function FoundItem(props) {
    const { classes, cityPackage, cart,isAdded, addProductToCart, removeFromCart } = props;
    
    let added = false;
    // cart.map(product => {
    //     if (product.products._id === item.products._id) {
    //         added = true;
    //     }
    // })
    //Avail
    const displayProducts=cityPackage.products.map((product)=>(
        <p>{product.productName}</p>
    ))

    return (
        <div className={classes.item}>
         
            <div className={classes.medName}>
                {displayProducts}
            </div>
            <div className={clsx(classes.time, classes.timePrice)}>
                            <h4>Tommorow 9: 00 PM</h4>
                            <p>Exprected Delivery Time: </p>
                        </div> 
            <div className={clsx(classes.price, classes.timePrice)}>
                <h4>Rs. {cityPackage.packagePrice}</h4>
            </div>
            <div className={classes.addToCart} >
                {isAdded? (
                    <AddedBtn onClick={e =>
                        removeFromCart(cityPackage)
                    }>
                        Added to cart
                    </AddedBtn>
                ) : (
                    <NotAddedBtn onClick={e => addProductToCart(cityPackage)} >
                        Add to Cart
                    </NotAddedBtn>
                )}
            </div>
        </div>
    );
}



const NotAddedBtn = withStyles({
    root: {
        width: '100%',
        textTransform: 'none',
        padding: '.3rem 1.7rem',
        background: '#F36D31',
        marginTop: '0px',
        marginBottom: '-2px',
        '&:hover': {
            marginTop: '-2px',
            marginBottom: '0px',
            backgroundColor: '#F36D31',
            boxShadow: '0px 10px 9px -5px rgba(0,0,0,0.75)',
        },
    }
})(Button);

const AddedBtn = withStyles({
    root: {
        width: '100%',
        textTransform: 'none',
        padding: '.3rem 1rem',
        background: '#4CAF50',
        marginTop: '0px',
        marginBottom: '-2px',
        '&:hover': {
            marginTop: '-2px',
            marginBottom: '0px',
            background: '#4CAF50',
            boxShadow: '0px 10px 9px -5px rgba(0,0,0,0.75)',
        },
    }
})(Button);

const useStyle = makeStyles((theme) => ({
    root: {
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        '& h1': {
            fontFamily: 'gilroyregular',
            fontSize: '25px',
            lineHeight: '60px',
            color: '#000',
        },
    },
    item: {
        margin: '2rem 0',
        padding: '1rem',

        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexGrow: 'auto 1 1 1',

        border: '1px solid ',
        borderRadius: '7px',
    },
    medName: {
        width: '400px',
        // paddingRight: '130px',

        display: 'flex',
        flexWrap: 'wrap',

        '& p': {
            // width: 'auto',
            padding: '.5rem 1.2rem',
            margin: '1rem',
            background: 'rgba(116, 185, 249, 0.35)',

            borderRadius: '5px',

            fontFamily: 'gilroymedium',
            fontSize: '15px',
            lineHeight: '30px',
            color: '#000',
        },
    },
    time: {
        display: 'block',
    },
    timePrice: {
        textAlign: 'center',
        '& h4': {
            margin: '.5rem 0',
            fontFamily: 'gilroybold',
            fontSize: '18px',
            lineHeight: '30px',
            color: '#000',
        },
        '& p': {
            margin: '.5rem 0',
            fontFamily: 'gilroylight',
            fontSize: '14px',
            lineHeight: '30px',
            color: '#000',
        },
    },
    addToCart: {

        '& button': {
            border: 'none',
            borderRadius: '5px',

            fontFamily: 'gilroyregular',
            fontSize: '18px',
            lineHeight: '40px',
            color: '#fff',
            cursor: 'pointer',

        },
    },
    [theme.breakpoints.down(600)]: {
        root: {
            margin: '5rem 1rem',
            '& h1': {
                fontSize: '20px',
                lineHeight: '30px',
            },
        },
        item: {
            flexDirection: 'column',
        },
        medName: {
            width: '100%',
            textAlign: 'center',
            paddingRight: '0px',
        },
        timePrice: {
            marginTop: '.5rem',
            marginBottom: '.5rem',
        },
        addToCart: {
            width: '100%',
        },
    }

}));