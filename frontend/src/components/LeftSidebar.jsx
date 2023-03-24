import select_multiple from "../assets/select_multiple.svg";
import select_line from "../assets/select_line.svg";
import select_arrow from "../assets/select_arrow.svg";
import {useEffect} from "react";

export default function LeftSidebar(props) {
    // Get reference to EditControl component
    const editRef = props.editRef;

    // Set removes duplicates to get unique names
    // Spread operator converts set to array to be able to map over it
    const uniqueNames = [...new Set(props.locations.map(marker => marker.properties.crime.name))];

    //initially set selectedMarkers to all unique names
    useEffect(() => {
        props.setSelectedMarkers(uniqueNames);
    },[])

    // Handle checkbox change and update selectedMarkers
    const handleCheckboxChange = (event) => {
        //set selectedMarkers to array of names of selected checkboxes
        if (event.target.checked) {
            props.setSelectedMarkers([...props.selectedMarkers, event.target.name]);
        }
        else {
            props.setSelectedMarkers(props.selectedMarkers.filter(name => name !== event.target.name));
        }
    }

    return (<div className="p-4 w-1/4 h-full grid grid-cols-1">
        <div>
            <h1 className={"text-xl"}>Nástroje</h1>
            <div className={"pt-4"}>
                <button className={"w-full flex items-center rounded-l space-x-2 mb-4"} onClick={() => {
                    editRef.current._toolbars.draw._modes.polygon.handler.disable();
                    editRef.current._toolbars.draw._modes.rectangle.handler.disable();
                }}>
                    <img src={select_arrow} alt="select_arrow" className="inline-block w-8"/>
                    <span>Vybrat</span>
                </button>
                <button className={"w-full flex items-center rounded-l space-x-2 mb-4"} onClick={() => {
                    // Enable polygon select mode
                    editRef.current._toolbars.draw._modes.polygon.handler.enable();
                }}>
                    <img src={select_line} alt="select_arrow" className="inline-block w-8"/>
                    <span>Vybrat polygonem</span>
                </button>
                <button className={"w-full flex items-center rounded-l space-x-2 mb-4"} onClick={() => {
                    // Enable rectangle select mode
                    editRef.current._toolbars.draw._modes.rectangle.handler.enable();
                }}>
                    <img src={select_multiple} alt="select_multiple" className="inline-block w-8"/>
                    <span>Vybrat čtvercem</span>
                </button>
            </div>
        </div>

        <div>
            <h1 className={"text-xl"}>Vrstvy</h1>
            {uniqueNames.map((name, index) => (<div className={"pt-4"} key={index}>
                <div className=" w-full flex items-center rounded-l space-x-2">
                    <input type="checkbox" defaultChecked={true} name={name} onChange={handleCheckboxChange}
                           className="inline-block w-8"/>
                    <span>{name}</span>
                </div>
            </div>))}
        </div>
    </div>)
}