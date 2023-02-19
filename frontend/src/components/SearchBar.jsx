import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const GeoJSONSearch = ({ onResultSelected }) => {
  const provider = new OpenStreetMapProvider();

  const handleResultSelected = (event) => {
    onResultSelected(event.result);
  };

  return (
    <GeoSearchControl
      provider={provider}
      showMarker={false}
      showPopup={false}
      maxMarkers={1}
      retainZoomLevel={false}
      animateZoom={true}
      autoClose={false}
      searchLabel="Hledat umístění"
      keepResult={true}
      popupFormat={({ query, result }) => result.label}
      resultFormat={({ result }) => result.label}
      onSelect={handleResultSelected}
    />
  );
};

export default GeoJSONSearch;