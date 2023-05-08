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
        console.log(targetNode);
        if (targetNode.isChild) {
            // remove itself from checked
            const index = checked.indexOf(targetNode.value);
            if (index > -1) {
                checked.splice(index, 1);
            }
            // add parent to checked
            checked.push(targetNode.parent.value);
            props.setSelected(checked);
            setChecked(checked);
        } else if (targetNode.isParent) {
            setChecked(checked);
            props.setSelected(checked);
        }
        else if(!targetNode.isChild && !targetNode.isParent ){
            setChecked(checked);
            props.setSelected(checked);
        }
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
                    ...node, label: (<div className={"flex items-center justify-between w-72"}>
                      <span
                          style={{backgroundColor: CATEGORY_COLORS[node.value]}}
                          className={"inline-block w-4 h-4 ml-4 rounded-full"}>&nbsp;</span>
                        <span
                            className="inline-block max-w-xs overflow-hidden flex-1"
                            style={{maxWidth: "10rem"}}
                        >
            {topLevel[node.value]}
          </span>
                        <span className="inline-block w-6 text-center">
            {props.count[node.value] ? props.count[node.value] : 0}
          </span>
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
