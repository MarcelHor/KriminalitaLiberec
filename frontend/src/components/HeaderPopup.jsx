import close from '../assets/close.svg'
export default function HeaderPopup(props) {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-10 text-black">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-1/2 h-2/3 rounded-lg">
                <img src={close} onClick={props.closePopup} className="absolute top-0 right-0 m-4 w-8" alt="Close button"/>
                <h1 className="text-2xl font-bold text-center mt-4">{props.name}</h1>
                {props.description}
            </div>
        </div>
    )
}