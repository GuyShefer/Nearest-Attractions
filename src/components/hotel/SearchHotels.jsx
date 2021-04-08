import React, { useState, useEffect } from 'react'
import './SearchHotels.css'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import amadeus from '../../utilities/amadeus';
import { useHistory } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Spinner from '../Spinner/HotelSpinner';

const hotelDetails = { cityName: '', cityCode: '', latitude: '', longitude: '', checkInDate: '', checkOutDate: '', adults: 1 };

const SearchHotels = () => {

    const positionStackKey = 'b25a203890086671c907d193fdcceebf';
    const airlabsKey = '48d9567c-e55c-4804-8ac4-b7ad7c36a6f6';

    const [userHotelDetails, setUserHotelDetails] = useState(hotelDetails);
    const [showSpinner, setShowSpinner] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [modalText, setModalText] = useState('');
    const history = useHistory();


    useEffect(() => {

        const setCityInfo = async () => {

            try {
                let tempUserHotelDetails = hotelDetails;
                const cityLongAndLatitude = await axios.get(`http://api.positionstack.com/v1/forward?access_key=${positionStackKey}&query=${userInput}`);
                const cityObj = cityLongAndLatitude.data.data[0];
                const cityCode = await axios.get(`http://airlabs.co/api/v6/autocomplete?query=${userInput}&api_key=${airlabsKey}`);

                tempUserHotelDetails.cityName = cityObj.label;
                tempUserHotelDetails.cityCode = cityCode.data.response.cities[0].code;
                tempUserHotelDetails.latitude = cityObj.latitude;
                tempUserHotelDetails.longitude = cityObj.longitude;
                setUserHotelDetails(tempUserHotelDetails)
            } catch (err) { }
        }

        const timeOutId = setTimeout(() => {
            if (userInput) {
                setCityInfo();
            }
        }, 700);

        return () => {
            clearTimeout(timeOutId)
        }

    }, [userInput]);

    const getHotels = async (e) => {
        e.preventDefault();
        setShowSpinner(true);
        let hotelsResponse;
        try {
            hotelsResponse = await amadeus.shopping.hotelOffers.get({
                cityCode: userHotelDetails.cityCode,
                // latitude: Number(userHotelDetails.latitude),
                // longitude: Number(userHotelDetails.longitude),
                // radius: 5,
                // radiusUnit: 'KM'
                checkInDate: userHotelDetails.checkInDate,
                checkOutDate: userHotelDetails.checkOutDate,
                // adults: Number(userHotelDetails.adults),

            })
            if (hotelsResponse.data.length === 0) {
                setModalText("There are no hotels according to the details entered, let's try other details");
                setOpenModal(true)
            } else {
                history.push("/hotels-data", hotelsResponse.data);
            }

        } catch (err) {
            setModalText('Something wrong please try again')
            setOpenModal(true)
        } finally {
            setShowSpinner(false);
        }
    }

    const setCheckInDate = (e) => {
        let hotelDetails = { ...userHotelDetails };
        hotelDetails.checkInDate = e.target.value;
        setUserHotelDetails(hotelDetails)
    }

    const setCheckOutDate = (e) => {
        let hotelDetails = { ...userHotelDetails };
        hotelDetails.checkOutDate = e.target.value;
        setUserHotelDetails(hotelDetails)
    }

    const handleAdultsInput = (e) => {
        let hotelDetails = { ...userHotelDetails };
        hotelDetails.adults = Number(e.target.value);
        setUserHotelDetails(hotelDetails)
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

            <div className="hotels-container">
                <form onSubmit={getHotels} className="hotel-form">
                {showSpinner ? <div> <Spinner /> </div> : null}
                    <div className="banner-hotel">
                        <h2>Find a place to stay</h2>
                    </div>

                    <div className="hotel-input-container">
                        <label htmlFor="city">City </label>
                        <input className="hotel-input" placeholder="e.g. Amsterdam" type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                    </div>

                    <div className="hotel-input-container">
                        <label htmlFor="check-in">Check In </label>
                        <input className="hotel-input" type="date" onChange={setCheckInDate} />
                    </div>

                    <div className="hotel-input-container">
                        <label htmlFor="check-out">Check Out</label>
                        <input className="hotel-input" type="date" onChange={setCheckOutDate} />
                    </div>

                    <div className="hotel-input-container">
                        <label htmlFor="adults">Adults </label>
                        <input className="hotel-input" type="number" min="1" value={userHotelDetails.adults} onChange={handleAdultsInput} />
                    </div>

                    <Button variant="outlined" type="submit" value="Search" >SEARCH</Button>
                </form>
            </div>
        </>
    )
}

export default SearchHotels;