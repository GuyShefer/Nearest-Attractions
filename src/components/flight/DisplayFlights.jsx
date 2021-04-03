import React, { useState, useEffect } from 'react';
import './DisplayFlights.css';

const DisplayFlights = (props) => {

    const [flights, setFlights] = useState();
    const [originAirPort, setOriginAirPort] = useState('');
    const [destinationAirPort, setDestinationAirPort] = useState('');

    useEffect(() => {
        const propsValue = props.location.state;
        setFlights(propsValue[0]);
        setOriginAirPort(propsValue[1]);
        setDestinationAirPort(propsValue[2]);
    }, [])

    return (
        <>
            {console.log(flights), console.log(originAirPort), console.log(destinationAirPort)}

            <div className="found-flights-container">
                {
                    flights ?
                        flights.map(flight => {
                            return <div className="flight-info" key={flight.id}>
                                <div className="price"> {flight.price.total} & favorite</div>
                                <div className="single-direction">
                                    <p><b>{originAirPort}</b> To <b>{destinationAirPort}</b></p>
                                    <span>At : {flight.itineraries[0].segments[0].departure.at.split('T')[0]}</span>
                                    <span> Boarding Time: {flight.itineraries[0].segments[0].departure.at.split('T')[1]}</span>
                                    <span> Deparating  Time: {flight.itineraries[0].segments[0].arrival.at.split('T').join(' ')}</span>
                                </div>

                                <div className="single-direction">
                                    <p><b>{destinationAirPort}</b> To <b>{originAirPort}</b></p>
                                    <span>At : {flight.itineraries[1].segments[0].departure.at.split('T')[0]}</span>
                                    <span> Boarding Time: {flight.itineraries[1].segments[0].departure.at.split('T')[1]}</span>
                                    <span> Deparating  Time: {flight.itineraries[1].segments[0].arrival.at.split('T').join(' ')}</span>
                                </div>
                            </div>
                        })
                        : null
                }
            </div>
        </>
    )
}

export default DisplayFlights;