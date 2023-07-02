import {MapContainer, TileLayer} from "react-leaflet";
import SearchBar from "./SearchBar.jsx";
import RightSidebar from "./RightSidebar.jsx";
import MapContent from "./MapContent.jsx";
import {useEffect, useRef, useState} from "react";
import 'leaflet/dist/leaflet.css';
import MapDraw from "./MapDraw.jsx";
import {findParent} from "../js/colors.js";
import PopupModal from "./PopupModal.jsx";
import axios from "axios";

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

    const [fetchedFilters, setFetchedFilters] = useState([]);

    const getFilters = () => {
        axios.get('http://localhost:3000/api/filters').then((response) => {
            setFetchedFilters(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getFilters();
    }, []);


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const saveFilter = async (name, description) => {
        const filter = {
            name: name,
            description: description,
            timeRange: JSON.stringify(timeRange),
            selectedCrimes: JSON.stringify(selectedCrimes),
            selectedStates: JSON.stringify(selectedStates),
            dateRange: JSON.stringify(props.dateRange)
        }

        try {
            const response = await axios.post('http://localhost:3000/api/filters', filter);
            if (response.status === 200) {
                await getFilters();
                // TODO: Show success message to the user
            }
        } catch (error) {
            console.log(error);
            // TODO: Show error message to the user
        }
    }


    const loadFilter = (filter) => {
        setTimeRange(JSON.parse(filter.timeRange));
        setSelectedCrimes(JSON.parse(filter.selectedCrimes));
        setSelectedStates(JSON.parse(filter.selectedStates));
        const firstDate = new Date(JSON.parse(filter.dateRange)[0]);
        const secondDate = new Date(JSON.parse(filter.dateRange)[1]);
        props.setDateRange([firstDate, secondDate]);
    }


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

        <PopupModal isPopupOpen={isSaveModalOpen} setisPopupOpen={setIsSaveModalOpen}>
            <div className={"flex flex-col items-center"}>
                <h1 className={"text-2xl font-bold mb-4"}>Uložit filtr</h1>
                <input type={"text"} className={"border-2 border-gray-300 rounded-md p-2 mb-4 w-2/3"}
                       placeholder={"Název"} onChange={(e) => setName(e.target.value)}/>
                <textarea className={"border-2 border-gray-300 rounded-md p-2 w-2/3 max-h-44 overflow-hidden mb-4"}
                          placeholder={"Popis"} onChange={(e) => setDescription(e.target.value)}/>
                <div className={"flex flex-row items-center justify-center w-2/3"}>
                    <button className={"bg-red-500 text-white rounded-md p-2 mr-2 w-full"}
                            onClick={() => setIsSaveModalOpen(false)}>Zrušit
                    </button>
                    <button className={"bg-green-500 text-white rounded-md p-2 w-full"} onClick={() => {
                        saveFilter(name, description);
                        setIsSaveModalOpen(false)
                    }}>Uložit
                    </button>
                </div>
            </div>
        </PopupModal>


        <PopupModal isPopupOpen={isLoadModalOpen} setisPopupOpen={setIsLoadModalOpen}>
            <div className={"flex flex-col items-center"}>
                <h1 className={"text-2xl font-bold mb-4"}>Načíst filtr</h1>
                {fetchedFilters.map((filter) => {
                    return <div className={"flex flex-row items-center justify-center w-2/3 mb-4"} key={filter.id}>
                        <span className={"mr-2"}>{filter.name}</span>
                        <span className={"mr-2"}>{filter.description}</span>
                        <span className={"mr-2"}>{filter.created_at}</span>
                        <button className={"bg-green-500 text-white rounded-md p-2 w-full"} onClick={() => {
                            loadFilter(filter);
                            setIsLoadModalOpen(false)
                        }}>Načíst
                        </button>
                    </div>
                })}
            </div>
        </PopupModal>


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