import React, { useState } from 'react'
import './SearchHotels.css'
import Button from '@material-ui/core/Button';
import axios from 'axios'

const SearchHotels = () => {

    const positionStackKey = 'b25a203890086671c907d193fdcceebf';
    const key = '48d9567c-e55c-4804-8ac4-b7ad7c36a6f6';

    const [userHotelDetails, setUserHotelDetails] = useState({ cityCode: '', latitude: '', longitude: '', checkInDate: '', checkOutDate: '', adults: 1 });

    const getHotels = async (e) => {
        e.preventDefault();
            console.log(userHotelDetails);
    }

    const handleCityName = (e) => {
        let hotelDetails = {...userHotelDetails};
        hotelDetails.cityCode = e.target.value;
        setCityInfo(e.target.value);
        setUserHotelDetails(hotelDetails)
    }

    const setCityInfo = async (cityName) => {
        console.log(cityName);
        const cityLongAndLatitude = await axios.get(`http://api.positionstack.com/v1/forward?access_key=${positionStackKey}&query=${cityName}`);
        const cityObj = cityLongAndLatitude.data;
        console.log('CityObj', cityObj);

        const cityCode = await axios.get(`http://airlabs.co/api/v6/autocomplete?query=${cityName}&api_key=${key}`);
        console.log('cityCode : ', cityCode);

        
    }

    const setCheckInDate = (e) => {
        let hotelDetails = {...userHotelDetails};
        hotelDetails.checkInDate = e.target.value;
        setUserHotelDetails(hotelDetails)
    }

    const setCheckOutDate = (e) => {
        let hotelDetails = {...userHotelDetails};
        hotelDetails.checkOutDate = e.target.value;
        setUserHotelDetails(hotelDetails)
    }

    const handleAdultsInput = (e) => {
        let hotelDetails = {...userHotelDetails};
        hotelDetails.adults = Number(e.target.value);
        console.log(hotelDetails);
        setUserHotelDetails(hotelDetails)
    }

    return (
        <>
            <div className="hotels-container">
                <form onSubmit={getHotels} className="hotel-form">
                    <div className="banner-hotel">
                        <h2>Find a place to stay</h2>
                    </div>

                    <div className="hotel-input-container">
                        <label htmlFor="city">City </label>
                        <input className="hotel-input" placeholder="e.g. Amsterdam" type="text"  value={userHotelDetails.cityCode} onChange={handleCityName} />
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