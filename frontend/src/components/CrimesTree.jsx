import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import React, {useEffect, useState} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import axios from "axios";

export const CrimesTree = (props) => {
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [types, setTypes] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3000/api/types/nested')
            .then((response) => {
                setTypes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    useEffect(() => {
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
    }, [types]);


    const onCheck = (checked, targetNode) => {
        if (targetNode.isChild) {
            //remove itself from checked
            const index = checked.indexOf(targetNode.value);
            if (index > -1) {
                checked.splice(index, 1);
            }
            //add parent to checked
            checked.push(targetNode.parent.value);
            props.setSelected(checked);
            setChecked(checked);
        } else if (targetNode.isParent) {
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
        expandClose: null,
        expandOpen: null,
        expandAll: null,
        collapseAll: null,
        parentClose: null,
        parentOpen: null,
        leaf: null,
    };

    return (<>
        <h2 className={"text-lg"}>Typy</h2>
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
            checkModel={'all'}
        />
    </>);
};
