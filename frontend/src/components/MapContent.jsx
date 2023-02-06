import MarkerClusterGroup from "react-leaflet-cluster";
import crimeData from ".././geojson/crime-data.json";
import regionData from ".././geojson/kraje-simple.json";
import orpData from ".././geojson/orp-simple.json";
import {useMap} from "react-leaflet";
import {useEffect} from "react";

const layerStyle = { color: "blue", weight: 1, fillOpacity: 0.1 };
const layerFeature = (feature, layer) => {
    layer.on({
        mouseover: () => {
            layer.setStyle({ color: "red" });
        },
        mouseout: () => {
            layer.setStyle({ color: "blue" });
        },
        mousedown: () => {
            layer.bindPopup(feature.properties.NAZEV);
        }
    });
}

export const MapContent = () => {
    const map = useMap();

    const regionDataLayer = L.geoJSON(regionData, {
        style: layerStyle,
        onEachFeature: layerFeature
    });

    const orpDataLayer = L.geoJSON(orpData, {
        style: layerStyle,
        onEachFeature: layerFeature
    });

    useEffect(() => {
        map.on("zoomend", () => {
            if (map.getZoom() >=9) {
/*
                Bud budu davat pryc layers anebo zmenim layer.opacity

*/
                if (!map.hasLayer(orpDataLayer)) {
                    orpDataLayer.addTo(map);
                }
                if (map.hasLayer(regionDataLayer)) {
                    regionDataLayer.remove();
                }
            } else {
                if (!map.hasLayer(regionDataLayer)) {
                    regionDataLayer.addTo(map);
                }
                if (map.hasLayer(orpDataLayer)) {
                    orpDataLayer.remove();
                }
            }
        });
    }, [map, orpDataLayer, regionDataLayer]);





};
