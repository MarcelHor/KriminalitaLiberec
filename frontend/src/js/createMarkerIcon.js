export const createMarkerIcon = (marker) =>{


    //create rectangle for the leaflert marker icon
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = categoryColors[marker.options.crime_type];
    ctx.fillRect(0, 0, 50, 50);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(0, 0, 50, 50);


    return L.icon({
        iconUrl: canvas.toDataURL(),
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -25],
    });
}