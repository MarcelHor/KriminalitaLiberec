import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import {useEffect, useState} from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RightSidebar({count, setDateRangeMarkers, locations}) {
    const labels = Object.keys(count);
    const data = Object.values(count);
    const config = {
        labels: labels, datasets: [{
            data: data,
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1,
        },],
    };

    const [dateRange, setDateRange] = useState([]);

    const handleDateChange = (date) => {
        setDateRange(date);
        setDateRangeMarkers(
            locations.filter((location) => {
                const locationDate = new Date(location.properties.date);
                return locationDate >= date[0] && locationDate <= date[1];
            })
        );
    };

    useEffect(() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        setDateRange([date, new Date()]);
        setDateRangeMarkers(
            locations.filter((location) => {
                const locationDate = new Date(location.properties.date);
                return locationDate >= date && locationDate <= new Date();

            })
        );
    }, []);


    return (<div className={"w-1/4 h-full p-2 "}>
        <div>
            <h1 className={"text-xl"}>Graf</h1>
            <Pie data={config}/>
        </div>
        <div>
            <h1 className={"text-xl"}>Filter</h1>
            <DateRangePicker
                onChange={handleDateChange}
                value={dateRange}
                clearIcon={null}
            />
        </div>
    </div>);
}