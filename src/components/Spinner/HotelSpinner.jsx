import React, { useEffect } from 'react'


const HotelSpinner = () => {

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
                    src="https://assets9.lottiefiles.com/packages/lf20_fjyn6oe5.json"
                    style={{ width: "300px", height: "300px" }}>
                </lottie-player>
            </div>
        </>
    )
}

export default HotelSpinner;