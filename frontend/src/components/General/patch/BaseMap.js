import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import { getGPSLocation } from "../../../redux/actions/location.action";

const createMapOptions = () => {
    return {
        styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.2 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
    }
}

class BaseMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            markers: [
                {
                    name: "Current position",
                    position: {
                        lat: "25.3176",
                        lng: "82.9739",
                         
                    },
                },
            ],
            activeMarker: {},
            selectedPlace: {},
            showingInfoWindow: false
        }
        this.onClick = this.onClick.bind(this);
        // console.log(props);
    }


    onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        console.log("lat, lng: ", lat, lng);

        this.setState((prevState) => {
            console.log(prevState);
            const markers = [...this.state.markers];
            markers[index] = { ...markers[index], position: { lat, lng } };
            return { markers };
        });

        this.props.getGPSLocation(lat, lng);
    };

    getLocation = () => {
        if (!this.props.isLocationSelected) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;

                    let newState = Object.assign({}, this.state);
                    newState.markers[0].position.lat = coords.latitude;
                    newState.markers[0].position.lng = coords.longitude;

                    const lat = coords.latitude;
                    const lng = coords.longitude;

                    // this.setState(newState);
                    this.setState(previousState => {
                        return {
                            markers: [
                                // ...previousState.markers,
                                {
                                    title: "",
                                    name: "",
                                    position: { lat, lng }
                                }
                            ]
                        };
                    });
                    console.log("map", this.state.markers[0].position.lat, this.state.markers[0].position.lng)
                });
            }
        } else {
            let lat = this.props.location.my_coords.lat;
            let lng = this.props.location.my_coords.lng;
            this.setState(previousState => {
                console.log(previousState);
                return {
                    markers: [
                        // ...previousState.markers,
                        {
                            title: "",
                            name: "",
                            position: { lat, lng }
                        }
                    ]
                };
            });
        }
    };

    componentDidMount() {
        console.log(this.props);
        this.getLocation()
        this.props.getGPSLocation(this.state.markers[0].position.lat, this.state.markers[0].position.lng)
        if (this.props.isLocationSelected) {
            let lat = this.props.location.my_coords.lat;
            let lng = this.props.location.my_coords.lng;
            this.setState(previousState => {
                console.log(previousState);
                return {
                    markers: [
                        // ...previousState.markers,
                        {
                            title: "",
                            name: "",
                            position: { lat, lng }
                        }
                    ]
                };
            });
        }
        this.render()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            //   this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            //   this.recenterMap();
        }
    }

    componentWillReceiveProps(nextProps) {
    }



    // componentDidUpdate(prevState, nextState) {
    //     console.log('prev:', prevState.location.my_coords);
    //     console.log('next:', nextState);
    //     let lat = this.props.location.my_coords.lat;
    //     let lng = this.props.location.my_coords.lng;
    //     this.setState(previousState => {
    //         return {
    //             markers: [
    //                 // ...previousState.markers,
    //                 {
    //                     title: "",
    //                     name: "",
    //                     position: { lat, lng }
    //                 }
    //             ]
    //         };
    //     });
    // }

    onClick(t, map, coord) {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.setState((previousState) => {
            return {
                markers: [
                    // ...previousState.markers,
                    {
                        title: "",
                        name: "",
                        position: { lat, lng },
                    },
                ],
            };
        });
        // this.props.getGPSLocation(lat, lng);
    }


    // ========================================================================
    onMarkerClick = (props, marker) =>
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });

    onInfoWindowClose = () =>
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };
    // ========================================================================



    render() {
        console.log(
            this.state.markers[0].position.lat,
            this.state.markers[0].position.lng
        );

        var image = {
            url: './assets/images/map-location-red-lolipop-shadow.png',
            labelOrigin: new this.props.google.maps.Point(11, 50),
            origin: new this.props.google.maps.Point(0, 0),
            anchor: new this.props.google.maps.Point(17, 34),
            scaledSize: new this.props.google.maps.Size(50, 50)
        };


        return (
            <div style={{ height: "200px", position: "relative" }}>
                <Map
                    google={this.props.google}
                    style={{
                        width: "100%",
                        height: "200px",
                    }}
                    options={createMapOptions}
                    mapTypeControl={false}
                    zoom={15}
                    initialCenter={{ lat: this.state.markers[0].position.lat, lng: this.state.markers[0].position.lng }}
                    center={{ lat: this.state.markers[0].position.lat, lng: this.state.markers[0].position.lng }}
                    onClick={this.onMapClicked}
                >
                    {this.state.markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={marker.position}
                            draggable={true}
                            onDragend={(t, map, coord) =>
                                this.onMarkerDragEnd(coord, index)
                            }
                            name={marker.name}
                            icon={image}
                            onClick={this.onMarkerClick}
                        />
                    ))}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        onClose={this.onInfoWindowClose}
                        visible={this.state.showingInfoWindow}
                    >
                        <span>Deliver to:</span><br />
                        <span>{this.props.location.selectedLocation && this.props.location.selectedLocation.address}</span>
                    </InfoWindow>
                </Map>

                {/* <button type="submit" onClick={this.handleSubmit} >submit</button> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    location: state.location
})

export default connect(mapStateToProps, { getGPSLocation })(GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(BaseMap))
