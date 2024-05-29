import React from 'react';
import {Container } from 'react-bootstrap';
import './header.css';

function Header() {
    return (
        <>
                <Container>
                    <div className="brand-container">
                        <h1 className="brand-text">Modern Walk</h1>
                    </div>
                </Container>
                <hr className="navbar-divider"/>

        </>
    );
}

export default Header;
