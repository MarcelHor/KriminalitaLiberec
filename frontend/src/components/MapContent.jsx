import React from 'react';
import { Marker, Popup, useMap  } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";

export default function MapContent(props){
    const locations = props.visibleMarkers;

    //create icon for cluster
    const createClusterCustomIcon = function (cluster) {
        const markers = cluster.getAllChildMarkers();
        const childMarkers = markers.map(marker => marker.options.children.props.children.props.children[0].props.children);
        // Count the number of markers in each category
        const categories = {};
        childMarkers.forEach(marker => {
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
            Zbraně: "#ff33ff",
            Jinámajetková: '#ff3333',
            Toxikománie: '#ff9933',
        };

        // Define the radius and line width for the pie chart
        const radius = 30;
        const lineWidth = 10;

        // Create the canvas element and context
        const canvas = document.createElement("canvas");
        canvas.width = radius * 2;
        canvas.height = radius * 2;
        const ctx = canvas.getContext("2d");

        let startAngle = 0;
        for (const [category, count] of Object.entries(categories)) {
            const endAngle = startAngle + (count / childMarkers.length) * 2 * Math.PI;
            ctx.fillStyle = categoryColors[category];
            console.log(categoryColors[category]);
            ctx.beginPath();
            ctx.moveTo(radius, radius);
            ctx.arc(
                radius,
                radius,
                radius - lineWidth / 2,
                startAngle,
                endAngle
            );
            ctx.closePath();
            ctx.fill();
            startAngle = endAngle;
        }

        // Create the div icon with the canvas element and marker count label
        const markerCount = childMarkers.length;
        const iconDiv = L.DomUtil.create("div");
        const icon = L.divIcon({
            html: canvas,
            className: "marker-cluster",
            iconSize: L.point(radius * 2, radius * 2),
            iconAnchor: L.point(radius, radius),
        });

        return icon;
    };


    return (
        <>
            <MarkerClusterGroup showCoverageOnHover={false}
                                iconCreateFunction={createClusterCustomIcon}>
                {locations.map((location, index) => (
                        <Marker key={index} position={[location.coordinates[1], location.coordinates[0]]}>
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