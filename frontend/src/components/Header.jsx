import React, {useState} from 'react';
import logo_s2 from '../assets/logo_s2.png';
import Popup from './HeaderPopup';

export default function Header() {
    const [popup, setPopup] = useState(null);

    const openPopup = (name, description) => {
        setPopup({name, description});
    };

    const closePopup = () => {
        setPopup(null);
    };

    return (<header className="flex justify-between items-center py-2 bg-header px-8 text-white">
            <a href="/" className="flex items-center">
                <img src={logo_s2} alt="logo" className="h-16 mr-2"/>
                <h1 className="text-2xl font-bold">MAPA KRIMINALITY LIBEREC</h1>
            </a>
            <nav>
                <ul className="flex items-center">
                    <li
                        className="hover:bg-white hover:bg-opacity-5 rounded p-2 mr-4 cursor-pointer"
                        onClick={() => openPopup('Nápověda', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, quia.')}
                    >
                        NÁPOVĚDA
                    </li>
                    <li
                        className="hover:bg-white hover:bg-opacity-5 rounded p-2 mr-4 cursor-pointer"
                        onClick={() => openPopup('O projektu', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, quia.')}
                    >
                        O PROJEKTU
                    </li>
                    <li
                        className="hover:bg-white hover:bg-opacity-5 rounded p-2 cursor-pointer"
                        onClick={() => openPopup('Kontakt', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, quia.')}
                    >
                        KONTAKT
                    </li>
                </ul>
            </nav>
            {popup && <Popup name={popup.name} description={popup.description} closePopup={closePopup}/>}
        </header>);
}