import {Pie} from 'react-chartjs-2';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import {useEffect, useState} from "react";
import axios from "axios";
import select_arrow from "../assets/select_arrow.svg";
import select_line from "../assets/select_line.svg";
import select_multiple from "../assets/select_multiple.svg";
import {CATEGORY_COLORS} from "../js/colors.js";
import NestedTypes from "./NestedTypes.jsx";

export default function RightSidebar(props) {
    const labels = Object.keys(props.count);
    const data = Object.values(props.count);

    // Get reference to EditControl component
    const editRef = props.editRef;

    const [types, setTypes] = useState([]);
    const [nestedTypes, setNestedTypes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/types')
            .then((response) => {
                setTypes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    useEffect(() => {
        const nestedData = types.reduce((acc, cur) => {
            let category = acc.find(item => item.name === cur.crime_type);
            if (!category) {
                category = {name: cur.crime_type, children: []};
                acc.push(category);
            }

            let parent2 = null;
            if (cur.crime_type_parent2) {
                let parent2Name = cur.crime_type_parent2;
                let parent1Name = cur.crime_type_parent1;
                let existingParent2 = category.children.find(item => item.name === parent2Name);
                if (existingParent2) {
                    parent2 = existingParent2;
                } else {
                    parent2 = {name: parent2Name, children: []};
                    category.children.push(parent2);
                }

                let parent1 = parent2.children.find(item => item.name === parent1Name);
                if (!parent1) {
                    parent1 = {name: parent1Name, children: []};
                    parent2.children.push(parent1);
                }

                let parent3 = null;
                if (cur.crime_type_parent3) {
                    let parent3Name = cur.crime_type_parent3;
                    parent3 = parent1.children.find(item => item.name === parent3Name);
                    if (!parent3) {
                        parent3 = {name: parent3Name, children: []};
                        parent1.children.push(parent3);
                    }
                }

                parent2 = parent3 || parent1;
            }

            if (!parent2) {
                let parent1 = category.children.find(item => item.name === cur.crime_type_parent1);
                if (!parent1) {
                    parent1 = {name: cur.crime_type_parent1, children: []};
                    category.children.push(parent1);
                }

                let parent3 = null;
                if (cur.crime_type_parent3) {
                    let parent3Name = cur.crime_type_parent3;
                    parent3 = parent1.children.find(item => item.name === parent3Name);
                    if (!parent3) {
                        parent3 = {name: parent3Name, children: []};
                        parent1.children.push(parent3);
                    }
                }

                parent2 = parent3 || parent1;
            }

            return acc;
        }, []);
        setNestedTypes(nestedData);
    }, [types]);


    return (<div className={"w-1/4  h-[calc(100vh-80px)] p-4 overflow-y-scroll"}>
        <div>
            <h1 className={"text-xl"}>Graf</h1>
            <Pie data={{
                labels: labels, datasets: [{
                    data: data,
                    backgroundColor: labels.map((label) => CATEGORY_COLORS[label]),
                    borderWidth: 0,
                    hoverOffset: 4,
                }]
            }} options={{
                plugins: {
                    legend: {
                        display: false
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
                    <input type="checkbox" id="day" name="day" value="day"/>
                    <label htmlFor="day">Den</label>

                    <input type="checkbox" id="night" name="night" value="night"/>
                    <label htmlFor="night">Noc</label>
                </div>
                <div className={""}>
                    <DateRangePicker></DateRangePicker>
                </div>
                <div className={""}>
                    <TimeRangePicker disableClock={true}></TimeRangePicker>
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
                    {nestedTypes.map((item) => (<NestedTypes key={item.name} data={item}/>))}
                </div>
            </div>
        </div>

    </div>);
}