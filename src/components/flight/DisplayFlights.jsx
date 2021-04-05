import React, { useState, useEffect } from 'react';
import './DisplayFlights.css';
import axios from 'axios'
import Ticket from './Ticket';
import currency_symbols from '../../utilities/currency_symbols';

const DisplayFlights = (props) => {

    const airLabsKey = '48d9567c-e55c-4804-8ac4-b7ad7c36a6f6';

    const [flights, setFlights] = useState(props.location.state);
    const [originAirPort, setOriginAirPort] = useState('');
    const [destinationAirPort, setDestinationAirPort] = useState('');

    useEffect(() => {

        const getAirportsName = async () => {
            if (flights) {
                const departureCode = flights[0].itineraries[0].segments[0].departure.iataCode;
                const arrivalCode = flights[0].itineraries[0].segments[0].arrival.iataCode;
                const departureName = await axios.get(`http://airlabs.co/api/v6/airports?api_key=${airLabsKey}&code=${departureCode}`);
                const arrivalName = await axios.get(`http://airlabs.co/api/v6/airports?api_key=${airLabsKey}&code=${arrivalCode}`)
                setOriginAirPort(departureName.data.response[0].name);
                setDestinationAirPort(arrivalName.data.response[0].name);
            }
        }

        getAirportsName();
    }, [flights])

    

    const addFlightToFavorite = (flight) => {
        let favoriteFlights = JSON.parse(localStorage.getItem('flights'));
        favoriteFlights ?
            favoriteFlights.push(flight) :
            favoriteFlights = [flight];
        localStorage.setItem('flights', JSON.stringify(favoriteFlights));
    }

    return (

        <>
            <h2 className="display-flights-title">SEARCH RESULTS</h2>
            <div className="found-flights-container">
                {

                    flights ? flights.map((flight, index) => {
                        return <div key={index}>
                            <div className="flight-info" >
                                <Ticket
                                    flight={flight}
                                    originAirPort={originAirPort}
                                    destinationAirPort={destinationAirPort}
                                    oridingCode={flight.itineraries[0].segments[0].departure.iataCode}
                                    destinationCode={flight.itineraries[0].segments[0].arrival.iataCode}
                                    boardingDate={flight.itineraries[0].segments[0].departure.at.split('T')[0]}
                                    boardingTime={flight.itineraries[0].segments[0].departure.at.split('T')[1].split(':').slice(0, -1).join(':')}
                                    deparatingDate={flight.itineraries[0].segments[0].arrival.at.split('T')[0]}
                                    deparatingTime={flight.itineraries[0].segments[0].arrival.at.split('T')[1].split(':').slice(0, -1).join(':')}
                                    price={flight.price.total}
                                    currency={currency_symbols[flight.price.currency]}
                                />
                                <Ticket
                                    flight={flight}
                                    originAirPort={destinationAirPort}
                                    destinationAirPort={originAirPort}
                                    oridingCode={flight.itineraries[0].segments[0].arrival.iataCode}
                                    destinationCode={flight.itineraries[0].segments[0].departure.iataCode}
                                    boardingDate={flight.itineraries[1].segments[0].departure.at.split('T')[0]}
                                    boardingTime={flight.itineraries[1].segments[0].departure.at.split('T')[1].split(':').slice(0, -1).join(':')}
                                    deparatingDate={flight.itineraries[1].segments[0].arrival.at.split('T')[0]}
                                    deparatingTime={flight.itineraries[1].segments[0].arrival.at.split('T')[1].split(':').slice(0, -1).join(':')}
                                    price={flight.price.total}
                                    currency={currency_symbols[flight.price.currency]}
                                />

                                <div className="favorite-icon" onClick={() => addFlightToFavorite(flight)}> </div>

                            </div>
                        </div>
                    }) : null
                }
            </div>
        </>
    )
}

export default DisplayFlights;