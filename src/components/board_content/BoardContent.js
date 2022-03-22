import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'

import { initialData } from 'actions/InitialData'
import Column from 'components/column/Column'
import { mapOrder } from 'utilities/Sorts'

import './BoardContent.scss'

const BoardContent = () => {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const boardFromDB = initialData.boards.find(board => board.id === 'board-1');

        if (boardFromDB) {
            setBoard(boardFromDB)

            // Sort Column
            // boardFromDB.columns.sort((a, b) => {
            //     return boardFromDB.columnOrder.indexOf(a.id) - boardFromDB.columnOrder.indexOf(b.id);
            // })

            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
        }
    }, []);

    if (isEmpty(board)) {
        return (
            <>
                <div className='not-found'>Board Not Found</div>
            </>
        );
    }


    return (
        <div className='board-cols'>
            {columns.map((column, index) => <Column key={index} column={column} />)}
        </div>
    )
}

export default BoardContent