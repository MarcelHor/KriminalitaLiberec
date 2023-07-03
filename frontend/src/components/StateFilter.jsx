import React, {useEffect, useState} from "react";
import axios from "axios";
import CheckboxTree from "react-checkbox-tree";

const StateFilter = (props) => {
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
                setChecked(flatStates.map((state) => state.value));
                props.setSelectedStates(flatStates.map((state) => state.value));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setChecked(props.selectedStates);
    }, [props.selectedStates]);

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
        if (Object.keys(topLevel).length > 0) {
            const updatedStates = states.map((node) => {
                return {
                    ...node,
                    label: (<div className={"flex items-center justify-between p-1 w-72 border-b border-gray-200"}>
                            <span className="inline-block overflow-hidden flex-1"
                                  style={{maxWidth: "10rem"}}>{topLevel[node.value]}</span>
                        <span
                            className="inline-block text-center">{props.stateCount[node.value] ? props.stateCount[node.value] : 0}</span>
                    </div>),
                };
            });
            setStates(updatedStates);
        }
    }, [props.stateCount, topLevel]);


    return (<>
        <h2 className={"text-lg mb-2"}>Stav objasnění</h2>
        <div className={"flex flex-col items-center"}>
            <CheckboxTree nodes={states} checked={checked} onCheck={handleStateCheckboxChange} expanded={expanded}
                          nativeCheckboxes={true} icons={customIcons} showNodeIcon={false}/>
        </div>
    </>);
}

export default StateFilter;