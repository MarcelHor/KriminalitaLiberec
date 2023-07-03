import axios from "axios";

//TODO: udělat z toho hook?
export function fetchData(dateRange, setLocations, setLoading, setError) {
    setError(false);
    setLoading(false);
    let timeout = null;

    // Set a timeout to display the loading animation if the data takes longer than 1 second to load
    const displayLoading = () => {
        timeout = setTimeout(() => setLoading(true), 1000);
    };

    displayLoading();

    axios.get(`http://localhost:3000/api/locations/${dateRange[0].toISOString()}/${dateRange[1].toISOString()}`)
        .then((res) => {
            // Clear the timeout and hide the loading animation
            clearTimeout(timeout);
            setLoading(false);
            setLocations(res.data);
        })
        .catch((err) => {
            setError(true);
            console.log(err);
            setLoading(false);
        });
}
