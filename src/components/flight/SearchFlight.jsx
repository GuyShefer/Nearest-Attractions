import React, { useEffect, useState } from 'react'
import InputLocationAirpot from './InputLocationAirpot';
import amadeus from '../../utilities/amadeus';
import Button from '@material-ui/core/Button';
import Spinner from '../Spinner/Spinner';

const SearchFlight = () => {

    const [userFlightDetails, setUserFlightDetails] = useState([{ originCode: '', destinationCode: '', departureDate: '', returnDate: '', adults: 1 }]);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        console.log('spinner', showSpinner);
       
    })

    const getFlights = async () => {
        setShowSpinner(true);
        const flightsResponse = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: userFlightDetails[0].originCode,
            destinationLocationCode: userFlightDetails[0].destinationCode,
            departureDate: userFlightDetails[0].departureDate,
            returnDate: userFlightDetails[0].returnDate,
            adults: userFlightDetails[0].adults,
            max: 30,
        })
        setShowSpinner(false);
        console.log(flightsResponse.data.length)
        console.log(flightsResponse.data)
    }

    //////////////

    const setOriginLocation = (code) => {
        let flightDetails = userFlightDetails[0];
        flightDetails.originCode = code;
        setUserFlightDetails([flightDetails])
    }

    const setdestinationLocation = (code) => {  // duplicate
        let flightDetails = userFlightDetails[0];
        flightDetails.destinationCode = code;
        setUserFlightDetails([flightDetails])
    }

    const handleDepartDate = (e) => { // duplicate
        let flightDetails = userFlightDetails[0];
        flightDetails.departureDate = e.target.value;
        setUserFlightDetails([flightDetails])
    }

    const handleReturnDate = (e) => {
        let flightDetails = userFlightDetails[0];
        flightDetails.returnDate = e.target.value;
        setUserFlightDetails([flightDetails])
    }

    const handleAdultsInput = (e) => {
        let flightDetails = userFlightDetails[0];
        flightDetails.adults = Number(e.target.value);
        setUserFlightDetails([flightDetails])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        console.log(userFlightDetails);
        getFlights();
    }


    return (
        <>
        
            <div className="flight-container">
                <form onSubmit={handleSubmit} className="form">
                { showSpinner ? <div> <Spinner/> </div> : null}
                    <div className="banner">
                        <h2>Let the journey begin</h2>
                    </div>

                    <div className="fligt-input-container">
                        <label htmlFor="from">From </label>
                        <InputLocationAirpot input={'from'} setLocation={setOriginLocation} />
                    </div>

                    <div className="fligt-input-container">
                        <label htmlFor="from">To </label>
                        <InputLocationAirpot input={'to'} setLocation={setdestinationLocation} />
                    </div>

                    <div className="fligt-input-container">
                        <label htmlFor="depart">Depart </label>
                        <input className="flight-input" type="date" onChange={handleDepartDate} />
                    </div>

                    <div className="fligt-input-container">
                        <label htmlFor="depart">Return </label>
                        <input className="flight-input" type="date" onChange={handleReturnDate} />
                    </div>

                    <div className="fligt-input-container">
                        <label htmlFor="adults">Adults </label>
                        <input className="flight-input" type="number" min="1" value={userFlightDetails[0].adults} onChange={handleAdultsInput} />
                    </div>

                    <Button variant="outlined" type="submit" value="Search" >SEARCH</Button>
                </form>

            </div>
        </>
    )
}

export default SearchFlight;