import axios from 'axios';

export const mapItemClick = (map, markers, position) => {
    const container = document.createElement('div');
    const contentContainer = document.createElement('div');
    const buttonContainer = document.createElement('div');
    const popupContent = document.createElement('div');
    container.appendChild(contentContainer);
    container.appendChild(buttonContainer);
    contentContainer.appendChild(popupContent);


    const maxPage = 100;
    let markerIds = [];
    const totalPage = Math.ceil(markers.length / maxPage);
    let currentPage = 0;
    let currentMarkerIndex = 0;
    markers.map((marker) => markerIds.push(marker.options.id));

    let data;
    const fetchData = (page) => {
        const start = page * maxPage;
        const end = start + maxPage;
        const ids = markerIds.slice(start, end);
        axios.get(`http://localhost:3000/api/data/${ids}`)
            .then((response) => {
                data = response.data;
                updatePopupContent();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    let index = 0;
    const cycleMarkers = (increment) => {
        index += increment;
        currentMarkerIndex = index + currentPage * maxPage;
        if (markers.length > maxPage) {
            // If we're at the end of the current data set and there is no next data set, go to the beginning of marker list
            if (index >= data.length && currentPage >= totalPage - 1) {
                index = 0;
                currentMarkerIndex = 0;
                currentPage = 0;
                fetchData(currentPage);
            }
            // if we are at beginning of the current data set and there is no previous data set go to the end of marker list
            else if (index < 0 && currentPage === 0) {
                //set index with modulo
                if (markers.length % maxPage === 0) {
                    index = maxPage - 1;

                } else {
                    index = markers.length % maxPage - 1;
                }
                currentMarkerIndex = markers.length - 1;
                currentPage = totalPage - 1;
                fetchData(currentPage);
            }
            // If we're at the end of the current data set and there is a next data set, fetch the next data set
            else if (index >= data.length && currentPage < totalPage) {
                currentPage++;
                index = 0;
                fetchData(currentPage);
            }
            // If we're at the beginning of the current data set and there is a previous data set, fetch the previous data set
            else if (index < 0 && currentPage > 0) {
                currentPage--;
                index = 9;
                fetchData(currentPage);
            }
            // If we're in the middle of the current data set, just update the popup content
            else {
                updatePopupContent();
            }
        } else {
            if (index >= markers.length) {
                index = 0;
                currentMarkerIndex = 0;
            } else if (index < 0) {
                index = markers.length - 1;
                currentMarkerIndex = markers.length - 1;
            }
            updatePopupContent();
        }

    };
    const updatePopupContent = () => {
        if (data) { // Add this check to make sure that data is not empty
            const date = new Date(data[index].date);
            const dateStr = date.toLocaleDateString('cs-CZ', {
                day: 'numeric', month: 'numeric', year: 'numeric',
            });
            const timeStr = date.toLocaleTimeString('cs-CZ', {
                hour: 'numeric', minute: 'numeric',
            });
            popupContent.innerHTML = `
            <div>
                <h1>${data[index].crime_type}</h1>
                <p>${dateStr}</p>
                <p>${timeStr}</p>
                <p>${data[index].state}</p>
                <p>
                    ${data[index].crime_type}
                    ${data[index].crime_type_parent1 && data[index].crime_type_parent1 !== data[index].crime_type ? `, ${data[index].crime_type_parent1}` : ''}
                    ${data[index].crime_type_parent2 ? `, ${data[index].crime_type_parent2}` : ''}
                    ${data[index].crime_type_parent3 ? `, ${data[index].crime_type_parent3}` : ''}
                </p>
            </div>
        `;
            count.textContent = `(${currentMarkerIndex + 1}/${markers.length})`;
        }
    }

    // Add buttons to button container div if there is more than one marker
    if (markers.length > 1) {
        // Add buttons to button container div
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => cycleMarkers(-1));
        buttonContainer.appendChild(prevButton);
        prevButton.style.marginRight = '10px';

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => cycleMarkers(1));
        buttonContainer.appendChild(nextButton);
    }

    const count = document.createElement('span');
    count.style.marginLeft = '10px';
    count.textContent = `(${currentMarkerIndex + 1}/${markers.length})`;
    buttonContainer.appendChild(count);

    // Set CSS styles to arrange the content and buttons vertically
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    contentContainer.style.marginBottom = '10px';


    // Fetch data for the first time
    fetchData(currentPage);


    // Create popup with container div as content
    const popup = L.popup({
        minWidth: 200,
    })
        .setLatLng(position)
        .setContent(container)
        .openOn(map)
    map.on('zoomend', function () {
        popup.remove();
    });
};