import select_arrow from "../assets/select_arrow.svg";
import select_multiple from "../assets/select_multiple.svg";
import select_line from "../assets/select_line.svg";
import {useState} from "react";


export default function LeftSidebar(props) {
    const [selectionMode, setSelectionMode] = useState('single');

    const handleSelectionModeChange = (mode) => {
        setSelectionMode(mode);
    }




    // Handle checkbox change
    // If checked, add markers to visibleMarkers
    // If unchecked, remove markers from visibleMarkers
    // This is done by filtering visibleMarkers
    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        if (checked) {
            const newMarkers = props.locations.filter(marker => marker.properties.crime.name === name);
            props.setVisibleMarkers(prevState => [...prevState, ...newMarkers]);
        } else {
            const newMarkers = props.visibleMarkers.filter(marker => marker.properties.crime.name !== name);
            props.setVisibleMarkers(newMarkers);
        }
    }
    // Set removes duplicates to get unique names
    // Spread operator converts set to array to be able to map over it
    const uniqueNames = [...new Set(props.locations.map(marker => marker.properties.crime.name))];

    return (
        <div className="p-4 w-1/4 h-full grid grid-cols-1">
            <div>
                <h1 className={"text-xl"}>Nástroje</h1>
                <div className={"pt-4"}>
                    <button className=" w-full flex items-center rounded-l space-x-2 mb-4" onClick={() => handleSelectionModeChange("single")}>
                        <img src={select_arrow} alt="select_arrow" className="inline-block w-8"/>
                        <span>Vybrat</span>
                    </button>
                    <button className=" w-full flex items-center  rounded-l space-x-2 mb-4" onClick={() => handleSelectionModeChange("multiple")}>
                        <img src={select_multiple} alt="select_multiple" className="inline-block w-8"/>
                        <span>Vybrat více</span>
                    </button>
                    <button className=" w-full flex items-center  rounded-l space-x-2 mb-4" onClick={() => handleSelectionModeChange("polygon")}>
                        <img src={select_line} alt="select_line" className="inline-block w-7"/>
                        <span>Vlastní výběr</span>
                    </button>
                </div>
            </div>

            <div>
                <h1 className={"text-xl"}>Vrstvy</h1>
                {uniqueNames.map((name, index) => (
                    <div className={"pt-4"} key={index}>
                        <div className=" w-full flex items-center rounded-l space-x-2">
                            <input type="checkbox" defaultChecked={true} name={name} onChange={handleCheckboxChange} className="inline-block w-8"/>
                            <span>{name}</span>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
