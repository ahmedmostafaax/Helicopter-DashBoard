import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        
        localStorage.removeItem('token');
        
        
        navigate('/signin');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <NavLink className="navbar-brand" to="/home">Navbar</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">   
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/home">Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/product">Product</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/category">Category</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <span className="nav-link" style={{ cursor: 'pointer' }} onClick={handleSignOut}>Sign out</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </div>
    );
}
