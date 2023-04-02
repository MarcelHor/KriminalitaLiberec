import {CATEGORY_COLORS} from "./colors.js";


export const createMarkerIcon = (crime) => {
    const icon = L.divIcon({
        className: 'marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
        html: `<div style="background-color: ${CATEGORY_COLORS[crime]}; width: 10px; height: 10px; margin: 5px"></div>`
    });
    return icon;
};
