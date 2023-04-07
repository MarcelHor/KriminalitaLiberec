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

    // Create a new canvas element for the chart
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;

    // Append the new canvas to the parent element
    const parent = document.createElement('div');
    parent.appendChild(canvas);

    const chartCanvas = document.createElement('canvas');
    chartCanvas.width = 50;
    chartCanvas.height = 50;

    const ctx = chartCanvas.getContext('2d');

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
            layout: {
                padding: {
                    //TODO: fix zoom in?
                    right: 10,
                    bottom: 10,
                }
            },
        }
    });

    // Draw the chart on the new canvas
    canvas.getContext('2d').drawImage(chartCanvas, 0, 0);

    // Draw the circle and text on the original canvas
    const x = 25;
    const y = 25;

    canvas.getContext('2d').beginPath();
    canvas.getContext('2d').arc(x, y, 18, 0, 2 * Math.PI);
    canvas.getContext('2d').fillStyle = 'rgb(255,255,255)';
    canvas.getContext('2d').fill();

    canvas.getContext('2d').beginPath();
    canvas.getContext('2d').arc(x, y, 24, 0, 2 * Math.PI);
    canvas.getContext('2d').strokeStyle = 'rgb(255,255,255)';
    canvas.getContext('2d').stroke();

    canvas.getContext('2d').font = '14px Arial';
    canvas.getContext('2d').fillStyle = 'black';
    canvas.getContext('2d').textAlign = 'center';
    canvas.getContext('2d').textBaseline = 'middle';

    const totalCrimes = childMarkers.length;
    if (totalCrimes > 10000) {
        canvas.getContext('2d').fillText(`${Math.round(totalCrimes / 1000)}k`, x, y);
    } else {
        canvas.getContext('2d').fillText(`${totalCrimes}`, x, y);
    }

    return L.divIcon({
        html: parent, className: 'cluster-icon', iconSize: L.point(50, 50),
    });
};
