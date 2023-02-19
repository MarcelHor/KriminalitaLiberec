import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import MapMain from "./components/MapMain.jsx";
import Header from "./components/Header.jsx";

export default function App() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       axios.get("http://localhost:3000/locations")
           .then(res => {
                setLocations(res.data);
                setLoading(false);
                console.log(res.data);
           })
           .catch(err => {
                  console.log(err);
           })
    }, []);

    return (
        <div className="flex flex-col h-screen font-sans">
            <Header />
            <div className="flex-1">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-64 w-64 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <MapMain locations={locations} />
                )}
            </div>
        </div>
    );
}
