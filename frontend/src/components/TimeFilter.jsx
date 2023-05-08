import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
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
        <h2 className={"text-lg mb-2"}>Čas</h2>
        <div className={"flex items-center justify-center"}>
            <TimeRangePicker onChange={changeTime} className={"w-full"} value={props.timeRange} disableClock={true}
                             clearIcon={null}/>
            </div>
        <div className="inline-flex mb-4 mt-2">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l w-28"
                    onClick={() => {
                props.setTimeRange(["00:00", "23:59"]);
            }}><span>Celý den</span></button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4  w-28"
                    onClick={() => {
                props.setTimeRange(["20:00", "06:00"]);
            }}><span>Noc</span></button>

            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r w-28"
                    onClick={() => {
                props.setTimeRange(["06:00", "20:00"]);
            }}><span>Den</span></button>
        </div>
        <div className={""}>
            <h2 className={"text-lg mb-2"}>Datum</h2>
            <div className="w-full">
                <DateRangePicker
                    onChange={changeDate}
                    value={props.dateRange}
                    clearIcon={null}
                    className={"w-full"}
                    openCalendarOnFocus={false}
                />
                <div className="flex w-full mt-2">
                    <div className="flex-1">
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 w-full rounded-l"
                            onClick={() => {
                                props.setDateRange([new Date(), new Date()]);
                            }}
                        >
                            <span>Dnes</span>
                        </button>
                    </div>
                    <div className="flex-1">
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 w-full"
                            onClick={() => {
                                props.setDateRange([
                                    new Date(new Date().setDate(new Date().getDate() - 7)),
                                    new Date(),
                                ]);
                            }}
                        >
                            <span>Týden</span>
                        </button>
                    </div>
                    <div className="flex-1">
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 w-full"
                            onClick={() => {
                                props.setDateRange([
                                    new Date(new Date().setDate(new Date().getDate() - 30)),
                                    new Date(),
                                ]);
                            }}
                        >
                            <span>Měsíc</span>
                        </button>
                    </div>
                    <div className="flex-1">
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 w-full rounded-r"
                            onClick={() => {
                                props.setDateRange([
                                    new Date(new Date().setDate(new Date().getDate() - 365)),
                                    new Date(),
                                ]);
                            }}
                        >
                            <span>Rok</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);

}