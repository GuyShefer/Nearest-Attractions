import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <header className="header">
                <Link to="/"><div className="logo"></div></Link>
                <div className="menu">
                    <Link className='text-link header-link' to="/"><div className="home">Home</div></Link>
                    <Link className='text-link header-link' to="/favorites"><div className="Favorites">Favorites</div></Link>
                </div>
            </header>
        </>
    )
}

export default Header;