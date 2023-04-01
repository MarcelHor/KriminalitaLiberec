import {Pie} from 'react-chartjs-2';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import {useEffect, useState} from "react";
import axios from "axios";
import select_arrow from "../assets/select_arrow.svg";
import select_line from "../assets/select_line.svg";
import select_multiple from "../assets/select_multiple.svg";

export default function RightSidebar(props) {
    const labels = Object.keys(props.count);
    const data = Object.values(props.count);
    const config = {
        labels: labels, datasets: [{
            data: data,
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1,
        },], options: {
            responsive: true, maintainAspectRatio: false,
        }
    };

    const handleDateChange = (date) => {
        props.setDateRange(date);
    };

    // Set default date range to last month
    useEffect(() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        props.setDateRange([date, new Date()]);
    }, []);

    // Get reference to EditControl component
    const editRef = props.editRef;

    // Set removes duplicates to get unique names
    // Spread operator converts set to array to be able to map over it
    const [uniqueNames, setUniqueNames] = useState([])

    //fetch all crimes names and init
    useEffect(() => {
        axios.get("http://localhost:3000/api/types")
            .then(res => {
                setUniqueNames(res.data)
                props.setSelectedMarkers(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    // Handle checkbox change and update selectedMarkers
    const handleCheckboxChange = (event) => {
        //set selectedMarkers to array of names of selected checkboxes
        if (event.target.checked) {
            props.setSelectedMarkers([...props.selectedMarkers, event.target.name]);
        } else {
            props.setSelectedMarkers(props.selectedMarkers.filter(name => name !== event.target.name));
        }
    }


    return (<div className={"w-1/4  h-[calc(100vh-80px)] p-4 overflow-y-scroll"}>
        <div>
            <h1 className={"text-xl"}>Graf</h1>
            <Pie data={config}/>
        </div>
        <div>
            <h1 className={"text-xl"}>Filter</h1>
            <DateRangePicker
                onChange={handleDateChange}
                value={props.dateRange}
                clearIcon={null}
            />
        </div>

        <div>
            <h1 className={"text-xl"}>Nástroje</h1>
            <div className={"pt-4"}>
                <button className={"w-full flex items-center rounded-l space-x-2 mb-4"} onClick={() => {
                    editRef.current._toolbars.draw._modes.polygon.handler.disable();
                    editRef.current._toolbars.draw._modes.rectangle.handler.disable();
                }}>
                    <img src={select_arrow} alt="select_arrow" className="inline-block w-8"/>
                    <span>Vybrat</span>
                </button>
                <button className={"w-full flex items-center rounded-l space-x-2 mb-4"} onClick={() => {
                    // Enable polygon select mode
                    editRef.current._toolbars.draw._modes.polygon.handler.enable();
                }}>
                    <img src={select_line} alt="select_arrow" className="inline-block w-8"/>
                    <span>Vybrat polygonem</span>
                </button>
                <button className={"w-full flex items-center rounded-l space-x-2 mb-4"} onClick={() => {
                    // Enable rectangle select mode
                    editRef.current._toolbars.draw._modes.rectangle.handler.enable();
                }}>
                    <img src={select_multiple} alt="select_multiple" className="inline-block w-8"/>
                    <span>Vybrat čtvercem</span>
                </button>
            </div>
        </div>

        <div>
            <h1 className={"text-xl"}>Vrstvy</h1>
            {uniqueNames.map((name, index) => (<div className={"pt-4 text-xs"} key={index}>
                <div className=" w-full flex items-center rounded-l space-x-2">
                    <span className={"inline-block w-4 h-4 rounded-full bg-amber-300"}></span>
                    <input type="checkbox" defaultChecked={true} name={name} onChange={handleCheckboxChange}
                           className="inline-block w-8"/>
                    <span>{name}</span>
                    <span className={"text-gray-400"}>({props.count[name] ? props.count[name] : 0})</span>
                </div>
            </div>))}
        </div>

    </div>);
}