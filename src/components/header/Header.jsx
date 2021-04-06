import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <header className="header">
                <div className="logo"></div>
                <div className="menu">
                    <Link className='text-link' to="/"><div className="home">Home</div></Link>
                    <Link className='text-link' to="/favorites"><div className="Favorites">Favorites</div></Link>
                </div>
            </header>
        </>
    )
}

export default Header;