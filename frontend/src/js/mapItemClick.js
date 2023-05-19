import axios from 'axios';
import calendar from '../assets/calendar.svg';
import clock from '../assets/clock.svg';
import {CATEGORY_COLORS, CATEGORY_COLORS_NAMES, CATEGORY_NAMES, findParent} from './colors';
import rightArrow from '../assets/right_arrow.svg';


export const mapItemClick = (map, markers, position) => {
    const container = document.createElement('div'), contentContainer = document.createElement('div'), buttonContainer = document.createElement('div'), popupContent = document.createElement('div');
    container.appendChild(contentContainer);
    container.appendChild(buttonContainer);
    contentContainer.appendChild(popupContent);

    const popupContentContainer = document.createElement('div');
    popupContentContainer.style.overflow = 'hidden';
    popupContentContainer.appendChild(popupContent);
    contentContainer.appendChild(popupContentContainer);

    const count = document.createElement('span');
    count.style.marginLeft = '64px';

    const maxPage = 100;
    let markerIds = [];
    const totalPage = Math.ceil(markers.length / maxPage);
    let currentPage = 0;
    let currentMarkerIndex = 0;
    markers.map((marker) => markerIds.push(marker.options.id));

    let data;
    const fetchData = async (page) => {
        const start = page * maxPage;
        const end = start + maxPage;
        const ids = markerIds.slice(start, end);
        axios.get(`http://localhost:3000/api/locations/${ids}`)
            .then((response) => {
                data = response.data;
                updatePopupContent(1);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    let index = 0;
    const cycleMarkers = async (increment) => {
        index += increment;
        currentMarkerIndex = index + currentPage * maxPage;
        if (markers.length > maxPage) {
            // If we're at the end of the current data set and there is no next data set, go to the beginning of marker list
            if (index >= data.length && currentPage >= totalPage - 1) {
                index = 0;
                currentMarkerIndex = 0;
                currentPage = 0;
                await fetchData(currentPage);
            }
            // if we are at beginning of the current data set and there is no previous data set go to the end of marker list
            else if (index < 0 && currentPage === 0) {
                if (markers.length % maxPage === 0) {
                    index = maxPage - 1;

                } else {
                    index = markers.length % maxPage - 1;
                }
                currentMarkerIndex = markers.length - 1;
                currentPage = totalPage - 1;
                await fetchData(currentPage);
            }
            // If we're at the end of the current data set and there is a next data set, fetch the next data set
            else if (index >= data.length && currentPage < totalPage) {
                currentPage++;
                index = 0;
                await fetchData(currentPage);
            }
            // If we're at the beginning of the current data set and there is a previous data set, fetch the previous data set
            else if (index < 0 && currentPage > 0) {
                currentPage--;
                index = 9;
                await fetchData(currentPage);
            }
            // If we're in the middle of the current data set, just update the popup content
            else {
                updatePopupContent(increment);
            }
        } else {
            if (index >= markers.length) {
                index = 0;
                currentMarkerIndex = 0;
            } else if (index < 0) {
                index = markers.length - 1;
                currentMarkerIndex = markers.length - 1;
            }
            updatePopupContent(increment);
        }

    };

    const updatePopupContent = (direction) => {
        if (data) {
            if (markers.length > 500) {

                const crimeIds = markers.map((item) => item.options.crime_type);
                const crimeCounts = {}; // Object to store the count of each crime type
                const crimeNames = crimeIds.map((id) => CATEGORY_NAMES[id]); // Get the names of the crime types

                // Count the occurrences of each crime type
                crimeNames.forEach((name) => {
                    crimeCounts[name] = (crimeCounts[name] || 0) + 1;
                });
                const maxCount = Math.max(...Object.values(crimeCounts)); // Get the maximum count of a crime type


                // Generate the HTML for the graph-like representation
                let graphHTML = '';
                Object.entries(crimeCounts).forEach(([name, count]) => {
                    const percentage = (count / maxCount) * 100;
                    const barColor = CATEGORY_COLORS_NAMES[name];
                    graphHTML += `
                                    <div>
                                     <div class="lowercase text-left flex justify-between text-xs items-center">
                                                          <div class="">${name}</div>
                                                          <div class="">${count}</div>
                                                        </div>
                                                        <div class="relative">
                                        <div class="overflow-hidden h-1 mb-1 text-xs rounded" style="background-color: ${barColor}; width: ${percentage}px;"></div>                     
                                    </div>                 
                                `;
                });

                let total = `<div class="flex justify-between font-semibold"><span>Celkem:</span> <span>${markers.length}</span></div>`;



                // Set the HTML content of the popup
                return popupContent.innerHTML = `
                  <div class="text-center ">
                    ${graphHTML}
                    <hr class="my-2">
                    ${total}
                  </div>
                `;
            } else {
                const date = new Date(data[index].date);
                const dateStr = date.toLocaleDateString('cs-CZ', {
                    day: 'numeric', month: 'numeric', year: 'numeric',
                });
                const timeStr = date.toLocaleTimeString('cs-CZ', {
                    hour: 'numeric', minute: 'numeric',
                });

                const crime_parent = findParent(data[index].crime_type_id, data[index].crime_type_id2);
                const categoryColor = CATEGORY_COLORS[crime_parent];
                const crime_parent_name = CATEGORY_NAMES[crime_parent];

                popupContent.innerHTML = `
            <div class="text-center h-60">
                <h1 class="lowercase first-letter:uppercase border-b-4 text-center p-2" style="border-color: ${categoryColor};"> ${crime_parent_name}</h1>
                <div class="flex justify-between">
                     <div class="flex items-center">
                        <img src="${calendar}" alt="calendar" style="width: 20px; height: 20px; margin-right: 5px;">
                        <p>${dateStr}</p>
                    </div>
                    <div class="flex items-center">
                        <img src="${clock}" alt="clock" style="width: 20px; height: 20px; margin-right: 5px;">
                        <p>${timeStr}</p>  
                    </div>
                </div>
                <div> 
                    <h2 class="font-bold "> Stav objasnění:</h2>
                    <p>${data[index].state}</p>           
                </div>
                <div>
                    ${data[index].crime_type_parent1 && data[index].crime_type_parent1 != crime_parent_name ? `<h2 class="font-bold ">Třídy</h2>` : ''}      
              <div class="lowercase">
                        ${data[index].crime_type_parent1 && data[index].crime_type_parent1 != crime_parent_name ? `${data[index].crime_type_parent1}` : ''}
                        ${data[index].crime_type_parent2 && data[index].crime_type_parent2 != crime_parent_name ? `, ${data[index].crime_type_parent2}` : ''}
                        ${data[index].crime_type_parent3 ? `, ${data[index].crime_type_parent3}` : ''}
                        ${data[index].crime_type_parent4 ? `, ${data[index].crime_type_parent4}` : ''}</p>
                    </div>
                </div>
            </div>
        `;
                popupContent.animate([// keyframes
                    {
                        transform: `translateX(${direction > 0 ? '-100%' : '100%'})`, opacity: '0'
                    }, {transform: 'translateX(0)', opacity: '1'}], {
                    // timing options
                    duration: 250, iterations: 1
                });
                count.textContent = `(${currentMarkerIndex + 1}/${markers.length})`;
            }
        }
    }

    if (markers.length < 500 && markers.length > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerHTML = `<img src="${rightArrow}" alt="previous" style="width: 24px; height: 24px; rotate: 180deg;" class="rounded-full hover:bg-gray-200">`;
        prevButton.addEventListener('click', () => cycleMarkers(-1));
        buttonContainer.appendChild(prevButton);
        prevButton.style.marginRight = '10px';

        const nextButton = document.createElement('button');
        nextButton.innerHTML = `<img src="${rightArrow}" alt="next" style="width: 24px; height: 24px;" class="rounded-full hover:bg-gray-200">`;
        nextButton.addEventListener('click', () => cycleMarkers(1));
        buttonContainer.appendChild(nextButton);


        count.textContent = `(${currentMarkerIndex + 1}/${markers.length})`;

        if (markers.length > 1) buttonContainer.appendChild(count);

        // Set CSS styles to arrange the content and buttons vertically
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.marginLeft = '100px';

        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.alignItems = 'center';
        buttonContainer.style.marginTop = '20px';
    }

    // Fetch data for the first time
    fetchData(currentPage);

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
