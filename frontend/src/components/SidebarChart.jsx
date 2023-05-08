import {Pie} from "react-chartjs-2";
import {CATEGORY_COLORS, CATEGORY_NAMES} from "../js/colors.js";

export const SidebarChart = (props) => {

    const labels = Object.keys(props.count);
    const data = Object.values(props.count);


    return (<>
        <div className={"h-64 flex justify-center items-center"}>
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
    </>);
}