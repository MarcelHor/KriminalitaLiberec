import {useMap} from "react-leaflet";
import {OpenStreetMapProvider, SearchControl} from "leaflet-geosearch";
import {useEffect} from "react";
import "leaflet-geosearch/dist/geosearch.css";

function SearchBar(){
    const map = useMap();
    const provider = new OpenStreetMapProvider(
        {
            params: {
                countrycodes: 'cz',
                bounded: 1,
                addressdetails: 1,
                limit: 5,
                viewbox: '14.9393,50.6275,15.2138,50.8866',
                format: 'json',

            }
        }
    );
    const searchControl = new SearchControl({
        provider: provider,
        style: 'button',
        position: 'topleft',
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
        autoClose: true,
        searchLabel: 'Zadejte adresu',
        showMarker: false,
    });
    useEffect(() => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, []);
    return;
}
export default SearchBar;