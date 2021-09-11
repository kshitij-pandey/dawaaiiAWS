import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

import { getGPSLocation } from "../../../redux/actions/location.action";

const createMapOptions = () => {
    return {
        styles: [
            {
                stylers: [
                    { saturation: -100 },
                    { gamma: 0.2 },
                    { lightness: 4 },
                    { visibility: "on" },
                ],
            },
        ],
    };
};

function BaseMap2(props) {
    const [markers, setMarkers] = useState([
        {
            name: "Current position",
            position: {
                lat: "25.3176",
                lng: "82.9739",
                
            },
        },
    ]);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);

    const onMarkerDragEnd = (coord, index) => {
        let counter = 0;
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        markers[index] = { ...markers[index], position: { lat, lng } };
        console.log("lat, lng: ", lat, lng);
        console.log(
            "lat, lng: ",
            markers[0].position.lat,
            markers[0].position.lng
        );
        console.log("counter: ", counter);
        if (counter < 1) {
            props.getGPSLocation(
                markers[0].position.lat,
                markers[0].position.lng
            );
            counter++;
        }
    };

    const getLocation = () => {
        if (!props.isLocationSelected) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const coords = pos.coords;

                    // let newState = Object.assign({}, this.state);
                    // newState.markers[0].position.lat = coords.latitude;
                    // newState.markers[0].position.lng = coords.longitude;

                    const lat = coords.latitude;
                    const lng = coords.longitude;

                    // this.setState(newState);
                    let obj = {
                        title: "",
                        name: "",
                        position: { lat, lng },
                    };
                    let arr = [];
                    arr.push(obj);
                    setMarkers(arr);
                    props.getGPSLocation(lat, lng);
                    console.log(
                        "map",
                        markers[0].position.lat,
                        markers[0].position.lng
                    );
                });
            }
        } else {
            let lat = props.location.my_coords.lat;
            let lng = props.location.my_coords.lng;
            setMarkers([
                {
                    title: "",
                    name: "",
                    position: { lat, lng },
                },
            ]);
            props.getGPSLocation(lat, lng);
        }
    };

    useEffect(() => {
        console.log(props);
        getLocation();
        // props.getGPSLocation(markers[0].position.lat, markers[0].position.lng)
        if (props.isLocationSelected) {
            let lat = props.location.my_coords.lat;
            let lng = props.location.my_coords.lng;
            setMarkers([
                {
                    title: "",
                    name: "",
                    position: { lat, lng },
                },
            ]);
        }
    }, []);

    useEffect(() => {
        // if (counter < 1) {
        //     console.log('counter: ', counter);
        //     props.getGPSLocation(markers[0].position.lat, markers[0].position.lng)
        //     counter++;
        // }
        getLocation();
    }, [props.location.my_coords]);

    // ==========================================================
    const onMarkerClick = (props, marker) => {
        setActiveMarker(marker);
        setSelectedPlace(props);
        setShowingInfoWindow(true);
    };

    const onInfoWindowClose = () => {
        setActiveMarker(null);
        setShowingInfoWindow(false);
    };
    const onMapClicked = () => {
        if (showingInfoWindow) setActiveMarker(null);
        setShowingInfoWindow(false);
    };
    // ==========================================================

    var image = {
        url: "./assets/images/map-location-red-lolipop-shadow.png",
        labelOrigin: new props.google.maps.Point(11, 50),
        origin: new props.google.maps.Point(0, 0),
        anchor: new props.google.maps.Point(17, 34),
        scaledSize: new props.google.maps.Size(50, 50),
    };

    return (
        <div>
            <div style={{ height: "200px", position: "relative" }}>
                <Map
                    google={props.google}
                    style={{
                        width: "100%",
                        height: "200px",
                    }}
                    options={createMapOptions}
                    mapTypeControl={false}
                    streetViewControl={false}
                    zoom={15}
                    // initialCenter={{ lat: markers[0].position.lat, lng: markers[0].position.lng }}
                    center={{
                        lat: markers[0].position.lat,
                        lng: markers[0].position.lng,
                    }}
                    onClick={onMapClicked}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={marker.position}
                            draggable={false}
                            onDragend={(t, map, coord) =>
                                onMarkerDragEnd(coord, index)
                            }
                            name={marker.name}
                            icon={image}
                            onClick={onMarkerClick}
                        />
                    ))}

                    <InfoWindow
                        marker={activeMarker}
                        onClose={onInfoWindowClose}
                        visible={showingInfoWindow}
                    >
                        <span>Deliver to:</span>
                        <br />
                        <span>
                            {props.location.selectedLocation &&
                                props.location.selectedLocation.address}
                        </span>
                    </InfoWindow>
                </Map>

                {/* <button type="submit" onClick={this.handleSubmit} >submit</button> */}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    location: state.location,
});
export default connect(mapStateToProps, { getGPSLocation })(
    GoogleApiWrapper({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    })(BaseMap2)
);
