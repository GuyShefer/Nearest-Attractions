import React, { useEffect, useState } from 'react';
import './SearchAttractions.css';
import axios from 'axios';
import amadeus from '../../utilities/amadeus';
import Attraction from './Attraction';
import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core';

const cityDetails = { latitude: '', longitude: '' }

const SearchAttractions = () => {

    const [userInput, setUserInput] = useState('');
    const [userCityLocation, setUserCityLocation] = useState(cityDetails);
    const [attractions, setAttractions] = useState([]);
    const positionStackKey = 'b25a203890086671c907d193fdcceebf';

    useEffect(() => {

        const getCityLocation = async () => {
            if (userInput !== null) {
                console.log('input :', userInput);
                const cityLocation = await axios.get(`http://api.positionstack.com/v1/forward?access_key=${positionStackKey}&query=${userInput}`);
                console.log(cityLocation.data.data[0].latitude);
                console.log(cityLocation.data.data[0].longitude);
                setUserCityLocation({ latitude: cityLocation.data.data[0].latitude, longitude: cityLocation.data.data[0].longitude })
            }
        }

        const timeOutId = setTimeout(() => {
            if (userInput) {
                getCityLocation();
            }
        }, 1200);

        return () => {
            clearTimeout(timeOutId)
        }
    }, [userInput])

    useEffect(() => {

        (async () => {
            if (Object.values(userCityLocation)[0] !== '') {
                try {
                    const attractions = await amadeus.shopping.activities.get({
                        latitude: userCityLocation.latitude,
                        longitude: userCityLocation.longitude,
                        radius: 20,
                    })
                    setAttractions(attractions.data);
                } catch (err) { }
            }
        })()

    }, [userCityLocation])

    return (
        <>
            <div className="attractions-container">
                <div className="city-input">
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="component-outlined">SEARCH ATTRACTIONS IN </InputLabel>
                        <OutlinedInput id="component-outlined" value={userInput} onChange={(e) => setUserInput(e.target.value)} label="SEARCH ATTRACTIONS IN " />
                    </FormControl>
                </div>

                <div className="attractions-field">
                    {attractions.map(attraction => {
                        return <Attraction key={attraction.id} attraction={attraction} />
                    })}
                </div>
            </div>
        </>
    )
}

export default SearchAttractions