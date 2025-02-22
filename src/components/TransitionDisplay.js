import React from "react";

const TransitionDisplay = ({ firstImage, videoSrc, lastImage }) => {
    return (
        <>
            <div style={styles.container}>
                {/* First Image */}
                <div>
                    <h4 style={{ textAlign: "center", border: "1px solid white", marginBottom: "2px" }}>First Image</h4>
                    <img src={firstImage} alt="First Frame" style={styles.image} />
                </div> 
                {/* Transition Video */}
                <div>
                    <h4 style={{ textAlign: "center", border: "1px solid white", marginBottom: "2px" }}>Intermediate Transition</h4>
                    <video controls style={styles.video}>
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                {/* Last Image */}
                <div>
                    <h4 style={{ textAlign: "center", border: "1px solid white", marginBottom: "2px" }}>Last Image</h4>
                    <img src={lastImage} alt="Last Frame" style={styles.image} />
                </div>
            </div>
        </>
    );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        position: "relative",
        top: "30px",
        justifyContent: "center",
        gap: "20px", // Space between elements
        width: "100%",
        height: "100%"
    },
    image: {
        width: "300px", // Adjust as needed
        height: "auto",
        borderRadius: "10px", // Optional styling
    },
    video: {
        width: "500px", // Adjust as needed
        height: "auto",
        borderRadius: "10px", // Optional styling
    }
};

export default TransitionDisplay;
