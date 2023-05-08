import close from '../assets/close.svg'
import {useEffect} from "react";

export default function HeaderPopup(props) {

    const escFunction = (event) => {
        if (event.keyCode === 27) {
            props.closePopup();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []);


    return (<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-10 text-black"
                 onClick={props.closePopup}>
        <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white sm:w-1/2 w-3/4 h-2/3 rounded-lg"
            onClick={(event) => event.stopPropagation()}>

            <img src={close} onClick={props.closePopup} className="absolute top-0 right-0 m-4 w-8 cursor-pointer"
                 alt="Close button"/>
            <h1 className="text-2xl font-bold text-center mt-4">{props.name}</h1>
            {props.children}
        </div>
    </div>)
}