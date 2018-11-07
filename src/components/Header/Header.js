import React from 'react';
import { Navbar, Image } from 'react-bootstrap';
import penguin from '../../Assets/large_sledding-penguin22.png';
import './Header.css';
const Header = () => {
    return(
        <Navbar fixedTop> 
            <Navbar.Brand>Coin Watch yuuh</Navbar.Brand>
            <img src = {penguin} alt = "merry christmas yo" width = "50" height = "50"></img>
        </Navbar>
    );
}

export default Header;