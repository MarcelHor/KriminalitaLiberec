import React, {useEffect, useState} from "react";
import axios from "axios";
import CheckboxTree from "react-checkbox-tree";
import {CATEGORY_COLORS} from "../js/colors.js";

export const StateFilter = (props) => {
    const [states, setStates] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checked, setChecked] = useState([]);
    const [topLevel, setTopLevel] = useState([]);

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
                const topLevel = {};
                flatStates.forEach((node) => {
                    topLevel[node.value] = node.label;
                });
                setTopLevel(topLevel);
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

    useEffect(() => {
        states.forEach((node) => {
            node.label = <div className={"flex items-center justify-between w-72"}>
                <span className={"inline-block w-4 h-4"}>&nbsp;</span>
                <span className="inline-block max-w-xs overflow-hidden flex-1"
                      style={{maxWidth: "10rem"}}>{topLevel[node.value]}</span>
                <span className="inline-block w-6 text-center">
                        {props.stateCount[node.value] ? props.stateCount[node.value] : 0}</span>
            </div>;
        });
    }, [states, props.stateCount]);

    return (<>
        <h2 className={"text-lg"}>Stav objasnění</h2>
        <CheckboxTree nodes={states} checked={checked} onCheck={handleStateCheckboxChange} expanded={expanded}
                      nativeCheckboxes={true} icons={customIcons} showNodeIcon={false}/>
    </>);
}