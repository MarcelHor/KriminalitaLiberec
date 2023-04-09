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
    </>);

}