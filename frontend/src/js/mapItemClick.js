import axios from 'axios';

export const mapItemClick = (map, markers, position) => {
    const container = document.createElement('div');
    const contentContainer = document.createElement('div');
    const buttonContainer = document.createElement('div');
    const popupContent = document.createElement('div');

    const maxPage = 100;
    let markerIds = [];
    const totalPage = Math.ceil(markers.length / maxPage);
    let currentPage = 0;
    markers.map((marker) => markerIds.push(marker.options.id));

    let data;
    const fetchData = (page) => {
        const start = page * maxPage;
        const end = start + maxPage;
        const ids = markerIds.slice(start, end);
        console.log(ids);
        axios.get(`http://localhost:3000/api/data/${ids}`)
            .then((response) => {
                data = response.data;
                cycleMarkers(0);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    fetchData(currentPage);

    let currentMarkerIndex = 0;
    const cycleMarkers = (increment) => {
        currentMarkerIndex += increment;

        // If we're at the beginning of the current data set and there is a previous data set, fetch the previous data set
        if (currentMarkerIndex < 0 && currentPage > 0) {
            currentPage--;
            fetchData(currentPage);
            currentMarkerIndex = maxPage - 1;
        }
        // If we're at the end of the current data set and there is a next data set, fetch the next data set
        else if (currentMarkerIndex >= data.length && currentPage < totalPage - 1) {
            currentPage++;
            fetchData(currentPage);
            currentMarkerIndex = 0;
        }

        const date = new Date(data[currentMarkerIndex].date);
        const dateStr = date.toLocaleDateString('cs-CZ', {
            day: 'numeric', month: 'numeric', year: 'numeric',
        });
        const timeStr = date.toLocaleTimeString('cs-CZ', {
            hour: 'numeric', minute: 'numeric',
        });
        popupContent.innerHTML = `
      <div>
        <h1>${data[currentMarkerIndex].crime_type}</h1>
        <p>${dateStr}</p>
        <p>${timeStr}</p>
        <p>${data[currentMarkerIndex].state}</p>
        <p>
          ${data[currentMarkerIndex].crime_type}
          ${data[currentMarkerIndex].crime_type_parent1 && data[currentMarkerIndex].crime_type_parent1 !== data[currentMarkerIndex].crime_type ? `, ${data[currentMarkerIndex].crime_type_parent1}` : ''}
          ${data[currentMarkerIndex].crime_type_parent2 ? `, ${data[currentMarkerIndex].crime_type_parent2}` : ''}
          ${data[currentMarkerIndex].crime_type_parent3 ? `, ${data[currentMarkerIndex].crime_type_parent3}` : ''}
        </p>
      </div>
    `;
        count.textContent = `(${currentMarkerIndex + 1}/${markers.length})`;
    };

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