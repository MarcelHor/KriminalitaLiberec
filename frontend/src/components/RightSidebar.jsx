import {Pie} from 'react-chartjs-2';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import {useEffect, useState} from "react";
import axios from "axios";
import select_arrow from "../assets/select_arrow.svg";
import select_line from "../assets/select_line.svg";
import select_multiple from "../assets/select_multiple.svg";
import {CATEGORY_COLORS, CATEGORY_NAMES} from "../js/colors.js";
import NestedTypes from "./NestedTypes.jsx";

export default function RightSidebar(props) {
    const labels = Object.keys(props.count);
    const data = Object.values(props.count);
    const [types, setTypes] = useState([]);
    const [states, setStates] = useState([]);
    // Get reference to EditControl component
    const editRef = props.editRef;

    useEffect(() => {
        axios.get('http://localhost:3000/api/types/nested')
            .then((response) => {
                setTypes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/api/states')
            .then((response) => {
                setStates(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const handleCheckboxChange = (checked, id, isParent) => {
        if (isParent) {
            props.setSelected((prev) => {
                if (checked) {
                    return prev.filter((type) => type !== id);
                } else {
                    return [...prev, id];
                }
            });
        } else {
            props.setSelected((prev) => {
                if (checked) {
                    return prev.filter((type) => type !== id);

                } else {
                    return [...prev, id];
                }
            });
        }
    };

    const handleStateCheckboxChange = (event) => {
        const id = parseInt(event.target.id)
        props.setSelectedStates((prev) => {
            if (event.target.checked) {
                return prev.filter((state) => state !== id);

            } else {
                return [...prev, id];
            }
        });
    };

    const changeTime = (time) => {
        props.setTimeRange(time);
    }
    const changeDate = (date) => {
        props.setDateRange(date);
    }



    return (<div className={"w-1/4  h-[calc(100vh-80px)] p-4 overflow-y-scroll"}>
        <div>
            <h1 className={"text-xl"}>Graf</h1>
            <Pie data={{
                labels: labels.map((label) => CATEGORY_NAMES[label]), datasets: [{
                    data: data,
                    backgroundColor: labels.map((label) => CATEGORY_COLORS[label]),
                    borderWidth: 0,
                    hoverOffset: 4,
                }]
            }} options={{
                plugins: {
                    legend: {
                        display: false
                    }, tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.parsed.y;
                            }
                        }
                    }
                }
            }}/>
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
            <h1 className={"text-xl"}>Filtry</h1>
            <div className={"pt-4"}>
                <h2 className={"text-lg"}>Čas a Datum</h2>
                <div className={"flex space-x-2"}>
                    <button className={"w-full flex items-center rounded-l space-x-2 mb-4"} onClick={() => {
                        props.setTimeRange(["00:00", "23:59"]);
                    }}><span>Celý den</span></button>
                    <button className={"w-full flex items-center rounded-l space-x-2 mb-4"} onClick={() => {
                        props.setTimeRange(["20:00", "06:00"]);
                    }}><span>Noc</span></button>

                    <button className={"w-full flex items-center rounded-l space-x-2 mb-4"} onClick={() => {
                        props.setTimeRange(["06:00", "20:00"]);
                    }}><span>Den</span></button>
                </div>
                <div className={""}>
                    <TimeRangePicker onChange={changeTime} value={props.timeRange} disableClock={true}
                                     clearIcon={null}></TimeRangePicker>
                </div>
                <div className={""}>
                    <h2 className={"text-lg"}>Datum</h2>
                    <div className={"flex space-x-2"}>
                        <button className={"w-full flex items-center rounded-l space-x-2 mb-4"} onClick={() => {
                            props.setDateRange([new Date(), new Date()]);
                        }}><span>Dnes</span></button>

                        <button className={"w-full flex items-center rounded-l space-x-2 mb-4"} onClick={() => {
                            props.setDateRange([new Date(new Date().setDate(new Date().getDate() - 7)), new Date()]);
                        }}><span>Týden</span></button>

                        <button className={"w-full flex items-center rounded-l space-x-2 mb-4"} onClick={() => {
                            props.setDateRange([new Date(new Date().setDate(new Date().getDate() - 30)), new Date()]);
                        }}><span>Měsíc</span></button>

                        <button className={"w-full flex items-center rounded-l space-x-2 mb-4"} onClick={() => {
                            props.setDateRange([new Date(new Date().setDate(new Date().getDate() - 365)), new Date()]);
                        }}><span>Rok</span></button>
                    </div>
                    <DateRangePicker onChange={changeDate} value={props.dateRange} clearIcon={null}></DateRangePicker>
                </div>

            </div>
            <div>
                <h2 className={"text-lg"}>Kategorie</h2>
                <div className={"flex space-x-2"}>
                    <input type="checkbox" id="day" name="day" value="day"/>
                    <label htmlFor="day">Přestupky</label>

                    <input type="checkbox" id="night" name="night" value="night"/>
                    <label htmlFor="night">Trestné činy</label>
                </div>

                <div>
                    <h2 className={"text-lg"}>Typy</h2>
                    {types.map((item) => (
                        <NestedTypes key={item.name} data={item} handleCheckboxChange={handleCheckboxChange}
                                     parentChecked={true}
                        />))}
                </div>
            </div>
            <div>
                <h2 className={"text-lg"}>Stav objasnění</h2>
                <div className={"flex flex-col space-y-2 p-4"}>
                    {states.map((item) => (<div key={item.id}>
                        <input defaultChecked={true} type="checkbox" id={item.id}
                                 onChange={handleStateCheckboxChange}/>
                        <label>{item.label}</label>
                    </div>))}
                </div>
            </div>
        </div>
    </div>);
}