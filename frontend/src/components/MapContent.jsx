import React, {useEffect} from 'react';
import {useMap} from 'react-leaflet';
import {createClusterCustomIcon} from "../js/MapIcons.js";
import {handleClusterClick} from "../js/ClusterClick.js";
import markerClusterGroup from "react-leaflet-cluster";

// This component is used to add the markers to the map and handle input from the user
export default function MapContent(props) {
    const map = useMap();
    const locations = props.visibleMarkers;

    // Create a markerClusterGroup to hold the markers
    const markerClusterGroup = L.markerClusterGroup({
        showCoverageOnHover: false,
        iconCreateFunction: createClusterCustomIcon,
        maxClusterRadius: 200,
        zoomToBoundsOnClick: false,
        singleMarkerMode: true,
    });

    // Add a listener to the markerClusterGroup to handle the cluster click event
    markerClusterGroup.on("clusterclick", (cluster) => handleClusterClick(map, cluster));
    map.addLayer(markerClusterGroup);


    // Add the markers to the markerClusterGroup when the locations change or the map is loaded for the first time
    useEffect(() => {
        // If the map is not loaded yet, return
        if (!markerClusterGroup) return;

        // Clear the existing markers in the markerClusterGroup
        markerClusterGroup.clearLayers();

        const markerLayers = locations.map(location => {
            const marker = L.marker([location.coordinates[1], location.coordinates[0]]);
            marker.bindPopup(`
      <div>
        <h1>${location.properties.crime.name}</h1>
        <p>${location.properties.crime.description}</p>
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