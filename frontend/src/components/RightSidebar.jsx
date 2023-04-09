import {CrimesTree} from "./CrimesTree.jsx";
import {StateFilter} from "./StateFilter.jsx";
import {TimeFilter} from "./TimeFilter.jsx";
import {DrawControl} from "./DrawControl.jsx";
import {SidebarChart} from "./SidebarChart.jsx";

export default function RightSidebar(props) {

    return (<div className={"w-1/4  h-[calc(100vh-80px)] p-4 overflow-y-scroll"}>
        <div>
            <SidebarChart count={props.count}/>
        </div>
        <div>
            <h1 className={"text-xl"}>Výběr Mapy</h1>
            <div className={"flex flex-row"}>
                <button className={"bg-gray-200 rounded-md p-2 m-2"} onClick={() => props.setHeatMap(false)}>Body</button>
                <button className={"bg-gray-200 rounded-md p-2 m-2"} onClick={() => props.setHeatMap(true)}>Heatmapa</button>
            </div>
        </div>

        <div>
            <DrawControl editRef={props.editRef}/>
        </div>

        <div>
            <h1 className={"text-xl"}>Filtry</h1>
            <div>
                <TimeFilter setTimeRange={props.setTimeRange} setDateRange={props.setDateRange} timeRange={props.timeRange} dateRange={props.dateRange}/>
            </div>

            <div className={"lowercase"}>
                <CrimesTree setSelected={props.setSelected}/>
            </div>

            <div>
                <StateFilter setSelectedStates={props.setSelectedStates}/>
            </div>
        </div>
    </div>);
}