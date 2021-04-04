import React, { useEffect, useState } from 'react'
import InputLocationAirpot from './InputLocationAirpot';
import amadeus from '../../utilities/amadeus';
import Button from '@material-ui/core/Button';
import Spinner from '../Spinner/Spinner';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { useHistory } from "react-router-dom";

const SearchFlight = () => {

    const [userFlightDetails, setUserFlightDetails] = useState([{ originCode: '', destinationCode: '', departureDate: '', returnDate: '', adults: 1 }]);
    const [departureAirPort, setDepartureAirPort] = useState(''); //
    const [destinationAirPort, setDestinationAirPort] = useState(''); // 
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
                originLocationCode: userFlightDetails[0].originCode,
                destinationLocationCode: userFlightDetails[0].destinationCode,
                departureDate: userFlightDetails[0].departureDate,
                returnDate: userFlightDetails[0].returnDate,
                adults: userFlightDetails[0].adults,
                nonStop: true,
                max: 30,
            })
            if (flightsResponse.data.length === 0) {
                setModalText("There are no flights according to the details entered, let's try other details");
                setOpenModal(true)
            } else {
                // const propsArr = [flightsResponse.data, departureAirPort , destinationAirPort] ;
                // console.log(userFlightDetails[0].originCode);
                // console.log(propsArr);
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

    const setOriginLocation = (airport, code) => {
        let flightDetails = userFlightDetails[0];
        flightDetails.originCode = code;
        setUserFlightDetails([flightDetails]);
        setDepartureAirPort(airport);
    }

    const setdestinationLocation = (airport, code) => {  // duplicate
        let flightDetails = userFlightDetails[0];
        flightDetails.destinationCode = code;
        setUserFlightDetails([flightDetails]);
        setDestinationAirPort(airport);
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

    // const handleSubmit = (e) => { // change it to get flights
    //     e.preventDefault();
    //     console.log('submit');
    //     console.log(userFlightDetails);
    //     getFlights();
    // }

    const handleClose = () => {
        setOpenModal(false);
    };



    return (
        <>
            <div>
                <Dialog open={openModal} onClose={handleClose} aria-labelledby="alert-dialog-title">
                    <DialogTitle id="alert-dialog-title">{modalText}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Okey</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div className="flight-container">
                <form onSubmit={getFlights} className="form">
                    {showSpinner ? <div> <Spinner /> </div> : null}
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