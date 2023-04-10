import React, {useEffect, useState} from "react";
import axios from "axios";

export const StateFilter = (props) => {
    const [states, setStates] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/states')
            .then((response) => {
                setStates(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleStateCheckboxChange = (event) => {
        const id = parseInt(event.target.id)
        props.setSelectedStates((prev) => {
            if (event.target.checked) {
                return prev.filter((state) => state !== id);

            } else {
                return [...prev, id];
            }
        });
    };

    return (<>
        <h2 className={"text-lg"}>Stav objasnění</h2>
        <div className={"flex flex-col space-y-2 p-4"}>
            {states.map((item) => (
                <div key={item.id}>
                    <label htmlFor={item.id} className={"hover:bg-gray-100 p-2 "}>
                        <input defaultChecked={true} type="checkbox" id={item.id} onChange={handleStateCheckboxChange} />
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    </>);
}