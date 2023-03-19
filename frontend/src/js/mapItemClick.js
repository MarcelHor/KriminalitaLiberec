export const mapItemClick = (map, markers, position) => {

    let currentMarkerIndex = 0;
    const cycleMarkers = (increment) => {
        currentMarkerIndex += increment;
        if (currentMarkerIndex < 0) {
            currentMarkerIndex = markers.length - 1;
        } else if (currentMarkerIndex >= markers.length) {
            currentMarkerIndex = 0;
        }
        popupContent.innerHTML = markers[currentMarkerIndex].getPopup().getContent();
        count.textContent = `(${currentMarkerIndex + 1}/${markers.length})`;
    };

    // Create container div
    const container = document.createElement('div');

    // Add popup content to container div
    const content = markers[0].getPopup().getContent();
    const popupContent = document.createElement('div');
    popupContent.innerHTML = content;
    container.appendChild(popupContent);

    if (markers.length > 1) {
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
    }
    const count = document.createElement('span');
    count.textContent = `(${currentMarkerIndex + 1}/${markers.length})`;
    container.appendChild(count);

    // Create popup with container div as content
    const popup = L.popup()
        .setLatLng(position)
        .setContent(container)
        .openOn(map);

    map.on('zoomend', function () {
        popup.remove();
    });


};