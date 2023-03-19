import {forwardRef, useEffect, useRef, useState} from "react";
import {FeatureGroup, useMap} from "react-leaflet";
import {EditControl} from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import "../css/draw.css";
import L from "leaflet";
import {booleanContains} from '@turf/turf';


//
const MapDraw = forwardRef((props, editRef) => {
    const map = useMap();
    const [selected, setSelected] = useState(null);
    const handleCreated = (e) => {
        const drawnShape = e.layer.toGeoJSON();
        const selectedClusters = [];
        map.eachLayer((layer) => {
            if (layer instanceof L.MarkerCluster && booleanContains(drawnShape, layer.toGeoJSON())) {
                selectedClusters.push(layer.options);
            }
        });
        setSelected(selectedClusters);
    };

    useEffect(() => {
        console.log(selected);
    }, [selected]);


    const onDrawStart = (e) => {
        if (featureGroupRef.current.getLayers().length > 0) {
            featureGroupRef.current.removeLayer(featureGroupRef.current.getLayers()[0]);
        }
    }

    useEffect(() => {
        if (editRef) {
            // Once the EditControl component has mounted, set up the EditRef reference
            editRef._toolbars.draw._modes.polygon.handler.disable();
            editRef._toolbars.draw._modes.rectangle.handler.disable();
        }
    }, [editRef]);

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
                    },
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
