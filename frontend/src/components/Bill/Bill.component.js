import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import CustomerInfo1 from '../layouts/customer/forms/customerInfo1.component';
// import CustomerInfo1 from '../layouts/customer/forms/customer';
import Cart from '../layouts/cart/Cart.component';
import OrderedSuccess from './OrderedSuccess';
import HelpFindInventory from '../General/patch/HelpFindInventory.patch';
import HelpNumber from '../General/patch/HelpNumber.patch';
import MobileCustomer from '../layouts/customer/forms/MobileCustomer.component';
import Footer from '../layouts/Footer.layout';

import { submitOrder } from '../../redux/actions/order.action';
import axios from 'axios';
import EmptyCart from './EmptyCart';
const url =
    window.location.host === "3.109.169.235" ? "http://localhost:8000" : "";
function loadScript(src) {
    return new Promise(resolve => {
        const script = document.createElement('script')
        script.src = src;
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}



function Bill(props) {
    const classes = useStyle();
    const [success, setSuccess] = useState(false)
    const [isCartEmpty, setIsCartEmpty] = useState(true);


    useEffect(() => {
        if (props.order.cart && props.order.cart.length === 0) {
            setIsCartEmpty(true)
            window.scroll(0, 0)
        } else {
            setIsCartEmpty(false)
        }
    }, [props.order.cart])


    //functions
    //Razorpay window
    async function displayRazorpay() {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        const name = 'name';
        const email = 'name@gmail.com';
        console.log(name, email);

        if (!res) {
            alert('RazorPay SDK faild to load')
            return
        }

        let cartProduct = [];
        props.order.cart.map(item => {
           const product={}
           product.storeID = item.storeID;
            product.storeName = item.storeName;
           product.productQuantity = item.itemCount;
           product.productPrice = item.productPrice
            cartProduct.push(product)
        })

        let newOrder = {
            phoneNo: props.auth.user.phoneNo,
            address: props.order.address, //This must be from auth
            city: props.location.selectedLocation.name,
            products: cartProduct,
            status: 'active',
        }

        const data = await axios.post(`${url}/payment/payment`, newOrder).then(t => { return t.data });
        // console.log(data);

        const options = {
            "key": process.env.RAZORPAY_KEY_ID,
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            'name': "Check out",
            "description": "Pay",
            "image": "https://rapidapi-prod-apis.s3.amazonaws.com/b42aa17d-8ae0-4a28-b29f-587af5454390.png",
            "handler": function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);

                // alert(response.razorpay_signature)
                props.submitOrder(newOrder)
                setSuccess(true)
                console.log(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
            },
            "prefill": {
                contact: `+91 ${props.auth.user.phoneNo}`
            },
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }


    //Initiates On Order button clicked
    const placeOrder = (e) => {
        e.preventDefault();
        if (props.order.cart.length > 0) {
            displayRazorpay();
        } else {
            console.log('cart is Empty!');
        }
    }

    // useEffect(() => {
    //     setSuccess(props.order.orderSuccess)
    // }, [props.order.orderSuccess])


    return (
        <>
            <div style={{ background: '#F0F5F7', }}>
                {!success && isCartEmpty ?
                    <EmptyCart /> :

                    <div className={classes.bill} >
                        {success ?
                            <OrderedSuccess />
                            :
                            (
                                <>
                                    <div className={classes.desktop} >
                                        <CustomerInfo1 showLogin={props.showLogin} placeOrder={placeOrder} />
                                    </div>
                                    <div className={classes.mobile} >
                                        <MobileCustomer showLogin={props.showLogin} placeOrder={placeOrder} />
                                    </div>
                                </>
                            )
                        }
                        <Cart success={success} />
                    </div>
                }

                <div style={{ paddingBottom: '1rem' }}>
                    <HelpFindInventory />
                    <HelpNumber />
                    <Footer />
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    order: state.order,
    location: state.location
})

export default connect(mapStateToProps, { submitOrder })(Bill)


//styles
const useStyle = makeStyles((theme) => ({
    bill: {
        paddingTop: '8rem',
        display: 'flex',
        justifyContent: 'center',
        paddingRight: '3rem',
    },
    desktop: {
        display: 'block',
    },
    mobile: {
        display: 'none',
    },
    [theme.breakpoints.down(600)]: {
        bill: {
            paddingTop: '0rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: '0rem',
            paddingLeft: '0rem',
            width: 'auto',
        },
        desktop: {
            display: 'none',
        },
        mobile: {
            zIndex: '1000',
            position: 'fixed',
            display: 'block',
            width: '100%',
            bottom: '0',
        },
    }
}))