export const handleClusterClick = (map, markers, position) => {

    // Create container div
    const container = document.createElement('div');

    // Add popup content to container div
    const content = markers[0].getPopup().getContent();
    const popupContent = document.createElement('div');
    popupContent.innerHTML = content;
    container.appendChild(popupContent);

    // Add buttons to container div
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.style.marginRight = '5px'; // add some spacing between buttons
    prevButton.addEventListener('click', () => cycleMarkers(-1));
    container.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => cycleMarkers(1));
    container.appendChild(nextButton);

    // Create popup with container div as content
    const popup = L.popup()
        .setLatLng(position)
        .setContent(container)
        .openOn(map);

    map.on('zoomend', function () {
        popup.remove();
    });

    let currentMarkerIndex = 0;
    const cycleMarkers = (increment) => {
        currentMarkerIndex += increment;
        if (currentMarkerIndex < 0) {
            currentMarkerIndex = markers.length - 1;
        } else if (currentMarkerIndex >= markers.length) {
            currentMarkerIndex = 0;
        }
        popupContent.innerHTML = markers[currentMarkerIndex].getPopup().getContent();
    };
};

