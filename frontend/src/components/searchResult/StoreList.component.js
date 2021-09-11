import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import SearchingList from './SearchingList';
import StoreWiseV2 from './cards/StoreWiseV2';
import HelpFindInventory from '../General/patch/HelpFindInventory.patch';
import HelpNumber from '../General/patch/HelpNumber.patch';
import Footer from '../layouts/Footer.layout';

import { setMedicinePackages } from '../../redux/actions/product.action';


function StoreList(props) {
    const classes = useStyle();
    let history = useHistory();
    const [packages, setPackages] = useState([])
    const [count, setCount] = useState(0)
    const { medicinePackages } = props.product;
    // const { sameCluster } = props.product.clusterSearchRes;


    

    useEffect(() => {
        if (count > 0) {
            console.log('searching list change');
            history.goBack()
        }
        setCount(count + 1);
        console.log(count)

    }, [props.product.searchingList])

    return (
        <div>
            <div className={classes.searchResult}>
                <SearchingList searchInput={props.searchInput}  />
            </div>
            <div className={classes.orderType}>
                <p className={classes.selected}>Chepeast</p>
                {/* <p>Fastest</p> */}
            </div>
            <div className={classes.searchResult}>
                {/* this will be array */}
                {medicinePackages.map(pack => (
                    <StoreWiseV2 pack={pack} />
                ))}
            </div>
            <div >
                <HelpFindInventory />
                <HelpNumber />
                <Footer />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps, { setMedicinePackages })(StoreList)


//style
const useStyle = makeStyles((theme) => ({
    searchResult: {
        margin: '1rem 10rem',
    },
    orderType: {
        margin: '2rem 10rem',
        display: 'flex',
        justifyContent: 'space-between',
        width: '9rem',
        '& p': {
            margin: '0',
            padding: '.3rem 1rem',



            fontFamily: 'gilroylight',
            fontSize: '15px',
            lineHeight: '30px',
            color: '#000',

            cursor: 'pointer',
        },

    },
    selected: {
        borderRadius: '7px',
        background: 'rgba(254, 205, 13, 0.16)'
    },

    [theme.breakpoints.down(600)]: {
        searchResult: {
            margin: '2rem 1rem',
        },
        orderType: {
            margin: '2rem 1rem',
        },
    }
}))
