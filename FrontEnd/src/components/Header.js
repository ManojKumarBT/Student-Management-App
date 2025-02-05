import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./css/Header.css";
import { Nav } from "react-bootstrap";
// import Dropdown from 'react-bootstrap/Dropdown';

export default function Header() {

    const navigate = useNavigate();

    return (
        <div className="Header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand text-bold" href="/">StuManager</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {(
                            <Nav>
                                <button className="btn"><Link className="link" to="/">Home</Link></button>
                                <button className="btn"><Link className="link" to="/About">About Us</Link></button>
                            </Nav>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}