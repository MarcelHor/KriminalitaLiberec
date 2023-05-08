import {forwardRef, useEffect, useRef} from "react";
import {FeatureGroup, useMap} from "react-leaflet";
import {EditControl} from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "../css/map.css";
import {booleanContains} from '@turf/turf';
import {mapItemClick} from "../js/mapItemClick.js";

// This component is used to add the markers to the map and handle input from the user with the draw control
const MapDraw = forwardRef((props, editRef) => {
    const map = useMap();

    // When the user draws a shape, check if any markers or clusters are contained within the shape
    // If there are, call mapItemClick to handle the popup
    const handleCreated = (e) => {
        const drawnShape = e.layer.toGeoJSON();
        const selectedClusters = [];
        const selectedMarkers = [];
        map.eachLayer((layer) => {
            //TODO: check the if statement below
            if (layer instanceof L.MarkerCluster && booleanContains(drawnShape, layer.toGeoJSON())) {
                //check if the cluster is already in the selectedClusters by id
                if (selectedClusters.some(cluster => cluster.id === layer.id && cluster.getChildCount() === layer.getChildCount())) {
                    return;
                }
                selectedClusters.push(layer);

            } else if (layer instanceof L.Marker && booleanContains(drawnShape, layer.toGeoJSON())) {
                //check if the marker is already in the selectedClusters by id and child_count and x and y
                if (selectedMarkers.some(marker => marker.options.id === layer.options.id && marker.options.crime_type === layer.options.crime_type && marker.options.x === layer.options.x && marker.options.y === layer.options.y)) {
                    return;
                }
                selectedMarkers.push(layer);
            }


        });

        if (selectedClusters.length === 0 && selectedMarkers.length === 0) {
            if (featureGroupRef.current && featureGroupRef.current.getLayers().length > 0) {
                featureGroupRef.current.removeLayer(featureGroupRef.current.getLayers()[0]);
                return;
            }
        }

        const clusterChildren = selectedClusters.flatMap(cluster => cluster.getAllChildMarkers());
        const allMarkers = [...selectedMarkers, ...clusterChildren];

        if (allMarkers.length > 0) {
            mapItemClick(map, allMarkers, e.layer.getBounds().getCenter());
        }
    };

    // When the user closes the popup, remove the drawn shape
    useEffect(() => {
        map.on("popupclose", () => {
            if (featureGroupRef.current && featureGroupRef.current.getLayers().length > 0) {
                featureGroupRef.current.removeLayer(featureGroupRef.current.getLayers()[0]);
            }
        });
    }, [map]);


    // When the user starts drawing a shape, remove the existing shape
    const onDrawStart = (e) => {
        if (featureGroupRef.current.getLayers().length > 0) {
            featureGroupRef.current.removeLayer(featureGroupRef.current.getLayers()[0]);
        }
        map.closePopup();
    }

    const featureGroupRef = useRef();
    return (<FeatureGroup ref={featureGroupRef}>
        <EditControl
            ref={editRef}
            onMounted={props.onMounted}
            position="topright"
            onCreated={handleCreated}
            onDrawStart={onDrawStart}
            draw={{
                circle: false, polyline: false, circlemarker: false, marker: false, polygon: {
                    allowIntersection: false, shapeOptions: {
                        color: "#ff0000",
                    }, showArea: false,
                }, rectangle: {
                    shapeOptions: {
                        color: "#ff0000",
                    }, showArea: false,
                },
            }}
        />
    </FeatureGroup>);
});

export default MapDraw;
