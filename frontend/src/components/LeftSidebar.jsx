import select_arrow from "../assets/select_arrow.svg";
import select_multiple from "../assets/select_multiple.svg";
import select_line from "../assets/select_line.svg";


export default function LeftSidebar(props) {
    return (
        <div className="p-4 w-1/4 h-full grid grid-cols-1">
            <div>
                <h1 className={"text-xl"}>Nástroje</h1>
                <div className={"pt-4"}>
                    <div className=" w-full flex items-center rounded-l space-x-2 mb-4">
                        <img src={select_arrow} alt="select_arrow" className="inline-block w-8"/>
                        <span>Vybrat</span>
                    </div>
                    <div className=" w-full flex items-center  rounded-l space-x-2 mb-4">
                        <img src={select_multiple} alt="select_multiple" className="inline-block w-8"/>
                        <span>Vybrat více</span>
                    </div>
                    <div className=" w-full flex items-center  rounded-l space-x-2 mb-4">
                        <img src={select_line} alt="select_line" className="inline-block w-7"/>
                        <span>Vybrat malbou</span>
                    </div>
                </div>
            </div>

            <div>
                <h1 className={"text-xl"}>Vrstvy</h1>
                <div className=" pt-4 w-full rounded-l">
                    <div className="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label className="ml-2 text-sm font-medium">Přestupeky</label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label className="ml-2 text-sm font-medium">Vraždy</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
