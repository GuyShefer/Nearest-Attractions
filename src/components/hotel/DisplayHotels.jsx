import React, { useState } from 'react'

const DisplayHotels = (props) => {

    const [hotels, setHotels] = useState(props.location.state)



    return (
        <>
        {console.log(props.location.state)}

        </>
    )
}

export default DisplayHotels;