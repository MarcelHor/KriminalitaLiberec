import React from 'react';
import right_arrow from '../assets/right_arrow.svg';
import {CATEGORY_COLORS} from "../js/colors.js";

const NestedTypes = ({data}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const hasChildren = Array.isArray(data.children) && data.children.length > 0;
    const noChildren = !hasChildren;

    return (
        <div className="text-sm lowercase">
            <div className="py-1 space-x-2 flex items-center">
                {hasChildren && (
                    <span
                        className="inline-block w-4 h-4 rounded-full"
                        style={{backgroundColor: CATEGORY_COLORS[data.name]}}
                    />
                )}
                {hasChildren && (
                    <img
                        onClick={toggleOpen}
                        src={right_arrow}
                        alt="right_arrow"
                        className="inline-block w-6 hover:cursor-pointer hover:bg-gray-300 rounded-full transition-transform duration-200 ease-in-out"
                        style={{transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}}
                    />
                )}
                <input type="checkbox" defaultChecked={true}/>
                <span>{data.name}</span>
            </div>

            {isOpen && hasChildren && (
                <ul className="ml-6">
                    {data.children.map((child) => (
                        <li key={child.name} className="py-0.5">
                            <NestedTypes data={child}/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NestedTypes;
