import React from 'react'
import './Card.css'

const Cards = function (props) {
    console.log(props)
    const [isFront, changeFace] = React.useState(true);
    let key = props.front


    function handleClick() {
        changeFace( oldValue => !oldValue )
    }

    const frontClass = "front " + (isFront? "": "hidden");
    const backClass = "back " + (isFront? "hidden": "");
    return(
        <>
            <div className = "flashCard" key = {key} onClick = {handleClick}>
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
