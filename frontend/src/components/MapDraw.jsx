import {forwardRef, useEffect, useRef} from "react";
import {FeatureGroup, useMap} from "react-leaflet";
import {EditControl} from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "../css/draw.css";
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
        //ERROR
        map.eachLayer((layer) => {
            if (layer instanceof L.MarkerCluster && booleanContains(drawnShape, layer.toGeoJSON())) {
                selectedClusters.push(layer);
                console.log("cluster" + layer);
            } else if (layer instanceof L.Marker && booleanContains(drawnShape, layer.toGeoJSON())) {
                selectedMarkers.push(layer.name);
                console.log("marker" + layer);
            }
        });
        const clusterChildren = selectedClusters.flatMap(cluster => cluster.getAllChildMarkers());

        const allMarkers = [...selectedMarkers, ...clusterChildren];

        if (allMarkers.length > 0) {
            mapItemClick(map, allMarkers, e.layer.getBounds().getCenter());
        }
    };

    // When the user closes the popup, remove the drawn shape
    useEffect(() => {
        const handleChange = () => {
            if (featureGroupRef.current.getLayers().length > 0) {
                featureGroupRef.current.removeLayer(featureGroupRef.current.getLayers()[0]);
            }
        }
        map.on("popupclose", handleChange);

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
