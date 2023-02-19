import select_arrow from "../assets/select_arrow.svg";
import select_multiple from "../assets/select_multiple.svg";
import select_line from "../assets/select_line.svg";


export default function LeftSidebar() {
    return (
        <div className="bg-zinc-600 p-4 text-white w-1/4 h-full grid grid-cols-1 gap-y-2 justify-items-center" style={{gridTemplateRows: '0.2fr 0.3fr 0.3fr 0.3fr 0.2fr 2fr'}}>
            <h1 className={"text-xl"}>Nástroje</h1>
            <div className="bg-zinc-700 w-full flex items-center justify-center text-center">
                <img src={select_arrow} alt="select_arrow" className="inline-block w-8"/>
                <span>Vybrat</span>
            </div>
            <div className="bg-zinc-700 w-full flex items-center justify-center text-center">
                <img src={select_multiple} alt="select_multiple" className="inline-block w-8"/>
                <span>Vybrat více</span>
            </div>
            <div className="bg-zinc-700 w-full flex items-center justify-center text-center">
                <img src={select_line} alt="select_line" className="inline-block w-8"/>
                <span>Vybrat malbou</span>
            </div>
            <h1 className={"text-xl"}>Vrstvy</h1>
            <div className="bg-zinc-700 p-6 w-full">
                <div className="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Přestupeky</label>
                </div>
                <div className="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vraždy</label>
                </div>
            </div>
        </div>
    )
}
