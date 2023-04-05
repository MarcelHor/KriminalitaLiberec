import React, {useEffect} from 'react';

const NestedTypes = ({ data }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const hasChildren = Array.isArray(data.children) && data.children.length > 0;

    return (
        <div>
            <div onClick={toggleOpen}>
                {hasChildren && <span>{isOpen ? '👇' : '👉'}</span>}
                {data.name}
            </div>
            {isOpen && hasChildren && (
                <ul>

                    {data.children.map((child) => (
                        <li key={child.name}>
                            <NestedTypes data={child} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default NestedTypes;
