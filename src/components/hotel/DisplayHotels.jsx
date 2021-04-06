import React, { useState } from 'react';
import Hotel from './Hotel';
import Dialog from '@material-ui/core/Dialog';
import Map from '../main/Map';

const DisplayHotels = (props) => {

    const hotels = props.location.state
    const [openModal, setOpenModal] = useState(false);
    const [displayHotelLocation, setDisplayHotelLocation] = useState({});

    const getHotelLocationAndDisplayModal = (location) => {
        setDisplayHotelLocation(location)
        setOpenModal(true)
    }

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <>
            {openModal !== false ?
                <div>
                    <Dialog open={openModal} onClose={handleClose} aria-labelledby="alert-dialog-title" maxWidth="false" >
                        <Map location={displayHotelLocation} />
                    </Dialog>
                </div> : ''
            }

            <h2 className="display-hotels-title">SEARCH RESULTS</h2>
            <div className="found-hotels-container">
                {hotels ? hotels.map((hotel, index) => {
                    return <div className="hotel-info" key={index}>
                        <Hotel
                            hotel={hotel}
                            name={hotel.hotel.name}
                            rating={hotel.hotel.rating}
                            checkIn={hotel.offers[0].checkInDate}
                            checkOut={hotel.offers[0].checkOutDate}
                            price={hotel.offers[0].price.total}
                            currency={hotel.offers[0].price.currency}
                            address={hotel.hotel.address.lines}
                            displayLocation = {getHotelLocationAndDisplayModal}
                        />
                    </div>
                }) : null
                }
            </div>

        </>
    )
}

export default DisplayHotels;