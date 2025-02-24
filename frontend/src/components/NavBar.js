import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        
        navigate('/');
    };
    return (
        <nav className="bg-white text-blue-900 p-4">
            <div className="flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold uppercase hover:text-blue-600">
                    Attendify
                </Link>
                <ul className="flex space-x-6">
                    <li>
                        <button
                            onClick={handleLogout}
                            className="hover:text-blue-600 text-lg focus:outline-none"
                        >
                            Odjavi se
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
