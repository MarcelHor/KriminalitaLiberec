import CrimesTree from "./CrimesTree.jsx";
import StateFilter from "./StateFilter.jsx";
import TimeFilter from "./TimeFilter.jsx";
import DrawControl from "./DrawControl.jsx";
import SidebarChart from "./SidebarChart.jsx";
import {useState} from "react";

 const RightSidebar = (props) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
            className={`h-[calc(100vh-80px)] overflow-y-scroll p-4  z-1 transition duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 fixed md:relative top-20 md:top-0 right-0 bg-white shadow-md w-full md:w-96`}>
            <div>
                <h1 className={"text-xl mb-4 font-semibold"}>Graf</h1>
                <SidebarChart count={props.count}/>
            </div>

            <hr className={"my-3"}/>

            <div>
                <h1 className={"text-xl mb-4 font-semibold"}>Nástroje</h1>
                <div className={"flex justify-center items-center mb-4"}>
                    <div className="inline-flex">
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l w-28"
                            onClick={() => props.setHeatMap(false)}>Body
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r w-28"
                            onClick={() => props.setHeatMap(true)}>Heatmapa
                        </button>
                    </div>
                </div>
                <DrawControl editRef={props.editRef}/>
            </div>

            <hr className={"my-3"}/>

            <div>
                <div className={"flex justify-between items-center mb-8"}>
                    <h1 className={"text-xl font-semibold"}>Filtry</h1>
                    <div className={"flex justify-center items-center"}>
                        <button
                            className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l w-full "} onClick={() => props.setIsSaveModalOpen(true)}>Uložit
                        </button>
                        <button
                            className={"bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r w-full "} onClick={() => props.setIsLoadModalOpen(true)}>Načíst
                        </button>
                    </div>
                </div>

                <div className={"mb-4"}>
                    <TimeFilter setTimeRange={props.setTimeRange} setDateRange={props.setDateRange}
                                timeRange={props.timeRange} dateRange={props.dateRange}/>
                </div>

                <div className={"mb-4"}>
                    <CrimesTree setSelected={props.setSelected} count={props.count} selectedCrimes={props.selectedCrimes}/>
                </div>

                <div>
                    <StateFilter setSelectedStates={props.setSelectedStates} stateCount={props.stateCount} selectedStates={props.selectedStates}/>
                </div>
            </div>
        </div>
    </div>);
}

export default RightSidebar;