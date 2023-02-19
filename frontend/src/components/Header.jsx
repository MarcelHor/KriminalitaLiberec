import logo_s2 from '../assets/logo_s2.png';
import HeaderPopup from "./HeaderPopup.jsx";
import {useState} from "react";
export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header className="flex justify-between items-center bg-header px-8 py-4 text-white">
            <a href="" className={"flex items-center"}>
                <img src={logo_s2} alt="logo" className="h-16 mr-4"/>
                <h1 className="text-2xl font-bold">MAPA KRIMINALITY LIBEREC</h1>
            </a>
            <nav>
                <ul className="flex items-center">
                    <li className={"hover:underline mr-4"} onClick={togglePopup}>NÁPOVĚDA</li>
                    {isOpen && <HeaderPopup name="Nápověda" description={<><p className={"p-8"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, quia.</p></>}g closePopup={togglePopup}/>}

                    <li className={"hover:underline mr-4"} onClick={togglePopup}>O PROJEKTU</li>
                    {isOpen && <HeaderPopup name="O projektu" description={<><p className={"p-8"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, quia.</p></>} closePopup={togglePopup}/>}

                    <li className={"hover:underline mr-4"} onClick={togglePopup}>KONTAKT</li>
                    {isOpen && <HeaderPopup name="Kontakt" description={<><p className={"p-8"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, quia.</p></>} closePopup={togglePopup}/>}
                </ul>
            </nav>
        </header>
    )
}