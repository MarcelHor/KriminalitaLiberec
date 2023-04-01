export const createClusterCustomIcon = (markers) => {




    // Define the colors for each category
    const categoryColors = {
        "Násilná": '#af0000',
        "Přestupky": '#ff8000',
        "Požáryvýbuchy": '#ff0000',
        "Krádeže": '#007e00',
        "Krádeževloupáním": '#00ffff',
        "Jinámajetková": '#00f600',
        "Obecněnebezpečná": '#8000ff',
        "Toxikománie": '#ff00ff',
        "Zbraně": '#eaa500',
        "Extremismus": '#ff0000',
        "Podvody": '#00a200',
        "Dopravnínehody": '#ffff00',
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
