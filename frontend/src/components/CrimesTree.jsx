import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import React, {useEffect, useState} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import axios from "axios";
import rightArrow from "../assets/right_arrow.svg";
import {CATEGORY_COLORS} from "../js/colors.js";

export const CrimesTree = (props) => {
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [types, setTypes] = useState([]);
    const [topLevel, setTopLevel] = useState([]);
    const [topLevelUnchecked, setTopLevelUnchecked] = useState([]);

    const convertEmptyChildrenToObject = (nodes) => {
        nodes.forEach((node) => {
            if (node.children.length === 0) {
                node.children = {};
            } else {
                convertEmptyChildrenToObject(node.children);
            }
        });
    };


    useEffect(() => {
        axios.get('http://localhost:3000/api/types/nested')
            .then((response) => {
                const types = response.data;
                convertEmptyChildrenToObject(types);
                setTypes(types);
                const topLevel = {};
                types.forEach((node) => {
                    topLevel[node.value] = node.label;
                });
                setTopLevel(topLevel);
                const checked = [];
                const traverse = (nodes) => {
                    for (let i = 0; i < nodes.length; i++) {
                        if (nodes[i].value) {
                            checked.push(nodes[i].value);
                        }
                        if (nodes[i].children) {
                            traverse(nodes[i].children);
                        }
                    }
                }
                traverse(types);
                setChecked(checked);
                props.setSelected(checked);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const onCheck = (checked, targetNode) => {
        if (targetNode.isChild) {
            const index = checked.indexOf(targetNode.parent.value);
            if (index > -1) {
                // remove parent from checked
                checked.splice(index, 1);
            }
            // If the child node is checked, add it to the checked array
            if (targetNode.checked) {
                checked.push(targetNode.value);
            } else {
                // If the child node is unchecked, remove it from the checked array
                const childIndex = checked.indexOf(targetNode.value);
                if (childIndex > -1) {
                    checked.splice(childIndex, 1);
                }
            }
        } else if (targetNode.isParent) {
            if (!targetNode.checked) {
                // If the parent node is unchecked, remove all its children from the checked array
                targetNode.children.forEach((child) => {
                    const childIndex = checked.indexOf(child.value);
                    if (childIndex > -1) {
                        checked.splice(childIndex, 1);
                    }
                });
            }
        }

        setChecked(checked);
        props.setSelected(checked);
        console.log(checked);
    };



    const onExpand = (expanded) => {
        setExpanded(expanded);
    };

    const customIcons = {
        check: null,
        uncheck: null,
        halfCheck: null,
        expandClose: <img src={rightArrow} alt="expand"/>,
        expandOpen: <img src={rightArrow} alt="expand" className={"rotate-90"}/>,
        expandAll: null,
        collapseAll: null,
        parentClose: null,
        parentOpen: null,
        leaf: null,
    };

    useEffect(() => {
        if (Object.keys(topLevel).length > 0) {

            const updatedStates = types.map((node) => {
                return {
                    ...node,
                    label: (<div className={"flex items-center justify-between p-1 w-72 border-b border-gray-200"}>
                            <span className="inline-block overflow-hidden flex-1"
                                  style={{maxWidth: "10rem"}}>{topLevel[node.value]}</span>
                        <span className="inline-block border-b-2"
                              style={{borderColor: CATEGORY_COLORS[node.value]}}>{props.count[node.value] ? props.count[node.value] : 0}</span>
                    </div>),
                };
            });
            setTypes(updatedStates);
        }
    }, [props.count, topLevel]);


    return (<>
        <h2 className="text-lg mb-2">Typy</h2>
        <div className={"lowercase"}>
            <CheckboxTree
                nodes={types}
                checked={checked}
                expanded={expanded}
                onCheck={onCheck}
                onExpand={onExpand}
                showNodeIcon={false}
                nativeCheckboxes={true}
                icons={customIcons}
                optimisticToggle={false}
                checkModel={"all"}
            />
        </div>
    </>);

};
