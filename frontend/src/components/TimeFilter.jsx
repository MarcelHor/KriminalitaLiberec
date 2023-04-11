import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

export const TimeFilter = (props) => {
    const changeTime = (time) => {
        props.setTimeRange(time);
    }
    const changeDate = (date) => {
        props.setDateRange(date);
    }

    return (<>
        <h2 className={"text-lg"}>Čas a Datum</h2>
        <div className={"flex space-x-2 items-center justify-center py-2"}>
            <button className={"bg-transparent hover:bg-blue-500 w-32 h-10 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"} onClick={() => {
                props.setTimeRange(["00:00", "23:59"]);
            }}><span>Celý den</span></button>
            <button className={"bg-transparent hover:bg-blue-500 w-32 h-10 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded"} onClick={() => {
                props.setTimeRange(["20:00", "06:00"]);
            }}><span>Noc</span></button>

            <button className={"bg-transparent hover:bg-blue-500 w-32 h-10  text-blue-700 font-semibold hover:text-white  px-2 border border-blue-500 hover:border-transparent rounded"} onClick={() => {
                props.setTimeRange(["06:00", "20:00"]);
            }}><span>Den</span></button>
        </div>
        <div className={"flex items-center justify-center"}>
            <TimeRangePicker onChange={changeTime} className={"w-full"} value={props.timeRange} disableClock={true}
                             clearIcon={null}></TimeRangePicker>
        </div>
        <div className={""}>
            <h2 className={"text-lg"}>Datum</h2>
            <div className={"flex space-x-2 py-2 items-center justify-center"}>
                <button className={"bg-transparent hover:bg-blue-500 w-18 h-10 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} onClick={() => {
                    props.setDateRange([new Date(), new Date()]);
                }}><span>Dnes</span></button>

                <button className={"bg-transparent hover:bg-blue-500 w-18 h-10 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} onClick={() => {
                    props.setDateRange([new Date(new Date().setDate(new Date().getDate() - 7)), new Date()]);
                }}><span>Týden</span></button>

                <button className={"bg-transparent hover:bg-blue-500 w-18 h-10 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} onClick={() => {
                    props.setDateRange([new Date(new Date().setDate(new Date().getDate() - 30)), new Date()]);
                }}><span>Měsíc</span></button>

                <button className={"bg-transparent hover:bg-blue-500 w-18 h-10 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"} onClick={() => {
                    props.setDateRange([new Date(new Date().setDate(new Date().getDate() - 365)), new Date()]);
                }}><span>Rok</span></button>
            </div>
            <DateRangePicker onChange={changeDate} value={props.dateRange} clearIcon={null} className={"w-full"}></DateRangePicker>
        </div>
    </>);

}