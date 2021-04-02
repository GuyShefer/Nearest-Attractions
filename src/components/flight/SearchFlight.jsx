import React, { useEffect, useState } from 'react'
// import Amadeus from 'amadeus'
import InputLocationAirpot from './InputLocationAirpot';
import amadeus from '../../utilities/amadeus'

const SearchFlight = () => {

    const [userFlightDetails, setUserFlightDetails] = useState(
        { originCode: '', destinationCode: '', departureDate: '', returnDate: '', adults: '' }
    );



    // const amadeus = new Amadeus({  // set it in a separately file (utilities)
    //     clientId: 'rL7tGUnjiUhdOIbpYrVQQOIxIQnL7YxF',
    //     clientSecret: 'GE9PTGUtJIGGtE5s'
    // })

    useEffect(() => {
        // getFlights();
        console.log(userFlightDetails)
    })

    const getFlights = async () => {
        let flightsResponse = localStorage.getItem('flights');
        if (!flightsResponse) {
            flightsResponse = await amadeus.shopping.flightOffersSearch.get({
                originLocationCode: 'AMS',
                destinationLocationCode: 'BKK',
                departureDate: '2021-05-17',
                returnDate: '2021-05-19',
                adults: 1,
            })
            localStorage.setItem('flights', JSON.stringify(flightsResponse));
        } else {
            flightsResponse = JSON.parse(flightsResponse);
        }
        console.log(flightsResponse.data)
    }

    //////////////

    const setOriginLocation = (code) => {
        let flightDetails = userFlightDetails;
        flightDetails.originCode = code;
        console.log(code);
        setUserFlightDetails(userFlightDetails)
    }

    const setdestinationLocation = (code) => {  // duplicate
        let flightDetails = userFlightDetails;
        flightDetails.destinationCode = code;
        console.log(code);
        setUserFlightDetails(userFlightDetails)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');// not working right now
    }

    return (
        <>
            {console.log(userFlightDetails)}
            <div className="flight-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="from">From </label>
                    <InputLocationAirpot input={'from'} setLocation={setOriginLocation} />

                    <label htmlFor="from">To </label>
                    <InputLocationAirpot input={'to'} setLocation={setdestinationLocation} />

                    <input type="submit" value="submit"/>
                </form>

                
            </div>
        </>
    )
}

export default SearchFlight;