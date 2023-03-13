export const createClusterCustomIcon = function (cluster) {
// Get the markers in the cluster and extract the category from the popup content string (e.g. "Category: <h1>Obecněnebezpečná</h1>")
    const markers = cluster.getAllChildMarkers();
    const popupContent = markers.map((marker) => marker.getPopup().getContent());
    const childMarkers = popupContent.map((content) => content.match(/<h1>(.*?)<\/h1>/)[1]);

    // Count the number of markers in each category
    const categories = {};
    childMarkers.forEach((marker) => {
        const category = marker.replace(/\s+/g, '');
        categories[category] = categories[category] ? categories[category] + 1 : 1;
    });

    // Define the colors for each category
    const categoryColors = {
        'Obecněnebezpečná': '#ff3333',
        'Požáry': '#ff9933',
        'Extremismus': '#ffff33',
        'výbuchy': '#33ff33',
        'Dopravnínehody': '#3388ff',
        'KrádežePodvody': '#9933ff',
        'Zbraně': '#ff33ff',
        'Jinámajetková': '#ff3888',
        'Toxikománie': '#ff9933',
    };

    // Define the radius and line width for the ring chart
    const radius = 25;
    const lineWidth = 5;

    // Create the canvas element and context
    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');
    // Calculate total number of markers and total width of the ring chart
    const markerCount = childMarkers.length;

    // Draw the ring chart background
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
    ctx.fill();

    // Draw the ring chart
    let startAngle = -Math.PI / 2;
    for (const [category, count] of Object.entries(categories)) {
        const endAngle = startAngle + (count / markerCount) * 2 * Math.PI;
        ctx.strokeStyle = categoryColors[category];
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(radius, radius, radius - lineWidth / 2, startAngle, endAngle);
        ctx.stroke();
        startAngle = endAngle;
    }

    // Create the div icon with the canvas element and marker count label
    const iconDiv = document.createElement('div');
    iconDiv.style.position = 'relative';
    iconDiv.style.width = `${radius * 2}px`;
    iconDiv.style.height = `${radius * 2}px`;
    iconDiv.innerHTML = `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-65%, -45%); font-size: 15px; font-weight: bold;">${markerCount}</div><canvas width=${radius * 2} height=${radius * 2}>`;
    iconDiv.querySelector('canvas').getContext('2d').drawImage(canvas, 0, 0);

    // Set the canvas as the icon's HTML
    const icon = L.divIcon({
        html: iconDiv,
        className: 'marker-cluster',
        iconSize: L.point(radius * 2, radius * 2),
        iconAnchor: L.point(radius, radius),
    });

    return icon;
};

export const createMarkerCustomIcon = function (color) {
    const iconDiv = document.createElement('div');
    iconDiv.style.backgroundColor = color;
    iconDiv.style.width = '30px';
    iconDiv.style.height = '30px';
    iconDiv.style.borderRadius = '50%';
    iconDiv.style.boxShadow = '0px 0px 6px rgba(0, 0, 0, 0.5)';
    iconDiv.innerHTML = `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 14px; font-weight: bold; color: white;">1</div>`;
    const icon = L.divIcon({
        html: iconDiv, className: 'marker-custom', iconSize: L.point(30, 30), iconAnchor: L.point(15, 15),
    });
    return icon;
};

