import React,{useState} from 'react';

const DisplayFlights = (props) => {

    const [flights, setFlights] = useState(props.location.state);


    return (
        <>
        {console.log(flights)}
                {
                    flights.map(flight => {
                        return 
                    })
                }
        </>
    )
}

export default DisplayFlights;