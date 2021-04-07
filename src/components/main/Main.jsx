import React from 'react'
// import amadeus from 'amadeus'
// import Attraction from './Attraction';
import './Main.css'
import { Link } from 'react-router-dom';

const Main = () => {

    // const [attractions, setAttractions] = useState([])

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

    //         // setAttractions(response.data)
    //         console.log(response.data)

    //     })();
    // }, [])


    return (<>
            <div className="vactions-container">
                <Link className="text-link search" to="/flight"><div className="search search-flight"><div className="overlay">FLIGHTS</div></div></Link>
                <Link className="text-link search" to="/hotels"><div className="search search-hotels">HOTELS</div></Link>
                <Link className="text-link search" to="/attractions"><div className="search search-attractions">ATTRACTIONS</div></Link>
            </div>

        {/* <div className="attraction-container">
            {attractions.map(attraction => {
                return <Attraction key={attraction.id} attraction={attraction} />
            })}
        </div> */}
    </>)
}

export default Main;