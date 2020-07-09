import React from 'react';
import "./Menu.css"

export default function Menu (props) {
    const handleClick = (e, selectedPage) => {
        e.preventDefault();
        props.changePage(selectedPage);
    };

    return(
        <nav>
            <button className="MenuButton" onClick={e=> handleClick(e, "app")}>Flash Cards</button>
            <button className="MenuButton" onClick={e =>handleClick(e, "contact")}>Contact</button>
        </nav>
    )
}