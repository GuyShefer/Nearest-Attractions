import React, { useEffect, useState } from 'react'
import './SearchHotels.css'
import Button from '@material-ui/core/Button';

const SearchHotels = () => {

    const [userHotelDetails, setUserHotelDetails] = useState({ cityCode: '', latitude: '', longitude: '', checkInDate: '', checkOutDate: '', adults: 1 });

    const getHotels = async (e) => {
        e.preventDefault();
            console.log(userHotelDetails);
    }

    const setCityName = (e) => {
        let hotelDetails = {...userHotelDetails};
        hotelDetails.cityCode = e.target.value;
        // have to conver the city name to citycode and latitdue &longitude
        // use api :
        // http://api.positionstack.com/v1/forward?access_key=b25a203890086671c907d193fdcceebf&query=rosh haayin
        setUserHotelDetails(hotelDetails)
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
                        <input className="hotel-input" placeholder="e.g. Amsterdam" type="text"  value={userHotelDetails.cityCode} onChange={setCityName} />
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