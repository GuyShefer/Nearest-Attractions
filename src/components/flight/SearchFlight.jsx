import React, { useState } from 'react'
import InputLocationAirport from './InputLocationAirport';
import amadeus from '../../utilities/amadeus';
import Button from '@material-ui/core/Button';
import Spinner from '../Spinner/Spinner';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { useHistory } from "react-router-dom";

const SearchFlight = () => {

    const [userFlightDetails, setUserFlightDetails] = useState({ originCode: '', destinationCode: '', departureDate: '', returnDate: '', adults: 1 });
    const [showSpinner, setShowSpinner] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalText, setModalText] = useState('');
    const history = useHistory();

    const getFlights = async (e) => {
        e.preventDefault();
        setShowSpinner(true);
        let flightsResponse;
        try {
            flightsResponse = await amadeus.shopping.flightOffersSearch.get({
                originLocationCode: userFlightDetails.originCode,
                destinationLocationCode: userFlightDetails.destinationCode,
                departureDate: userFlightDetails.departureDate,
                returnDate: userFlightDetails.returnDate,
                adults: userFlightDetails.adults,
                nonStop: true,
                max: 30,
            })
            if (flightsResponse.data.length === 0) {
                setModalText("There are no flights according to the details entered, let's try other details");
                setOpenModal(true)
            } else {
                history.push("/flights-data", flightsResponse.data);
            }

        } catch (err) {
            setModalText('Something wrong please try again')
            setOpenModal(true)
        } finally {
            setShowSpinner(false);
        }

    }

    //////////////

    const setOriginLocation = (code) => {
        let flightDetails = {...userFlightDetails};
        flightDetails.originCode = code;
        setUserFlightDetails(flightDetails)
    }

    const setdestinationLocation = (code) => {  // duplicate
        let flightDetails = {...userFlightDetails};
        flightDetails.destinationCode = code;
        setUserFlightDetails(flightDetails)
    }

    const handleDepartDate = (e) => { // duplicate
        let flightDetails = {...userFlightDetails};
        flightDetails.departureDate = e.target.value;
        setUserFlightDetails(flightDetails)
    }

    const handleReturnDate = (e) => {
        let flightDetails = {...userFlightDetails};
        flightDetails.returnDate = e.target.value;
        setUserFlightDetails(flightDetails)
    }

    const handleAdultsInput = (e) => {
        let flightDetails = {...userFlightDetails};
        flightDetails.adults = Number(e.target.value);
        console.log(flightDetails);
        setUserFlightDetails(flightDetails)
    }

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <>
            <div>
                <Dialog open={openModal} onClose={handleClose} aria-labelledby="alert-dialog-title">
                    <DialogTitle id="alert-dialog-title">{modalText}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Ok</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div className="flight-container">
                <form onSubmit={getFlights} className="form">
                    {showSpinner ? <div> <Spinner /> </div> : null}
                    <div className="banner">
                        <h2>Let the journey begin</h2>
                    </div>

                    <div className="flight-input-container"> 
                        <label htmlFor="from">From </label>
                        <InputLocationAirport input={'from'} setLocation={setOriginLocation} />
                    </div>

                    <div className="flight-input-container">
                        <label htmlFor="from">To </label>
                        <InputLocationAirport input={'to'} setLocation={setdestinationLocation} />
                    </div>

                    <div className="flight-input-container">
                        <label htmlFor="depart">Depart </label>
                        <input className="flight-input" type="date" onChange={handleDepartDate} />
                    </div>

                    <div className="flight-input-container">
                        <label htmlFor="depart">Return </label>
                        <input className="flight-input" type="date" onChange={handleReturnDate} />
                    </div>

                    <div className="flight-input-container">
                        <label htmlFor="adults">Adults </label>
                        <input className="flight-input" type="number" min="1" value={userFlightDetails.adults} onChange={handleAdultsInput} />
                    </div>

                    <Button variant="outlined" type="submit" value="Search" >SEARCH</Button>
                </form>

            </div>
        </>
    )
}

export default SearchFlight;