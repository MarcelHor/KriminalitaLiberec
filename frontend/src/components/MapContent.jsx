import React, {useEffect} from 'react';
import {useMap} from 'react-leaflet';
import {createClusterCustomIcon} from "../js/createClusterCustomIcon.js";
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
        spiderfyOnMaxZoom: false,
        chunkedLoading: true,
        chunkProgress: (processed, total, elapsed) => {
            console.log(processed, total, elapsed);
        },
        iconCreateFunction: createClusterCustomIcon
    });

    // Add a listener to the markerClusterGroup to handle the cluster click event
    markerClusterGroup.on("clusterclick", (cluster) => mapItemClick(map, cluster.layer.getAllChildMarkers(), cluster.latlng));
    map.addLayer(markerClusterGroup);


    const markerLayers = locations.map(location => {
        const marker = L.marker([location.y, location.x], {id: location.id, crime_type: location.crime_type});
        return marker;
    });

    // Add the markers to the markerClusterGroup
    markerClusterGroup.addLayers(markerLayers);

    return null;
}