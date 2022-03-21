import Column from 'components/column/Column'
import React from 'react'

import './BoardContent.scss'

const BoardContent = () => {
    return (
        <div className='board-cols'>
            <Column />
            <Column />
            <Column />
        </div>
    )
}

export default BoardContent