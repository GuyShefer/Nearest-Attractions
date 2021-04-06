import React, { useState } from 'react'
import Hotel from './Hotel'

const DisplayHotels = (props) => {

    const [hotels, setHotels] = useState(props.location.state)



    return (
        <>
            {console.log(props.location.state)}

            <h2 className="display-hotels-title">SEARCH RESULTS</h2>
            <div className="found-hotels-container">
                {hotels ? hotels.map((hotel, index) => {
                    return <div className="hotel-info" key={index}>
                        <Hotel 
                        hotel={hotel}
                        name = {hotel.hotel.name}
                        rating = {hotel.hotel.rating}
                        checkIn = {hotel.offers[0].checkInDate}
                        checkOut = {hotel.offers[0].checkOutDate}
                        price = {hotel.offers[0].price.total}
                        currency = {hotel.offers[0].price.currency}
                        address = {hotel.hotel.address.lines}

                        />
                    </div>
                }) : null
                }
            </div>

        </>
    )
}

export default DisplayHotels;