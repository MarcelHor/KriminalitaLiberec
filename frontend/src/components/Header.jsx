import React, {useState} from 'react';
import logo_s2 from '../assets/logo_s2.png';
import Popup from './HeaderPopup';

export default function Header() {
    const [popup, setPopup] = useState(null);

    const openPopup = (name) => {
        setPopup({name});
    };

    const closePopup = () => {
        setPopup(null);
    };

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);


    return (<header className="flex flex-wrap justify-between items-center py-2 px-4 md:px-8 bg-header text-white">
        <div className="flex items-center w-full md:w-auto justify-between">
            <a href="/" className="flex items-center">
                <img src={logo_s2} alt="logo" className="h-16 mr-2"/>
                <h1 className="sm:text-2xl font-bold">MAPA KRIMINALITY LIBEREC</h1>
            </a>
            <button
                className="block md:hidden focus:outline-none"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>
        </div>

        <nav className={`w-full md:w-auto ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row items-center md:items-stretch md:justify-end">
                <li
                    className="hover:bg-white hover:bg-opacity-5 rounded p-2 md:mr-4 cursor-pointer"
                    onClick={() => openPopup('Nápověda')}
                >
                    NÁPOVĚDA
                </li>
                <li
                    className="hover:bg-white hover:bg-opacity-5 rounded p-2 md:mr-4 cursor-pointer"
                    onClick={() => openPopup('O projektu')}
                >
                    O PROJEKTU
                </li>
                <li
                    className="hover:bg-white hover:bg-opacity-5 rounded p-2 cursor-pointer"
                    onClick={() => openPopup('Kontakt')}
                >
                    KONTAKT
                </li>
            </ul>
        </nav>
        {popup && (<Popup name={popup.name} closePopup={closePopup}>
            {popup.name === 'Nápověda' && (<div className="p-4">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies
                </p>
            </div>)}
            {popup.name === 'O projektu' && (<div className="p-4">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies
                </p>
            </div>)}
            {popup.name === 'Kontakt' && (<div className="p-4">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies
                </p>
            </div>)}
        </Popup>)}
    </header>);
}
