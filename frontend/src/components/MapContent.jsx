import React, {useEffect} from 'react';
import {useMap} from 'react-leaflet';
import {createClusterCustomIcon} from "../js/MapIcons.js";
import {mapItemClick} from "../js/mapItemClick.js";
import markerClusterGroup from "react-leaflet-cluster";

// This component is used to add the markers to the map and handle input from the user
export default function MapContent(props) {
    const map = useMap();
    const locations = props.visibleMarkers;
    // Create a markerClusterGroup to hold the markers
    const markerClusterGroup = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 200,
        zoomToBoundsOnClick: false,
        singleMarkerMode: true,
        iconCreateFunction: createClusterCustomIcon,
        spiderfyOnMaxZoom: false,
        chunkedLoading: true,
        chunkSize: 50
    });

    // Add a listener to the markerClusterGroup to handle the cluster click event
    markerClusterGroup.on("clusterclick", (cluster) => mapItemClick(map, cluster.layer.getAllChildMarkers(), cluster.latlng));
    map.addLayer(markerClusterGroup);


    // Add the markers to the markerClusterGroup when the locations change or the map is loaded for the first time
    useEffect(() => {
        // If the map is not loaded yet, return
        if (!markerClusterGroup) return;

        // Clear the existing markers in the markerClusterGroup
        markerClusterGroup.clearLayers();

        const markerLayers = locations.map(location => {
            const marker = L.marker([location.y, location.x]);
            const date = new Date(location.date);
            const dateStr = date.toLocaleDateString('cs-CZ', {day: 'numeric', month: 'numeric', year: 'numeric'});
            const timeStr = date.toLocaleTimeString('cs-CZ', {hour: 'numeric', minute: 'numeric'});
            marker.bindPopup(`
          <div>
            <h1>${location.crime_type}</h1>
            <p>${dateStr}</p>
            <p>${timeStr}</p>
            <p>${location.state}</p>
            <p>
                ${location.crime_type}
                ${location.crime_type_parent1 && location.crime_type_parent1 !== location.crime_type ? `, ${location.crime_type_parent1}` : ''}
                ${location.crime_type_parent2 ? `, ${location.crime_type_parent2}` : ''}
                ${location.crime_type_parent3 ? `, ${location.crime_type_parent3}` : ''}
            </p>

          </div>
        `);
            return marker;
        });

        markerClusterGroup.addLayers(markerLayers);
        map.closePopup();

        // Remove the markerClusterGroup and clear the markers when the component is unmounted
        return () => {
            map.removeLayer(markerClusterGroup);
            markerClusterGroup.clearLayers();
        };
    }, [locations, map, markerClusterGroup]);

    return null;
}