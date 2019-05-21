import React from 'react';
import { Navbar } from 'react-bootstrap';
import './Header.css';

const Header = () => {
    return(
        <Navbar fixedTop> 
            <Navbar.Brand>Coin Watch</Navbar.Brand>
        </Navbar>
    );
}

export default Header;