import React, { } from 'react'
// import Amadeus from 'amadeus'
// import Attraction from './Attraction';
import './Main.css'
// import Map from './Map';
import { Link } from 'react-router-dom';

const Main = () => {
    // const [userLocation, setUserLocation] = useState({});
    // const [attractions, setAttractions] = useState([])

    // const amadeus = new Amadeus({  // set it in a separately file (utilities)
    //     clientId: 'rL7tGUnjiUhdOIbpYrVQQOIxIQnL7YxF',
    //     clientSecret: 'GE9PTGUtJIGGtE5s'
    // })

    // useEffect(() => {
    //     (async () => {
    //         await getUserLocation();
    //         let response = localStorage.getItem('attarctions');
    //         if (!response) {
    //             response = await amadeus.shopping.activities.get({
    //                 latitude: userLocation.latitude,
    //                 longitude: userLocation.longitude,
    //                 radius: 20,
    //             })
    //             localStorage.setItem('attarctions', JSON.stringify(response));
    //         } else {
    //             response = JSON.parse(response);
    //         }

    //         setAttractions(response.data)
    //         console.log(response.data)

    //     })();
    // }, [])

    // const getUserLocation = () => {
    //     "geolocation" in navigator ?
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             console.log(position)
    //             setUserLocation({
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude
    //             })
    //         }) :
    //         console.log('not avaialble') // have to call a function to get the location details from the user or set one by him
    // }


    return (<>
        <div className="vactions-container">
            <div className="search search-flight"><Link to="/flight">Search A Flight</Link></div>
            <div className="search search-hotel"><Link to="/hotels">Seach Hotel</Link></div>
            <div className="search search-atrractions">Seach For Attractions</div>
        </div>

        {/* <div className="map-container">
            {Object.keys(userLocation).length !== 0 ?
                <Map userLocation={userLocation} /> :
                null
            }
        </div> */}

        {/* <div className="attraction-container">
            {attractions.map(attraction => {
                return <Attraction key={attraction.id} attraction={attraction} />
            })}
        </div> */}
    </>)
}

export default Main;