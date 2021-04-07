import React, { useEffect, useState } from 'react'
import './Favorites.css'
import currency_symbols from '../../utilities/currency_symbols';
import Ticket from '../flight/Ticket';
import Hotel from '../hotel/Hotel';
import Attraction from '../attraction/Attraction';

const Favorites = () => {
    const [flights, setFlights] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const [displayFlights, setDisplayFlights] = useState(true);
    const [displayHotels, setDisplayHotels] = useState(false);
    const [displayAttractions, setDisplayAttractions] = useState(false);

    useEffect(() => {
        setFlights(JSON.parse(localStorage.getItem('flightsData')));
        setHotels(JSON.parse(localStorage.getItem('hotelsData')));
        setAttractions(JSON.parse(localStorage.getItem('attractionData')));
    }, [])

    // delete flights
    const deleteFlightFromFavorites = (flight) => {
        console.log(flight);
        const flights = JSON.parse(localStorage.getItem('flightsData'));
        for (let i = 0; i < flights.length; i++) {
            if (flights[i].id === flight.id) {
                flights.splice(i, 1);
            }
        }

        localStorage.setItem('flightsData', JSON.stringify(flights));
        setFlights(flights)
    }

    // delete hotels
    const deleteHotelFromFavorites = (hotel) => {
        const hotels = JSON.parse(localStorage.getItem('hotelsData'));
        for (let i = 0; i < hotels.length; i++) {
            if (hotels[i].name === hotel.name && hotels[i].checkIn === hotel.checkIn) {
                hotels.splice(i, 1);
            }
        }
        localStorage.setItem('hotelsData', JSON.stringify(hotels));
        setHotels(hotels)
    }

    // delete attraction
    const deleteAttractionFromFavorites = (attraction) => {
        const attractions = JSON.parse(localStorage.getItem('attractionData'));
        for (let i = 0; i < attractions.length; i++) {
            if (attractions[i].id = attraction.id) {
                attractions.splice(i, 1);
            }
        }
        localStorage.setItem('attractionData', JSON.stringify(attractions));
        setAttractions(attractions);
    }

    const displayFlightsHandler = () => {
        setDisplayFlights(!displayFlights);
    }

    const displayHotelsHandler = () => {
        setDisplayHotels(!displayHotels);
    }

    const displayAttractionsHandler = () => {
        setDisplayAttractions(!displayAttractions);
    }

    return (
        <>
            <div className="button-container">
                <input type="button" className="btn btn-info" value="My Flights" onClick={displayFlightsHandler} />
                <input type="button" className="btn btn-info" value="My Hotels" onClick={displayHotelsHandler} />
                <input type="button" className="btn btn-info" value="My Attractions" onClick={displayAttractionsHandler} />
            </div>

            {console.log(attractions)}
            {/* {console.log('f', flights, 'h', hotels, 'a', attractions)} */}

            <div className="favorites-container">
                {
                    flights && displayFlights ? flights.map((flight, index) => {
                        return <div key={index}>
                            <div className="flight-info" >
                                <Ticket
                                    flight={flight}
                                    originAirPort={flight.originAirPort}
                                    destinationAirPort={flight.destinationAirPort}
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
                                    originAirPort={flight.destinationAirPort}
                                    destinationAirPort={flight.originAirPort}
                                    oridingCode={flight.itineraries[0].segments[0].arrival.iataCode}
                                    destinationCode={flight.itineraries[0].segments[0].departure.iataCode}
                                    boardingDate={flight.itineraries[1].segments[0].departure.at.split('T')[0]}
                                    boardingTime={flight.itineraries[1].segments[0].departure.at.split('T')[1].split(':').slice(0, -1).join(':')}
                                    deparatingDate={flight.itineraries[1].segments[0].arrival.at.split('T')[0]}
                                    deparatingTime={flight.itineraries[1].segments[0].arrival.at.split('T')[1].split(':').slice(0, -1).join(':')}
                                    price={flight.price.total}
                                    currency={currency_symbols[flight.price.currency]}
                                />
                                <div className="btn btn-danger" onClick={() => deleteFlightFromFavorites(flight)}>Delete</div>
                            </div>
                        </div>
                    }) : null
                }
                <div className="hotels-favorite">
                {hotels && displayHotels ? hotels.map((hotel, index) => {
                    return <div className="hotel-info" key={index}>
                        <Hotel
                            hotel={hotel}
                            name={hotel.name}
                            rating={hotel.hotel.rating}
                            checkIn={hotel.checkIn}
                            checkOut={hotel.checkOut}
                            price={hotel.price}
                            currency={hotel.currency}
                            address={hotel.address}
                            favorite={true}
                            deleteHotel={deleteHotelFromFavorites}
                        />
                    </div>
                }) : null
                }
                </div>
                <div className="attractions-favorite">
                    {attractions && displayAttractions ? attractions.map((attraction, index) => {
                        return <Attraction key={index} attraction={attraction} favorite={true} deleteAttraction={deleteAttractionFromFavorites} />
                    }) : null}
                </div>
            </div>
        </>
    )
}

export default Favorites;
