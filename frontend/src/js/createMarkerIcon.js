import {CATEGORY_COLORS} from "./colors.js";

export const createMarkerIcon = (crime) => {
    return L.divIcon({
        className: 'marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
        html: `<div style="background-color: ${CATEGORY_COLORS[crime]}; width: 10px; height: 10px; margin: 5px; border-radius: 50%;"></div>`
    });
};

// import {CATEGORY_COLORS} from "./colors.js";
//
// export const createMarkerIcon = (crime) => {
//     return L.divIcon({
//         className: 'marker',
//         iconSize: [24, 24],
//         iconAnchor: [12, 12],
//         popupAnchor: [0, -12],
//         html: `<div style="background-color: ${CATEGORY_COLORS[crime]}; width: 14px; height: 14px; margin: 5px; border-radius: 50%;"></div>`
//     });
// };
