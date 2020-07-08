import React from 'react'
import Cards from '../Card/Card'

const CardData = function (props) {
    const front = [];
    const back = [];
    for (let i = 0; i<props.length; i++){
        if (i%2 === 0) {
            front.push(props[i])
        } else {
            back.push(props[i])
        }
    }

    return(
       <Cards front={front} back={back} key={front} />
    )
}

export default CardData