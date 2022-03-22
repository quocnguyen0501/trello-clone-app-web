import React from 'react'

import './Column.scss'

import Card from 'components/card/Card'
import { mapOrder } from 'utilities/Sorts';

const Column = (props) => {
    const col = props.column;
    const cards = mapOrder(col.cards, col.cardOrder, 'id');
    console.log(cards);
    return (
        <div className='board-col'>
            <header>{col.title}</header>
            <ul className='card-list'>
                {cards.map((card, index) => <Card key={index} card={ card }/>)}
            </ul>
            <footer>Add another card</footer>
        </div>
    )
}

export default Column