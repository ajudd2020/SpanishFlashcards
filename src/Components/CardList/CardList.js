import React from 'react';
import './CardList.css'
import CardData from '../CardData/CardData'

export default function CardList (props) {
    return (
        <>
            <div className="cardContainer">
                {props.cardData.map( CardData )}
            </div>
        </>
    )
}
