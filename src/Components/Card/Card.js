import React from 'react'
import './Card.css'

const Cards = function (props) {
    const [isFront, changeFace] = React.useState(true);

    function handleClick() {
        changeFace( Value => !Value )
    }

    const frontClass = "front " + (isFront? "": "hidden");
    const backClass = "back " + (isFront? "hidden": "");

    return(
        <>
            <div className = "flashCard" onClick = {handleClick}>
                <div className = {frontClass}>
                    <div>{props.front}</div>
                </div>
                <div className = {backClass}>
                    <div>{props.back}</div>
                </div>
            </div>
        </>
    )
}


export default Cards
