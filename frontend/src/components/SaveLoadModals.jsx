import {useEffect, useState} from "react";
import axios from "axios";
import PopupModal from "./PopupModal.jsx";


export const SaveLoadModals = (props) => {

    const [notification, setNotification] = useState({status: '', message: ''}); // add this line
    const [fetchedFilters, setFetchedFilters] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setNotification({status: '', message: ''});
        }, 5000);
        return () => clearTimeout(timer);
    }, [notification]);

    const getFilters = () => {
        axios.get('http://localhost:3000/api/filters').then((response) => {
            setFetchedFilters(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getFilters();
    }, []);


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const saveFilter = async (name, description) => {
        const filter = {
            name: name,
            description: description,
            timeRange: JSON.stringify(props.timeRange),
            selectedCrimes: JSON.stringify(props.selectedCrimes),
            selectedStates: JSON.stringify(props.selectedStates),
            dateRange: JSON.stringify(props.dateRange),
            heatMap: props.heatMap
        }

        axios.post('http://localhost:3000/api/filters', filter).then((response) => {
            if (response.status === 200) {
                getFilters();
                setNotification({status: 'success', message: 'Filter saved successfully!'});
            }
        }).catch((error) => {
            console.log(error);
            setNotification({status: 'error', message: 'Error saving filter!'});
        });
    }


    const loadFilter = (filter) => {
        props.setTimeRange(JSON.parse(filter.timeRange));
        props.setSelectedCrimes(JSON.parse(filter.selectedCrimes));
        props.setSelectedStates(JSON.parse(filter.selectedStates));
        const firstDate = new Date(JSON.parse(filter.dateRange)[0]);
        const secondDate = new Date(JSON.parse(filter.dateRange)[1]);
        props.setDateRange([firstDate, secondDate]);
        props.setHeatMap(filter.heatMap);
        setNotification({status: 'success', message: 'Filter loaded successfully!'});
    }

    const deleteFilter = async (id) => {
        axios.delete(`http://localhost:3000/api/filters/${id}`).then((response) => {
            if (response.status === 200) {
                getFilters();
                setNotification({status: 'success', message: 'Filter deleted successfully!'});
            }
        }).catch((error) => {
            console.log(error);
            setNotification({status: 'error', message: 'Error deleting filter!'});
        });
    }

    return (<>
        <PopupModal isPopupOpen={props.isSaveModalOpen} setisPopupOpen={props.setIsSaveModalOpen}>
            <div className={"flex flex-col items-center space-y-6"}>
                <h1 className={"text-3xl font-bold mb-4"}>Save Filter</h1>
                <div className="w-2/3">
                        <span htmlFor="filterName"
                              className="block text-sm font-medium text-gray-700">Filter Name</span>
                    <input type="text"
                           name="filterName"
                           id="filterName"
                           placeholder="Enter the filter name"
                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                           onChange={(e) => setName(e.target.value)}
                           required/>
                </div>
                <div className="w-2/3 h-40 my-2">
                    <span htmlFor="filterDescription" className="block text-sm font-medium text-gray-700">Filter
                        Description</span>
                    <textarea name="filterDescription"
                              id="filterDescription"
                              placeholder="Enter the filter description"
                              maxLength="200"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md resize-none h-full"
                              onChange={(e) => setDescription(e.target.value)}
                              required/>
                </div>
                <div className={"flex flex-row items-center justify-center w-2/3 space-x-2 pt-5"}>
                    <button
                        className={"bg-red-500 hover:bg-red-700 text-white rounded-md p-2 w-full transition duration-200 ease-in-out"}
                        onClick={() => props.setIsSaveModalOpen(false)}>Cancel
                    </button>
                    <button
                        className={"bg-green-500 hover:bg-green-700 text-white rounded-md p-2 w-full transition duration-200 ease-in-out"}
                        onClick={() => {
                            if (name.trim() && description.trim()) {
                                saveFilter(name, description);
                                props.setIsSaveModalOpen(false);
                            } else {
                                alert("Please fill out both fields.");
                            }
                        }}>Save
                    </button>
                </div>
            </div>
        </PopupModal>

        <PopupModal isPopupOpen={props.isLoadModalOpen} setisPopupOpen={props.setIsLoadModalOpen}>
            <h1 className={"text-2xl font-bold text-center mt-4"}>Načíst filtr</h1>
            <div className={"flex flex-col items-center h-full justify-center px-4 pb-8"}>
                <div className={"overflow-y-auto overflow-x-hidden w-full mt-4 mb-8 space-y-4"}>
                    {fetchedFilters.map((filter) => {
                        return (<div className={"flex flex-row justify-between bg-gray-100 p-4 rounded-md"}
                                     key={filter.id}>
                            <div className={"flex flex-col space-y-2 w-3/5 pr-6"}>
                                <span className={"font-bold text-md"}>{filter.name}</span>
                                <span
                                    className={"text-gray-700 text-sm break-words"}>{filter.description}</span>
                                <span className={"text-xs text-gray-500"}>{filter.created_at}</span>
                            </div>
                            <div className={"flex flex-col space-y-2 justify-end items-center"}>
                                <button
                                    className={"bg-green-500 hover:bg-green-700 text-white rounded-md w-24 h-10 transition duration-200 ease-in-out"}
                                    onClick={() => {
                                        loadFilter(filter);
                                        props.setIsLoadModalOpen(false);
                                    }}
                                >
                                    Načíst
                                </button>
                                <button
                                    className={"bg-red-500 hover:bg-red-700 text-white rounded-md w-24 h-10 transition duration-200 ease-in-out"}
                                    onClick={() => {
                                        if (window.confirm("Opravdu chcete smazat tento filtr?")) {
                                            deleteFilter(filter.id);
                                        }
                                    }}
                                >
                                    Smazat
                                </button>
                            </div>
                        </div>);
                    })}
                </div>
            </div>
        </PopupModal>

        <div className={`fixed left-5 bottom-5 p-4 rounded-md text-white ${notification.status === 'success' ? 'bg-green-500' : 'bg-red-500'} ${notification.message ? 'flex' : 'hidden'} transition duration-200 ease-in-out`}>
            <span>{notification.message}</span>
        </div>


    </>);
}