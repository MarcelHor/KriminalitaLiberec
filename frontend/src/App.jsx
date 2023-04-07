import React, {useState, useEffect, useRef} from 'react';
import MapMain from "./components/MapMain.jsx";
import Header from "./components/Header.jsx";
import {fetchData} from "./js/api.js";

export default function App() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [fetchCount, setCount] = useState(0);

    const currentDate = new Date();
    const lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 14);
    const [dateRange, setDateRange] = useState([lastWeekDate, new Date()]);

    useEffect(() => {
        fetchData(dateRange, setLocations, setLoading, setError);
    }, [dateRange]);

    useEffect(() => {
        if (error) {
            if (fetchCount >= 3) {
                alert("Error, please try refreshing the page or contact the administrator.")
                return;
            }
            setTimeout(() => {
                fetchData(lastWeekDate, currentDate, setLocations, setLoading, setError);
                setCount(fetchCount + 1);
            }, 5000);
        }
    }, [error]);

    return (<div className="flex flex-col h-screen font-sans">
        <Header/>
        <div className="flex-1">
            {loading ? (<div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-64 w-64 border-b-2 border-gray-900"></div>
            </div>) : error ? (
                <div className={"flex items-center justify-center h-full"}><p className={"text-4xl text-red-600"}>Error,
                    trying again...</p></div>) : (
                <MapMain locations={locations} setLocations={setLocations}
                         dateRange={dateRange} setDateRange={setDateRange}
                />)

            }
        </div>
    </div>);
}
