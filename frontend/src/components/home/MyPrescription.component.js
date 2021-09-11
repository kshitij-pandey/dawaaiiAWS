import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

import Navbar from "../layouts/Navbar.layout";
import "../../styles/myPrescription.css";
import HelpFindInventory from "../General/patch/HelpFindInventory.patch";
import HelpNumber from "../General/patch/HelpNumber.patch";
import Footer from "../layouts/Footer.layout";

const useStyle = makeStyles(() => ({
    root: {
        background: "#fff",
        // position: 'relative',
    },
}));

function MyPrescription(props) {
    window.scrollTo(0, 0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const inputFile = useRef(null);
    const [userId, setUserId] = useState("");

    const [prescriptions, setPrescriptions] = useState([]);
    // const [prescriptions, setPrescriptions] = useState([
    //     {
    //         _id: "60d0ce6df6a87bde57c699c5",
    //         path: "uploads/7010213685-15-06-21.jpeg",
    //         hospital: "Heritage Hospital Varanasi",
    //         doctor: "Dr. Alok Ranjan",
    //         department: "Neurology",
    //         uploader: "Hospital Authority",
    //         uploadDate: "2021-06-21T18:30:00.000Z",
    //         rx: 'Rx: A medical prescription. The symbol "Rx" is usually said to stand for the Latin word "recipe" meaning "to take." It is customarily part of the superscription (heading) prescrip',
    //         medicines: [
    //             {
    //                 medicineName: "Prohaims",
    //                 medicinePrice: 15,
    //             },
    //             {
    //                 medicineName: "Dortine Rd T",
    //                 medicinePrice: 10,
    //             },
    //         ],
    //         status: "DONE",
    //     },
    //     {
    //         _id: "60d0ce6df6a87bde57c699c5",
    //         path: "uploads/7010213685-15-06-21.jpeg",
    //         status: "PROCESSING",
    //         uploadDate: "28 Jun 2021",
    //         medicines: [],
    //     },
    // ]);
    const history = useHistory();
    const classes = useStyle();
    const url =
        window.location.host === "3.109.169.235"
            ? "http://localhost:4000"
            : "";

    useEffect(() => {
        window.scrollTo(0, 0);
        const token = localStorage.getItem("Auth-token");
        if (token) {
            verifyToken(token);
        } else {
            setError("Login to Upload your prescription");
            props.showLogin();
            setLoading(false);
        }
    }, []);

    const verifyToken = async (token) => {
        // alert('we verify token')

        setError(null);
        const res = await fetch(`${url}/api/user/verifyToken`, {
            method: "POST",
            headers: new Headers({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            }),
        });

        // const res = await fetch("http://localhost:4000/api/user/verifyToken", {
        //     method: "POST",
        //     headers: new Headers({
        //         Authorization: "Bearer " + token,
        //         "Content-Type": "application/json",
        //     }),
        // });
        // const res = await fetch("/api/user/verifyToken", {
        //     method: "POST",
        //     headers: new Headers({
        //         Authorization: "Bearer " + token,
        //         "Content-Type": "application/json",
        //     }),
        // });
        if (res.status === 200) {
            const id = await res.json();
            console.log(id);
            setUserId(id);
            getMyPrescriptions(id);
            // history.push("/");
        } else {
            setError(null);
            props.showLogin();
        }
        setLoading(false);
    };

    const getMyPrescriptions = async (id) => {
        // setError(null);
        // let date = Date("2021-06-21T18:30:00.000Z");
        // let dateSplit = date.split(" ");
        // let formatedDate =
        //     dateSplit[2] + " " + dateSplit[1] + " " + dateSplit[3];
        // console.log(date);
        // const token = localStorage.getItem("Auth-token");
        // const res = await fetch(`/api/prescriptions/myPrescriptions?id=${id}`, {
        //     method: "GET",
        //     headers: new Headers({
        //         "Content-Type": "application/json",
        //     }),
        // });
        setError(null);
        const res = await fetch(
            `${url}/api/prescriptions/myPrescriptions?id=${id}`,
            {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            }
        );

        // const res = await fetch(
        //     `http://localhost:4000/api/prescriptions/myPrescriptions?id=${id}`,
        //     {
        //         method: "GET",
        //         headers: new Headers({
        //             "Content-Type": "application/json",
        //         }),
        //     }
        // );
        if (res.status !== 200) {
            // history.push("/");
        } else {
            const data = await res.json();
            if (data.prescriptions.length === 0) {
                setError(
                    "No Prescriptions found... Please Upload a Prescription first..."
                );
            }
            setPrescriptions(data.prescriptions);
            setLoading(false);
        }
    };

    const onButtonClick = () => {
        if (error === "Login to Upload your prescription") {
            props.showLogin();
        } else {
            inputFile.current.click();
        }
        // `current` points to the mounted file input element
        // alert(0715);
    };

    const onChangeFile = async (event) => {
        setLoading(true);
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        const formData = new FormData();
        formData.append("prescriptionImage", file);
        const res = await fetch(
            `${url}/api/prescriptions/uploadPrescription?id=${userId}`,
            {
                method: "POST",
                headers: {
                    userID: userId,
                },
                body: formData,
            }
        );
        console.log("id is " + userId);
        console.log(file);
        getMyPrescriptions(userId);
        // window.location.reload();
        // setFileState({ file });
        // console.log(fileState); /// if you want to upload latter
    };

    return (
        <>
            <LoadingOverlay
                active={loading}
                spinner
                text="Loading your Prescriptions..."
            >
                <div className={classes.root}>
                    <Navbar showLogin={props.showLogin} />
                    <div className="header">
                        We distribute <div className="blue-text">medicine</div>{" "}
                        to everyone
                    </div>
                    <div className="sub-head">
                        <div className="text">Upload a New Prescription</div>
                        <div onClick={onButtonClick} className="uploadButton">
                            <div className="icon">
                                <img
                                    src="./assets/images/File_upload.png"
                                    alt=""
                                    srcset=""
                                />
                                <input
                                    type="file"
                                    id="file"
                                    accept="image/*"
                                    ref={inputFile}
                                    style={{ display: "none" }}
                                    onChange={onChangeFile}
                                />
                            </div>
                            <div className="text">Upload Prescription</div>
                        </div>
                    </div>

                    {error && (
                        <div className="pres-container">
                            <div className="pres-con-con">
                                <div className="pres-inner">
                                    <div className="pres-details">{error}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {prescriptions &&
                        prescriptions.map((prescription) =>
                            prescription.status === "DONE" ? (
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "#000",
                                    }}
                                    to={{
                                        pathname: "/prescription",
                                        state: { detail: prescription },
                                    }}
                                >
                                    {" "}
                                    <div className="pres-container">
                                        <div className="pres-date">
                                            {new Date(prescription.uploadDate)
                                                .toString()
                                                .slice(4, 15)}
                                        </div>

                                        {prescription.status === "DONE" ? (
                                            <div className="pres-con-con">
                                                <div
                                                    className="pres-inner"
                                                    // onClick={() => {
                                                    //     history.push({
                                                    //         pathname:
                                                    //             "/prescription",
                                                    //         state: {
                                                    //             detail: prescription,
                                                    //         },
                                                    //     });
                                                    // }}
                                                >
                                                    <div className="pres-details">
                                                        <div className="pres-hospital">
                                                            {
                                                                prescription.hospital
                                                            }
                                                        </div>
                                                        <div className="pres-dept">
                                                            {
                                                                prescription.department
                                                            }
                                                        </div>
                                                        <div className="pres-doc">
                                                            {
                                                                prescription.doctor
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="pres-actions">
                                                        <div className="pres-view">
                                                            View Prescription
                                                        </div>
                                                        <div className="pres-but">
                                                            <img
                                                                src="./assets/images/right_arrow.png"
                                                                alt=""
                                                                srcset=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="pres-inner">
                                                <div className="pres-details">
                                                    Your Prescription is being
                                                    processed... Please check
                                                    back in a few hours...
                                                </div>
                                            </div>
                                        )}

                                        {/* <div className="pres-inner">
                                    
                                    <div className="pres-details">
                                        <div className="pres-hospital">
                                            {prescription.hospital}
                                        </div>
                                        <div className="pres-dept">
                                            {prescription.department}
                                        </div>
                                        <div className="pres-doc">
                                            {prescription.doctor}
                                        </div>
                                    </div>
                                    <div className="pres-actions">
                                        <div className="pres-view">
                                            View Prescription
                                        </div>
                                        <div className="pres-but">
                                            <img
                                                src="./assets/images/right_arrow.png"
                                                alt=""
                                                srcset=""
                                            />
                                        </div>
                                    </div>
                                </div> */}
                                    </div>
                                </Link>
                            ) : (
                                <div className="pres-container">
                                    <div className="pres-date">
                                        {new Date(prescription.uploadDate)
                                            .toString()
                                            .slice(4, 15)}
                                    </div>
                                    <div className="pres-con-con">
                                        <div className="pres-inner">
                                            <div className="pres-details">
                                                Your Prescription is being
                                                processed... Please check back
                                                in a few hours...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}

                    {/* {prescriptions &&
                    prescriptions.map((prescription) => (
                        <div
                            className="pres-container"
                            onClick={() => {
                                history.push("/prescription");
                            }}
                        >
                            <div className="pres-date">
                                {new Date(prescription.uploadDate).slice(4, 14)}
                            </div>
                            {prescription.status === "DONE" ? (
                                <div className="pres-inner">
                                    <div className="pres-details">
                                        <div className="pres-hospital">
                                            {prescription.hospital}
                                        </div>
                                        <div className="pres-dept">
                                            Dept of {prescription.department}
                                        </div>
                                        <div className="pres-doc">
                                            {prescription.doctor}
                                        </div>
                                    </div>
                                    <div className="pres-actions">
                                        <div className="pres-view">
                                            View Prescription
                                        </div>
                                        <div className="pres-but">
                                            <img
                                                src="./assets/images/right_arrow.png"
                                                alt=""
                                                srcset=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="pres-inner">
                                    <div className="pres-details">
                                        Processing... Please Check back in a few
                                        hours...
                                    </div>
                                </div>
                            )}
                        </div>
                    ))} */}

                    {/* <div
                    className="pres-container"
                    onClick={() => {
                        history.push("/prescription");
                    }}
                >
                    <div className="pres-date">15 June 2021</div>
                    <div className="pres-inner">
                        <div className="pres-details">
                            Processing... Please Check back in a few hours...
                        </div>
                    </div>
                </div> */}

                    {/* -------------------------------------- */}
                    {/* <div
                    className="pres-container"
                    onClick={() => {
                        history.push({
                            pathname: "/prescription",
                            state: { pres: prescription },
                        });
                    }}
                >
                    <div className="pres-date">15 June 2021</div>
                    <div className="pres-inner">
                        <div className="pres-details">
                            <div className="pres-hospital">SSH Hospital</div>
                            <div className="pres-dept">Dept of Cardiology</div>
                            <div className="pres-doc">Dr. Om Shankar</div>
                        </div>
                        <div className="pres-actions">
                            <div className="pres-view">View Prescription</div>
                            <div className="pres-but">
                                <img
                                    src="./assets/images/right_arrow.png"
                                    alt=""
                                    srcset=""
                                />
                            </div>
                        </div>
                    </div>
                </div> */}

                    {/* <div className="pres-container">
                    <div className="pres-date">06 May 2021</div>
                    <div className="pres-inner">
                        <div className="pres-details">
                            <div className="pres-hospital">SSH Hospital</div>
                            <div className="pres-dept">General Medicine</div>
                            <div className="pres-doc">Dr. Kudan Sinha</div>
                        </div>
                        <div className="pres-actions">
                            <div className="pres-view">View Prescription</div>
                            <div className="pres-but">
                                <img
                                    src="./assets/images/right_arrow.png"
                                    alt=""
                                    srcset=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pres-container">
                    <div className="pres-date">09 June 2021</div>
                    <div className="pres-inner">
                        <div className="pres-details">
                            <div className="pres-hospital">SSH Hospital</div>
                            <div className="pres-dept">Dept of Cardiology</div>
                            <div className="pres-doc">Dr. Om Shankar</div>
                        </div>
                        <div className="pres-actions">
                            <div className="pres-view">View Prescription</div>
                            <div className="pres-but">
                                <img
                                    src="./assets/images/right_arrow.png"
                                    alt=""
                                    srcset=""
                                />
                            </div>
                        </div>
                    </div>
                </div> */}
                    {/* --------------------------------- */}
                </div>
                <HelpFindInventory />
                <HelpNumber />
                <Footer />
            </LoadingOverlay>
        </>
    );
}

const mapStateToProps = (state) => ({
    ...state,
});

export default connect(mapStateToProps, {})(MyPrescription);
