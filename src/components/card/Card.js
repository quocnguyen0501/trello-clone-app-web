import React from 'react'

import './Card.scss'

const Task = (props) => {
    const card = props.card;
    return (
        <li className='card-item'>
            {card.cover &&
                <img className='card-cover'
                    src={card.cover}
                    alt='quocnguyen-alt-img' />}
            {card.title}
        </li>
    )
}

export default Task