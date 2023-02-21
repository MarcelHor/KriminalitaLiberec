import React from 'react';
import { Marker, Popup, useMap  } from 'react-leaflet';

export default function MapContent(props){
    const map = useMap();
    const locations = props.locations;

    return (
        <>
                {locations.map((location, index) => (
                        <Marker key={index} position={[location.coordinates[0], location.coordinates[1]]}>
                            <Popup>
                                <div>
                                    <h1>{location.properties.crime.name}</h1>
                                    <p>{location.properties.crime.description}</p>
                                </div>
                            </Popup>
                        </Marker>
             ))}
        </>
    );
}