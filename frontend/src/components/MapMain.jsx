import {MapContainer, TileLayer} from "react-leaflet";
import SearchBar from "./SearchBar.jsx";
import RightSidebar from "./RightSidebar.jsx";
import MapContent from "./MapContent.jsx";
import {useEffect, useRef, useState} from "react";
import 'leaflet/dist/leaflet.css';
import MapDraw from "./MapDraw.jsx";
import {findParent} from "../js/colors.js";
import SaveLoadModals from "./FilterModal.jsx";

export default function MapMain(props) {
    const mapRef = useRef();
    // Get reference to EditControl component
    let editRef = useRef();
    const onMountedRect = (ref) => {
        editRef.current = ref;
    }

    const [timeRange, setTimeRange] = useState(["00:00", "23:59"]);
    const [visibleMarkers, setVisibleMarkers] = useState([]);
    const [selectedCrimes, setSelectedCrimes] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [heatMap, setHeatMap] = useState(false);

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);


    const filterMarkers = (locations, selected, selectedStates, timeRange) => {
        const selectedInt = selected.map((item) => parseInt(item));
        const start = timeRange[0].split(":").map(Number);
        const end = timeRange[1].split(":").map(Number);
        const startTime = start[0] * 60 + start[1];
        const endTime = end[0] * 60 + end[1];

        return locations.filter((marker) => {
            const date = new Date(marker.date);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const currentTime = hours * 60 + minutes;


            const timeCondition = (startTime < endTime && currentTime >= startTime && currentTime <= endTime) || (startTime > endTime && (currentTime >= startTime || currentTime <= endTime));

            const categoryCondition = selectedInt.includes(marker.crime_type_parent1) || selectedInt.includes(marker.crime_type_parent2) || selectedInt.includes(marker.crime_type_parent3) || selectedInt.includes(marker.crime_type_parent4) || (marker.children === undefined && selectedInt.includes(marker.crime_type));

            const stateCondition = selectedStates.includes(marker.state);

            return timeCondition && categoryCondition && stateCondition;
        });
    };

    useEffect(() => {
        setVisibleMarkers(filterMarkers(props.locations, selectedCrimes, selectedStates, timeRange));
    }, [props.locations, selectedCrimes, selectedStates, timeRange]);


    // State for the number of markers in each category (used for the pie chart)
    const [count, setCount] = useState({});
    // Count the number of markers in each category and update the state when the visible markers change
    useEffect(() => {
        const count = visibleMarkers.reduce((counts, crime) => {
            const crimeName = findParent(crime.crime_type_parent1, crime.crime_type_parent2);
            counts[crimeName] = (counts[crimeName] || 0) + 1;
            return counts;
        }, {});
        setCount(count);
    }, [visibleMarkers, props.locations, selectedCrimes]);

    const [stateCount, setStateCount] = useState({});
    useEffect(() => {
        const stateCount = visibleMarkers.reduce((counts, crime) => {
            const stateName = crime.state;
            counts[stateName] = (counts[stateName] || 0) + 1;
            return counts;
        }, {});
        setStateCount(stateCount);
    }, [visibleMarkers, props.locations, selectedStates]);


    return (<div className={"flex"}>
        <MapContainer
            bounds={[[50.6275, 14.9393], [50.8866, 15.2138]]}
            maxBounds={[[50.6275, 14.9393], [50.8866, 15.2138]]}
            minZoom={12}
            zoom={13}       //musi opravit values
            maxZoom={18}
            zoomControl={true}
            center={[50.7572, 15.0560]}
            scrollWheelZoom={true}
            className={`h-[calc(100vh-80px)] w-full z-0`}
            ref={mapRef}
        >

            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org">OpenMapTiles</a>, &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
                style={"outline: 1px solid transparent"}
            />
            <MapDraw onMounted={(e) => onMountedRect(e)} editRef={editRef}/>
            <SearchBar/>
            <MapContent visibleMarkers={visibleMarkers} heathMap={heatMap}/>

        </MapContainer>

        <SaveLoadModals timeRange={timeRange} setTimeRange={setTimeRange} selectedCrimes={selectedCrimes}
                        setSelectedCrimes={setSelectedCrimes} selectedStates={selectedStates}
                        setSelectedStates={setSelectedStates}
                        dateRange={props.dateRange} setDateRange={props.setDateRange}
                        setIsSaveModalOpen={setIsSaveModalOpen}
                        heatMap={heatMap} setHeatMap={setHeatMap}
                        setIsLoadModalOpen={setIsLoadModalOpen} isSaveModalOpen={isSaveModalOpen}
                        isLoadModalOpen={isLoadModalOpen}
        />

        <RightSidebar
            editRef={editRef} count={count} dateRange={props.dateRange} timeRange={timeRange}
            setDateRange={props.setDateRange} setTimeRange={setTimeRange} selected={selectedCrimes}
            setSelected={setSelectedCrimes}
            setSelectedStates={setSelectedStates} setHeatMap={setHeatMap} stateCount={stateCount}
            setIsSaveModalOpen={setIsSaveModalOpen} setIsLoadModalOpen={setIsLoadModalOpen}
            selectedStates={selectedStates} selectedCrimes={selectedCrimes}
        />
    </div>);
}