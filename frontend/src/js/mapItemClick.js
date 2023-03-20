// on click of a marker, open a popup with the marker's content and buttons to cycle through other markers
// if there is only one marker, no buttons are added
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

    // Create container div for popup content
    const container = document.createElement('div');

    // Add popup content to container div
    const content = markers[0].getPopup().getContent();
    const popupContent = document.createElement('div');
    popupContent.innerHTML = content;
    container.appendChild(popupContent);

    // Add buttons to container div if there is more than one marker
    if (markers.length > 1) {
        // Add buttons to container div
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => cycleMarkers(-1));
        container.appendChild(prevButton);
        prevButton.style.marginRight = '10px';

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => cycleMarkers(1));
        container.appendChild(nextButton);
    }

    const count = document.createElement('span');
    count.style.marginLeft = '10px';
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