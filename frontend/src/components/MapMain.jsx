import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import SearchBar from "./SearchBar.jsx";
import LeftSidebar from "./LeftSidebar.jsx";
import RightSidebar from "./RightSidebar.jsx";


export default function MapMain(props) {
    return (
        <div className={"flex h-full w-full"}>
                <LeftSidebar/>

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
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                        style={"outline: 1px solid transparent"}
                    />

                    <SearchBar/>

                    <MarkerClusterGroup>
                    {props.locations.map((location, index) => (

                            <Marker key={index} position={[location.coordinates[1], location.coordinates[0]]}>
                                <Popup>
                                    <div className={"text-center"}>
                                        <h1 className={"text-xl"}>{location.description }</h1>
                                    </div>
                                </Popup>
                            </Marker>
                    ))}
                    </MarkerClusterGroup>
                </MapContainer>

                <RightSidebar/>
            </div>
    );
}