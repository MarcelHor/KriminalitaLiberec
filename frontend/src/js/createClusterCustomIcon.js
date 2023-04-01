import Chart from 'chart.js/auto';

export const createClusterCustomIcon = (cluster) => {
    // Get the child markers of the cluster
    const childMarkers = cluster.getAllChildMarkers();
    const crimes = childMarkers.map((marker) => marker.options.crime_type);

    const categories = crimes.reduce((count, crime) => {
        count[crime] = (count[crime] || 0) + 1;
        return count;
    }, {});

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

    //create doughnut chart for the leaflert cluster icon
    const canvas = document.createElement('canvas');
    canvas.width = 50;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: Object.keys(categories).map((category) => categoryColors[category]),
                borderColor: 'white',
                borderWidth: 2,
            }]

        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                },
            },
            animation: {
                duration: 0,

            },
            responsive: false,
            maintainAspectRatio: false,
            cutout: '70%',
        }
    });

    const totalCrimes = childMarkers.length;
    const x = 25;
    const y = 25;
    // Add the total number of crimes to the chart
    ctx.font = `14px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(totalCrimes, x, y);


    //L.divIcon is a leaflet function for creating custom icons
    const icon = L.divIcon({
        html: canvas,
        className: 'cluster-icon',
        iconSize: L.point(50, 50, true),
    });

    return icon;
};


