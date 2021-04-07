import React from 'react'
import './Main.css'
import { Link } from 'react-router-dom';

const Main = () => {


    return (<>
            <div className="vactions-container">
                <Link className="text-link search" to="/flight"><div className="search search-flight"><div className="overlay">FLIGHTS</div></div></Link>
                <Link className="text-link search" to="/hotels"><div className="search search-hotels">HOTELS</div></Link>
                <Link className="text-link search" to="/attractions"><div className="search search-attractions">ATTRACTIONS</div></Link>
            </div>
    </>)
}

export default Main;