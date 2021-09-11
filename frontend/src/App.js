import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import "./App.css";

//Redux
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.redux";
import { PersistGate } from "redux-persist/integration/react";

//Components
import Navbar from "./components/layouts/Navbar.layout";
import Footer from "./components/layouts/Footer.layout";
import Home from "./components/home/Home.component";

import Bill from "./components/Bill/Bill.component";

import LoginPopup2 from "./components/login/LoginPopup2";

import ScrollToTop from "./components/ScrollToTop";
import ScrollToTop2 from "./components/ScrollToTop2";

import SearchResult from "./components/searchResult/SearchResult.component";
// import Bill from './components/Bill/Bill.component'
import StoreListComponent from "./components/searchResult/StoreList.component";
import AddNumber from "./components/layouts/customer/forms/mobile/AddNumber";
import AddAddress from "./components/layouts/customer/forms/mobile/AddAddress";
import EditProfile from "./components/login/EditProfile";
import ProfileComponent from "./components/profile/Profile.component";
function App() {
    const classes = useStyle();
    const [pathname, setpathname] = useState(window.location.pathname);
    const [modalShow, setModalShow] = useState(false);
    const [editProfileModalShow, setEditProfileModalShow] = useState(false);
    const [addAddressModalShow, setAddAddressModalShow] = useState(false);
    const [phoneNo, setPhoneNo] = useState(null);

    const searchInput = React.createRef();
    
    useEffect(() => { }, [phoneNo]);

    useEffect(() => {
        setpathname(window.location.pathname);
    }, [pathname]);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <ScrollToTop>
                        <div>
                            <Route path="/" exact>
                                {/* <SearchPage /> */}
                                <Home showLogin={() => setModalShow(true)} />
                            </Route>
                            <Switch>
                                <Route path="/searchResult" exact>
                                    <Navbar
                                        showLogin={() => {
                                            setModalShow(true);
                                        }}
                                        searchInput={searchInput}
                                    />
                                    <SearchResult  searchInput={searchInput}/>
                                </Route>
                                <Route path="/searchstore" exact>
                                    <Navbar
                                        showLogin={() => {
                                            setModalShow(true);
                                        }}
                                        searchInput={searchInput}
                                    />
                                    <StoreListComponent  searchInput={searchInput}/>
                                </Route>

                                <Route path="/cart/">
                                    <Navbar
                                        showLogin={() => {
                                            setModalShow(true);
                                        }}
                                        searchInput={searchInput}
                                    />
                                    <Bill
                                        showLogin={() => {
                                            setModalShow(true);
                                        }}
                                    />
                                </Route>
                            </Switch>
                            <Route path="/profile">
                                    <ProfileComponent />
                                </Route>
                            <Route path="/addnumber" component={AddNumber} />
                            <Route path="/addaddress" component={AddAddress} />
                            <LoginPopup2
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                showEditProfile={(no) => {
                                    setPhoneNo(no);
                                    // alert("returned phone no is: " + no);
                                    setEditProfileModalShow(true);
                                }}
                            />
                            <EditProfile
                                show={editProfileModalShow}
                                userPhoneNumber={phoneNo}
                                onHide={() => setEditProfileModalShow(false)}
                            />
                        </div>
                    </ScrollToTop>
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;

//styles
const useStyle = makeStyles((theme) => ({
    whiteBg: {
        background: "#fff",
    },
    lgBlueBg: {
        background: "#F0F5F7",
    },
}));
