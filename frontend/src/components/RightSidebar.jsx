import {Pie} from 'react-chartjs-2';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import {useEffect, useState} from "react";
import axios from "axios";
import select_arrow from "../assets/select_arrow.svg";
import select_line from "../assets/select_line.svg";
import select_multiple from "../assets/select_multiple.svg";
import {CATEGORY_COLORS} from "../js/colors.js";

export default function RightSidebar(props) {
    const labels = Object.keys(props.count);
    const data = Object.values(props.count);

// Get reference to EditControl component
    const editRef = props.editRef;


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
    </div>);
}