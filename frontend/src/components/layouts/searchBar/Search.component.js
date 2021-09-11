import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import ProductList from './search/ProductList';
import LocationList from './search/LocationList';
import SearchOptionInput from './search/SearchOptionInput'

import { getLocations } from '../../../redux/actions/location.action';
import { getProducts } from '../../../redux/actions/product.action';
import SearchBarV2 from './search/SearchBarV2';
import SearchBarV3 from "./search/SearchBarV3";

const Search = (props) => {
    const [input, setInput] = useState('');
    const [locationInput, setLocationInput] = useState('')
    const [productList, setProductList] = useState();
    const [productListShow, setProductListShow] = useState(false);
    const [locationListShow, setLocationListShow] = useState(false)
    const [locationList, setLocationList] = useState();

    const data = {
        string: locationInput
    }
    const prodData = {
        string: input,
        location: props.location.selectedLocation !== null ? props.location.selectedLocation.address : null
    }


    const updateInput = async (input) => {
        setInput(input);
        setLocationListShow(false);
        setProductListShow(true)
    }
    const updateLocation = async (input) => {
        props.location.selectedLocation = null;
        setLocationInput(input);
        setLocationListShow(true);
        setProductListShow(false)
    }

    //Product List
    useEffect(() => {
        if (input && input.length > 0) {
            // props.getProducts(prodData);
            axios.post(`http://localhost:8000/product/searchProduct?term=${input}`).then((ress) => {
                const prodList=[]
               ress.data.forEach((prod)=>{
                   const prodObj={};
                   prodObj.productName=prod.productName
                   prodObj.productID=prod._id
                   prodObj.stores=prod.stores
                   prodList.push(prodObj)
                })
                setProductList(prodList)
            });
           
        }
        if (input < 1) {
            setProductListShow(false)
        }
    }, [input])

    //Location List
    useEffect(() => {
        if (locationInput && locationInput.length > 0) {
            props.getLocations(data);
            setLocationList(props.location.locations)
        }
    }, [locationInput])

    //If selected location change
    useEffect(() => {
        setLocationListShow(false);
        if (props.location.selectedLocation !== null) {
            setLocationInput(props.location.selectedLocation)
        }
    }, [props.location.selectedLocation])

    //If search product change
    useEffect(() => {
        setProductListShow(false);
        // if (props.product.searchResult.length > 0) {
        //     setInput(props.product.searchResult[0].products.productName)
        // }
    }, [props.product.searchResult])

    //Initial render
    useEffect(() => {
        document.addEventListener('click', () => {
            setProductListShow(false);
            setLocationListShow(false)
        });
        if (props.location.selectedLocation !== null) {
            setLocationInput(props.location.selectedLocation)
        }
    }, [])

    return (
        <>
            <div style={{ position: 'relative' }} >
                {/* <SearchOptionInput */}
                {props.locationOnly === undefined && <SearchBarV2
                    searchInput={props.searchInput}
                    keyword={input}
                    locationString={locationInput}
                    setKeyword={updateInput}
                    setLocation={updateLocation}
                    selectedLocation={props.location.selectedLocation}
                />}
                {props.locationOnly && <SearchBarV3
                    searchInput={props.searchInput}
                    keyword={input}
                    locationString={locationInput}
                    setKeyword={updateInput}
                    setLocation={updateLocation}
                    selectedLocation={props.location.selectedLocation}
                />}
                {productListShow && <ProductList productList={productList} />}
                {locationListShow && <LocationList locationList={locationList} />}

            </div>
        </>
    )
}

const mapStateToProps = state => ({
    product: state.product,
    location: state.location
})

export default connect(mapStateToProps, { getLocations, getProducts })(Search)
