import React, { useEffect } from 'react'


const Spinner = () => {

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    });

    return (
        <>
            <div className="spinner">
                <lottie-player
                    id="firstLottie"
                    autoplay
                    loop
                    mode="normal"
                    src="https://assets3.lottiefiles.com/datafiles/e8edab32a32a8a9402f9cd63b457993c/Plane.json"
                    style={{ width: "300px", height: "300px" }}>
                </lottie-player>
            </div>
        </>
    )
}

export default Spinner;