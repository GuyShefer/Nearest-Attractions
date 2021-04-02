import React, { useEffect, useState } from 'react'
import InputLocationAirpot from './InputLocationAirpot';
import amadeus from '../../utilities/amadeus'

const SearchFlight = () => {

    const [userFlightDetails, setUserFlightDetails] = useState(
        { originCode: '', destinationCode: '', departureDate: '', returnDate: '', adults: '1' }
    );


    useEffect(() => {
        // getFlights();
        console.log(userFlightDetails)
    })

    const getFlights = async () => {
    //     let flightsResponse = localStorage.getItem('flights');
    //     if (!flightsResponse) {
            const flightsResponse = await amadeus.shopping.flightOffersSearch.get({
                originLocationCode: userFlightDetails.originCode,
                destinationLocationCode: userFlightDetails.destinationCode,
                departureDate: userFlightDetails.departureDate,
                returnDate: userFlightDetails.returnDate,
                adults: userFlightDetails.adults,
            })
            // localStorage.setItem('flights', JSON.stringify(flightsResponse));
        // } else {
        //     flightsResponse = JSON.parse(flightsResponse);
        // }
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

    const handleDepartDate = (e) => { // duplicate
        let flightDetails = userFlightDetails;
        flightDetails.departureDate = e.target.value;
        console.log(e.target.value);
        setUserFlightDetails(userFlightDetails)
    }

    const handleReturnDate = (e) => {
        let flightDetails = userFlightDetails;
        flightDetails.returnDate = e.target.value;
        console.log(e.target.value);
        setUserFlightDetails(userFlightDetails)
    }

    const handleAdultsInput = (e) => {
        let flightDetails = userFlightDetails;
        flightDetails.adults = e.target.value;
        console.log(e.target.value);
        setUserFlightDetails(userFlightDetails)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        console.log(userFlightDetails);
        getFlights();
    }


    return (
        <>
            {console.log(userFlightDetails)}
            <div className="flight-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="from">From </label>
                    <InputLocationAirpot input={'from'} setLocation={setOriginLocation} />

                    <label htmlFor="to">To </label>
                    <InputLocationAirpot input={'to'} setLocation={setdestinationLocation} />

                    <label htmlFor="depart">Depart </label>
                    <input type="date" onChange={handleDepartDate} />

                    <label htmlFor="depart">Return </label>
                    <input type="date" onChange={handleReturnDate} />

                    <label htmlFor="adults">Adults </label>
                    <input type="number" min="1" value="1" onChange={handleAdultsInput} />

                    <input type="submit" value="submit" />
                </form>


            </div>
        </>
    )
}

export default SearchFlight;