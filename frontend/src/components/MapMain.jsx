import { MapContainer, TileLayer } from "react-leaflet";
import SearchBar from "./SearchBar.jsx";
import LeftSidebar from "./LeftSidebar.jsx";
import RightSidebar from "./RightSidebar.jsx";
import MapContent from "./MapContent.jsx";
import {useState} from "react";


export default function MapMain(props) {
    const [visibleMarkers, setVisibleMarkers] = useState(props.locations);

    const count = visibleMarkers.reduce((counts, crime) => {
        const crimeName = crime.properties.crime.name;
        counts[crimeName] = (counts[crimeName] || 0) + 1;
        return counts;
    }, {});


    return (
        <div className={"flex h-full w-full"}>
                <LeftSidebar locations={props.locations} visibleMarkers={visibleMarkers} setVisibleMarkers={setVisibleMarkers}/>
                <MapContainer
                    bounds={[[50.6275, 14.9393], [50.8866, 15.2138]]}
                    maxBounds={[[50.6275, 14.9393], [50.8866, 15.2138]]}
                    minZoom={12}
                    zoom={13}       //musi opravit values
                    maxZoom={18}
                    zoomControl={true}
                    center={[50.7572, 15.0560]}
                    scrollWheelZoom={true}
                    className={"h-full w-full z-0"}>

                    <TileLayer
                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org">OpenMapTiles</a>, &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
                        style={"outline: 1px solid transparent"}
                    />

                    <SearchBar/>
                    <MapContent visibleMarkers={visibleMarkers}/>
                </MapContainer>
                <RightSidebar count={count} />
            </div>
    );
}