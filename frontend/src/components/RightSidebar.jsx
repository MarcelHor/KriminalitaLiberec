import {CrimesTree} from "./CrimesTree.jsx";
import {StateFilter} from "./StateFilter.jsx";
import {TimeFilter} from "./TimeFilter.jsx";
import {DrawControl} from "./DrawControl.jsx";
import {SidebarChart} from "./SidebarChart.jsx";
import {useEffect, useState} from "react";

export default function RightSidebar(props) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);



    return (<div>
        <div className="absolute right-0 p-4 z-10 md:hidden">
            <button
                className={`bg-header rounded-full w-12 h-12 text-white flex items-center justify-center hover:brightness-150 z-50 transition duration-300 ease-in-out ${isSidebarOpen ? '' : 'rotate-180'}`}
                onClick={toggleSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 19l-7-7 7-7"/>
                </svg>
            </button>
        </div>
        <div
            className={`h-[calc(100vh-80px)] overflow-y-scroll p-4 w-96 sticky bg-white z-1  ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
            <div>
                <SidebarChart count={props.count}/>
            </div>
            <div>
                <h1 className={"text-xl"}>Výběr Mapy</h1>
                <div className={"flex flex-row items-center justify-center space-x-2 py-2"}>
                    <button
                        className={"bg-transparent hover:bg-blue-500 w-32 h-10 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"}
                        onClick={() => props.setHeatMap(false)}>Body
                    </button>
                    <button
                        className={"bg-transparent hover:bg-blue-500 w-32 h-10 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"}
                        onClick={() => props.setHeatMap(true)}>Heatmapa
                    </button>
                </div>
            </div>

            <div>
                <DrawControl editRef={props.editRef}/>
            </div>

            <div>
                <h1 className={"text-xl"}>Filtry</h1>
                <div>
                    <TimeFilter setTimeRange={props.setTimeRange} setDateRange={props.setDateRange}
                                timeRange={props.timeRange} dateRange={props.dateRange}/>
                </div>

                <div className={"lowercase"}>
                    <CrimesTree setSelected={props.setSelected} count={props.count}/>
                </div>

                <div>
                    <StateFilter setSelectedStates={props.setSelectedStates} stateCount={props.stateCount}/>
                </div>
            </div>
        </div>
    </div>);
}