import axios from 'axios';

export function fetchData(dateRange, setLocations, setLoading, setError) {
    setError(false);
    setLoading(true);
    axios
        .get(`http://localhost:3000/api/data/${dateRange[0].toISOString()}/${dateRange[1].toISOString()}`)
        .then((res) => {
            setLocations(res.data);
            setLoading(false);
        })
        .catch((err) => {
            setError(true);
            console.log(err);
            setLoading(false);
        });
}