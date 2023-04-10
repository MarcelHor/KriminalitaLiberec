import React, {useEffect, useState} from "react";
import axios from "axios";
import CheckboxTree from "react-checkbox-tree";

export const StateFilter = (props) => {
    const [states, setStates] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checked, setChecked] = useState([]);

    const customIcons = {
        check: null,
        uncheck: null,
        halfCheck: null,
        expandClose: null,
        expandOpen: null,
        expandAll: null,
        collapseAll: null,
        parentClose: null,
        parentOpen: null,
        leaf: null,
    };

    useEffect(() => {
        axios.get('http://localhost:3000/api/states')
            .then((response) => {
                //transform the nested response into checkbox tree format
                const flatStates = response.data.map((state) => {
                    return {
                        value: state.id, label: state.label, children: {}
                    }
                });
                setStates(flatStates);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    useEffect(() => {
        // set initial state of checked checkboxes to true
        setChecked(states.map((state) => state.value));
    }, [states]);

    const handleStateCheckboxChange = (checked, targetNode) => {
        const id = targetNode.value;
        props.setSelectedStates((prev) => {
            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
        setChecked(checked);
    };


    return (<>
        <h2 className={"text-lg"}>Stav objasnění</h2>
        <CheckboxTree nodes={states} checked={checked} onCheck={handleStateCheckboxChange} expanded={expanded}
                      nativeCheckboxes={true} icons={customIcons} showNodeIcon={false}/>
    </>);
}