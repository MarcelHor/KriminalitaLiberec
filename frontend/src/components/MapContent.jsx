import React, {useEffect, useRef} from 'react';
import {useMap} from 'react-leaflet';
import {createClusterCustomIcon} from "../js/createClusterCustomIcon.js";
import {mapItemClick} from "../js/mapItemClick.js";
import markerClusterGroup from "react-leaflet-cluster";
import {createMarkerIcon} from "../js/createMarkerIcon.js";
import {findParent} from "../js/colors.js";
import 'leaflet.heat';

// This component is used to add the markers to the map and handle input from the user
export default function MapContent(props) {
    const map = useMap();
    const markerClusterGroupRef = useRef(null);
    const locations = props.visibleMarkers;
    const isHeatmap = props.heathMap; // get the current map view from props

    // Initialize the markerClusterGroup on mount
    useEffect(() => {
        markerClusterGroupRef.current = L.markerClusterGroup({
            showCoverageOnHover: false,
            maxClusterRadius: 200,
            zoomToBoundsOnClick: false,
            spiderfyOnMaxZoom: false,
            chunkedLoading: true,
            iconCreateFunction: createClusterCustomIcon,
            animate: false,
        });

        // Add a listener to the markerClusterGroup to handle the cluster click event
        markerClusterGroupRef.current.on("clusterclick", (cluster) => mapItemClick(map, cluster.layer.getAllChildMarkers(), cluster.latlng));

        map.addLayer(markerClusterGroupRef.current);
    }, [map]);

    // Update the markerClusterGroup or heatmap whenever the visibleMarkers or isHeatmap prop changes
    useEffect(() => {
        if (isHeatmap) {
            // Remove the marker cluster group layer from the map
            map.removeLayer(markerClusterGroupRef.current);

            // Remove the existing heatmap layer from the map
            map.eachLayer(layer => {
                if (layer instanceof L.HeatLayer) {
                    map.removeLayer(layer);
                }
            });

            // Create a new heatmap layer and add it to the map
            const heatmapLayer = L.heatLayer(locations.map(location => [location.y, location.x]), {radius: 40, blur: 20 });
            heatmapLayer.addTo(map);
        } else {
            // Remove the heatmap layer from the map
            map.eachLayer(layer => {
                if (layer instanceof L.HeatLayer) {
                    map.removeLayer(layer);
                }
            });

            // Clear existing markers
            markerClusterGroupRef.current.clearLayers();

            const markerLayers = locations.map(location => {
                const marker = L.marker([location.y, location.x], {
                    id: location.id, crime_type: findParent(location.crime_type_parent1, location.crime_type_parent2), icon: createMarkerIcon(findParent(location.crime_type_parent1, location.crime_type_parent2))
                });
                marker.on("click", (e) => mapItemClick(map, [e.target], e.latlng));

                return marker;
            });

            // Add the markers to the markerClusterGroup
            markerClusterGroupRef.current.addLayers(markerLayers);

            // Add the marker cluster group layer to the map
            map.addLayer(markerClusterGroupRef.current);
        }
        map.closePopup();
    }, [locations, isHeatmap, map]);

    return null;
}
