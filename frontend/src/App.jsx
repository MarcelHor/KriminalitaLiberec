import React, {useState, useEffect, useRef} from 'react';
import MapMain from "./components/MapMain.jsx";
import Header from "./components/Header.jsx";
import {fetchData} from "./js/api.js";
import "./css/app.css";

export default function App() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
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
                fetchData(dateRange, setLocations, setLoading, setError);
                setCount(fetchCount + 1);
            }, 5000);
        }
    }, [error]);

    return (<div className="flex flex-col h-screen font-sans">
        {loading ? (<div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="flex flex-col items-center space-y-2">
                <p className="text-4xl text-white font-bold mr-2">Loading</p>
                <div className="flex">
                    <div className="dot-animation dot1"></div>
                    <div className="dot-animation dot2"></div>
                    <div className="dot-animation dot3"></div>
                </div>
            </div>
        </div>) : null}
        <Header/>
        <div className="flex-1">
            {error ? (
                <div className={"flex items-center justify-center h-full"}><p className={"text-4xl text-red-600"}>Error,
                    trying again...</p></div>) : (<MapMain locations={locations} setLocations={setLocations}
                                                           dateRange={dateRange} setDateRange={setDateRange}
                                                           loading={loading}
            />)}
        </div>
    </div>);
}
