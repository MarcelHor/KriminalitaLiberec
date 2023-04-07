import Chart from 'chart.js/auto';
import {CATEGORY_COLORS} from "./colors.js";

export const createClusterCustomIcon = (cluster) => {
    // Get the child markers of the cluster
    const childMarkers = cluster.getAllChildMarkers();
    if (childMarkers.length === 1) {
        return null;
    }

    const crimes = childMarkers.map((marker) => marker.options.crime_type);

    const categories = crimes.reduce((count, crime) => {
        count[crime] = (count[crime] || 0) + 1;
        return count;
    }, {});

    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;

    const ctx = canvas.getContext('2d');
    const totalCrimes = childMarkers.length;
    const x = 25;
    const y = 25;

    const chart = new Chart(ctx, {
        type: 'doughnut', data: {
            datasets: [{
                data: Object.values(categories),
                backgroundColor: Object.keys(categories).map((category) => CATEGORY_COLORS[category]),
                borderWidth: 0,
            }]
        }, options: {
            plugins: {
                legend: {
                    display: false,
                }, tooltip: {
                    enabled: false,
                },
            }, animation: {
                duration: 0,
            }, hover: {
                mode: null,
            }, responsive: false, cutout: '80%', radius: '90%',
        }
    });

    // Draw circle in the middle of the chart
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fill();

    // Draw circle around the chart
    ctx.beginPath();
    ctx.arc(x, y, 22.5, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgb(255,255,255)';
    ctx.stroke();

    // Draw text for the total crimes count
    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (totalCrimes > 10000) {
        ctx.fillText(`${Math.round(totalCrimes / 1000)}k`, x, y);
    } else {
        ctx.fillText(`${totalCrimes}`, x, y);
    }

    // Convert the chart to an image
    const chartImage = new Image();
    chartImage.src = canvas.toDataURL();


    return L.divIcon({
        html: chartImage, className: 'cluster-icon', iconSize: L.point(50, 50, true),
    });
};
