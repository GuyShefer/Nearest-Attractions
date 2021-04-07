import React, { useEffect } from 'react'


const RegSpinner = () => {

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
                    src="https://assets3.lottiefiles.com/private_files/lf30_x8ougmmi.json"
                    style={{ width: "300px", height: "300px" }}>
                </lottie-player>
            </div>
        </>
    )
}

export default RegSpinner;