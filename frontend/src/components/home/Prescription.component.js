import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link, useLocation } from "react-router-dom";
// import { getProductSeachResult } from "../../redux/actions/product.action";
import { clusterSearch } from "../../redux/actions/product.action";
import AddLocationModal from "../modals/AddLocationModal";
import Navbar from "../layouts/Navbar.layout";
import "../../styles/prescription.css";
import HelpFindInventory from "../General/patch/HelpFindInventory.patch";
import HelpNumber from "../General/patch/HelpNumber.patch";
import Footer from "../layouts/Footer.layout";
import ScrollToTopOM from "../ScrollToTopOM";

const useStyle = makeStyles(() => ({
    root: {
        background: "#fff",
        // position: 'relative',
    },
}));

function Prescription(props) {
    // const location = useHistory();
    const location = useLocation();
    const [showLocationModal, setShowLocationModal] = useState(false);
    const history = useHistory();
    // const { location: { state: { details } } = useHistory();
    const classes = useStyle();

    // const [prescription, setPrescription] = useState(null);
    // const [medicineArray, setMedicineArray] = useState(null);
    useEffect(() => {
        console.log("we loaded?");
        window.scrollTo(0, 0);
        // setPrescription(location.state.detail);
        // console.log(location.state.detail);
        // let medArray = [];
        // location.state.detail.medicines.map((med) => {
        //     medArray.push(med.medicineName);
        // });
        // setMedicineArray(medArray);
    }, []);

    const findMedicine = () => {
        let medicineArray = [];
        setShowLocationModal(true);
        const promises = location.state.detail.medicines.map((med) => {
            medicineArray.push(med.medicineName);
        });
        console.log(medicineArray);
        medicineArray.map(medicineName => {
            Promise.allSettled(promises).then((val) => {
                // alert(`Searching with ${name}`);
                const loc = "Varanasi";
                props.getProductSeachResult(medicineName, loc);
                console.log(medicineArray);
                props.clusterSearch(medicineArray, loc);
            });
        })
        history.push("/searchResult");
    };

    return (
        <>
            <ScrollToTopOM />
            <div className={classes.root}>
                {showLocationModal && <AddLocationModal setModal={setShowLocationModal} />}
                <Navbar showLogin={props.showLogin} />
                <div className="outer-con">
                    <div className="container">
                        <div className="head">
                            {location.state.detail.hospital} |{" "}
                            {location.state.detail.department} |{" "}
                            {location.state.detail.doctor}
                            {/* SSH Hospital Varanasi | Cardiology | Dr. Om Shankar */}
                        </div>
                        <div className="details">
                            Upload by <b>{location.state.detail.uploader}</b> on{" "}
                            <b>
                                {new Date(location.state.detail.uploadDate)
                                    .toString()
                                    .slice(4, 15)}
                            </b>
                        </div>
                        {/* <div className="details">
                            Upload by <b>Hospital Authority</b> on{" "}
                            <b>15 June 2021</b>
                        </div> */}
                    </div>
                    <div className="container">
                        <div className="con-sub-head">Rx:-</div>
                        <div className="rx-content">
                            {location.state.detail.rx}
                        </div>
                    </div>
                    <div className="container">
                        <div className="con-sub-head">Medicine Prescribed</div>
                        <div className="medicines">
                            {location.state.detail.medicines.map((med) => (
                                <div className="medCon">
                                    <div className="med">
                                        {med.medicineName}
                                    </div>
                                    {/* <div
                                        className="find-med"
                                        onClick={() => {
                                            findMedicine(med.medicineName);
                                        }}
                                    >
                                        <div className="text">Find Now</div>
                                        <div className="icon">
                                            <img
                                                src="./assets/images/right_arrow.png"
                                                alt=""
                                                srcset=""
                                            />
                                        </div>
                                    </div> */}
                                </div>
                            ))}
                            <br />

                            {/* <div className="med">Paracetemol</div>
                            <div className="med">Aciloc 150mg</div>
                            <div className="med">Dortine Rd T</div>
                            <div className="med">Sy Coflet</div> */}
                        </div>
                        <div
                            className="find-med"
                            onClick={() => {
                                findMedicine();
                            }}
                        >
                            <div className="text">Find Medicine Near You</div>
                            <div className="icon">
                                <img
                                    src="./assets/images/right_arrow.png"
                                    alt=""
                                    srcset=""
                                />
                            </div>
                        </div>
                        {/* <div className="con-sub-head">Medicine Prescribed</div>
                        <div className="medicines">
                            <div className="med">Paracetemol</div>
                            <div className="med">Aciloc 150mg</div>
                            <div className="med">Dortine Rd T</div>
                            <div className="med">Sy Coflet</div>
                        </div> */}
                    </div>
                </div>
            </div>
            <HelpFindInventory />
            <HelpNumber />
            <Footer />
        </>
    );
}



const mapStateToProps = (state) => ({
    product: state.product,
    location: state.location,
});

export default connect(mapStateToProps, { clusterSearch })(Prescription);
