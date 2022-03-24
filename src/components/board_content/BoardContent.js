import { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'

import { initialData } from 'actions/InitialData'
import Column from 'components/column/Column'
import { mapOrder } from 'utilities/Sorts'
import { applyDrag } from 'utilities/DragDrop'

import './BoardContent.scss'

const BoardContent = () => {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const boardFromDB = initialData.boards.find(board => board.id === 'board-1');

        if (boardFromDB) {
            setBoard(boardFromDB)

            // Sort Column ----> mapOrder
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

    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns];
        newColumns = applyDrag(newColumns, dropResult);

        let newBoard = { ...board };
        newBoard.columnOrder = newColumns.map(col => col.id);
        newBoard.columns = newColumns;

        setBoard(newBoard);
        setColumns(newColumns);
    }

    const onCardDrop = (columnId, dropResult) => {
        // Điều kiện để xử lý các cols có sự thay đổi
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns];
            console.log('NEW COLS BEFORE:', newColumns);

            // Tìm cột có id đã xảy ra sự thay đổi
            let columnHasChangeOccurred = newColumns.find((col) => col.id === columnId);

            columnHasChangeOccurred.cards = applyDrag(columnHasChangeOccurred.cards, dropResult);
            columnHasChangeOccurred.cardOrder = columnHasChangeOccurred.cards.map(card => { return card.id })

            setColumns(newColumns);
        }
    }

    return (
        <div className='board-cols'>
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >
                {columns.map((column, index) => (
                    <Draggable key={index}>
                        <Column column={column}
                            onCardDrop={onCardDrop}
                        />
                    </Draggable>
                ))}
            </Container>
        </div>
    )
}

export default BoardContent