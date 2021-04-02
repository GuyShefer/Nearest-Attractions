import React, { useEffect } from 'react'
import Amadeus from 'amadeus'

const SearchFlight = () => {

    const amadeus = new Amadeus({  // set it in a separately file (utilities)
        clientId: 'rL7tGUnjiUhdOIbpYrVQQOIxIQnL7YxF',
        clientSecret: 'GE9PTGUtJIGGtE5s'
    })

    useEffect(() => {
        (async () => {
            let flightsResponse = localStorage.getItem('flights');
            if (!flightsResponse) {
                flightsResponse = await amadeus.shopping.flightOffersSearch.get({
                    originLocationCode: 'AMS',
                    destinationLocationCode: 'BKK',
                    departureDate: '2021-05-17',
                    // returnDate: '2021-05-19',
                    adults: 1,
                })
                localStorage.setItem('flights', JSON.stringify(flightsResponse));
            } else {
                flightsResponse = JSON.parse(flightsResponse);
            }
            console.log(flightsResponse.data)
        })();
    }, [])

    return (
        <>
            SearchFlight
        </>
    )
}

export default SearchFlight;