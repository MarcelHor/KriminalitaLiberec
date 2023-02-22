import React from 'react';
import { Marker, Popup, useMap  } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";

export default function MapContent(props){
    const locations = props.visibleMarkers;

    //create icon for cluster
    const createClusterCustomIcon = function (cluster) {
        const markers = cluster.getAllChildMarkers();
        const childMarkers = markers.map((marker) => marker.options.children.props.children.props.children[0].props.children);
        // Count the number of markers in each category
        const categories = {};
        childMarkers.forEach((marker) => {
            const category = marker.replace(/\s+/g, '');
            categories[category] = categories[category] ? categories[category] + 1 : 1;
        });
        // Define the colors for each category
        const categoryColors = {
            Obecněnebezpečná: '#ff3333',
            Požáry: '#ff9933',
            Extremismus: '#ffff33',
            výbuchy: '#33ff33',
            Dopravnínehody: '#3388ff',
            KrádežePodvody: '#9933ff',
            Zbraně: '#ff33ff',
            Jinámajetková: '#ff3333',
            Toxikománie: '#ff9933',
        };

        // Define the radius and line width for the ring chart
        const radius = 25;
        const lineWidth = 10;

        // Create the canvas element and context
        const canvas = document.createElement('canvas');
        canvas.width = radius * 2;
        canvas.height = radius * 2;
        const ctx = canvas.getContext('2d');

        // Calculate total number of markers and total width of the ring chart
        const markerCount = childMarkers.length;
        const totalWidth = lineWidth * markerCount;

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
        iconDiv.innerHTML = `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-65%, -45%); font-size: 15px; font-weight: bold;">${markerCount}</div><canvas></canvas>`;
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

    const createMarkerCustomIcon = function (color) {
        const iconDiv = document.createElement('div');
        iconDiv.style.backgroundColor = color;
        iconDiv.style.width = '30px';
        iconDiv.style.height = '30px';
        iconDiv.style.borderRadius = '50%';
        iconDiv.style.boxShadow = '0px 0px 6px rgba(0, 0, 0, 0.5)';
        iconDiv.innerHTML = `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 14px; font-weight: bold; color: white;">1</div>`;
        const icon = L.divIcon({
            html: iconDiv,
            className: 'marker-custom',
            iconSize: L.point(30, 30),
            iconAnchor: L.point(15, 15),
        });
        return icon;
    };


    return (
        <>
            <MarkerClusterGroup showCoverageOnHover={false}
                                iconCreateFunction={createClusterCustomIcon}
            >
                {locations.map((location, index) => (
                        <Marker key={index} position={[location.coordinates[1], location.coordinates[0]]} icon={createMarkerCustomIcon('#ff3333')}>
                            <Popup>
                                <div>
                                    <h1>{location.properties.crime.name}</h1>
                                    <p>{location.properties.crime.description}</p>
                                </div>
                            </Popup>
                        </Marker>
             ))}
            </MarkerClusterGroup>
        </>
    );
}