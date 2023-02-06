import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import { useState, useEffect } from 'react';

function App() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/locations')
            .then(response => response.json())
            .then(data => {
                setLocations(data);
                console.log(data)
                setLoading(false);
            });
    }, []);

    return (
        <div className="App">
            <h1 className={"p-4 text-3xl text-center"}>Kriminalita České Republiky</h1>

            <div className={"p-4 mx-4"}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <MapContainer
                        bounds={[[48.55, 12.09], [51.05, 18.86]]}
                        maxBounds={[[48.55, 12.09], [51.05, 18.86]]}
                        minZoom={7}
                        maxZoom={18}
                        scrollWheelZoom={true}
                        className={"h-screen-4/5 w-full z-0"}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {locations.map((location, index) => (
                            <Marker key={index} position={[location.coordinates[1], location.coordinates[0]]}>
                                <Popup>
                                    <div className={"text-center"}>
                                        <h1 className={"text-xl"}>{location.description }</h1>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}


                    </MapContainer>
                )}
            </div>

        </div>
    )
}
export default App