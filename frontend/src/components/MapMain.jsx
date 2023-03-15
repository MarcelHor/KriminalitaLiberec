import {FeatureGroup, MapContainer, TileLayer} from "react-leaflet";
import SearchBar from "./SearchBar.jsx";
import LeftSidebar from "./LeftSidebar.jsx";
import RightSidebar from "./RightSidebar.jsx";
import MapContent from "./MapContent.jsx";
import {useEffect, useRef, useState} from "react";
import {EditControl} from "react-leaflet-draw";
import { booleanContains } from '@turf/turf';

export default function MapMain(props) {
    // State for the visible markers on the map (used for filtering)
    const [visibleMarkers, setVisibleMarkers] = useState(props.locations);
    // State for the number of markers in each category (used for the sidebar)
    const [count, setCount] = useState({});
    const mapRef = useRef();

    // Count the number of markers in each category and update the state when the visible markers change
    useEffect(() => {
        const count = visibleMarkers.reduce((counts, crime) => {
            const crimeName = crime.properties.crime.name;
            counts[crimeName] = (counts[crimeName] || 0) + 1;
            return counts;
        }, {});
        setCount(count);
    }, [visibleMarkers]);

    const [selected, setSelected] = useState(null);
    const handleCreated = (e) => {
        const drawnShape = e.layer.toGeoJSON();
        const selectedClusters = [];

        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.MarkerCluster && booleanContains(drawnShape, layer.toGeoJSON())) {
                selectedClusters.push(layer.options);
            }
        });
        setSelected(selectedClusters);
    };

    console.log(selected);



    return (<div className={"flex h-full w-full"}>
        <LeftSidebar locations={props.locations} visibleMarkers={visibleMarkers}
                     setVisibleMarkers={setVisibleMarkers}/>
        <MapContainer
            bounds={[[50.6275, 14.9393], [50.8866, 15.2138]]}
            maxBounds={[[50.6275, 14.9393], [50.8866, 15.2138]]}
            minZoom={12}
            zoom={13}       //musi opravit values
            maxZoom={18}
            zoomControl={true}
            center={[50.7572, 15.0560]}
            scrollWheelZoom={true}
            className={"h-full w-full z-0"}
            ref={mapRef}
        >
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org">OpenMapTiles</a>, &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
                style={"outline: 1px solid transparent"}
            />

            <FeatureGroup>
                <EditControl
                    position='topright'
                    onCreated={handleCreated}
                    draw={{
                        circle: false,
                        circlemarker: false,
                        marker: false,
                        polyline: false,
                        rectangle: {showArea: false},
                    }}
                />
            </FeatureGroup>
            <SearchBar/>
            <MapContent visibleMarkers={visibleMarkers}/>
        </MapContainer>
        <RightSidebar count={count}/>
    </div>);
}