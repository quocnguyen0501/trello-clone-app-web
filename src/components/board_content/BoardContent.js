import { useEffect, useRef, useState } from 'react'
import { isEmpty } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'
import {
    Container as BootstrapContainer,
    Col,
    Row,
    Form,
    Button
} from 'react-bootstrap'

import { initialData } from 'actions/InitialData'
import Column from 'components/column/Column'
import { mapOrder } from 'utilities/Sorts'
import { applyDrag } from 'utilities/DragDrop'

import './BoardContent.scss'

const BoardContent = () => {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);
    const [openNewComlumnForm, setOpenNewColumnForm] = useState(false);
    const [newColumnTitle, setNewColumnTitle] = useState('');

    const newColumnInputRef = useRef(null)

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

    useEffect(() => {
        if (newColumnInputRef && newColumnInputRef.current) {
            // focus: Hiện trủ chuột
            newColumnInputRef.current.focus();
            // Bôi đen value có trong ô input
            newColumnInputRef.current.select();
        }
    }, [openNewComlumnForm])

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

    const toggleOpenAddNewColumnForm = () => {
        setOpenNewColumnForm(!openNewComlumnForm);
    }

    const addNewColumn = () => {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus();
        } else {
            const newColumnToAdd = {
                id: Math.random().toString(36).substring(2, 5),
                boardId: board.id,
                title: newColumnTitle.trim(),
                cardOrder: [],
                cards: []
            }

            let newColumns = [...columns, newColumnToAdd];

            let newBoard = { ...board };
            newBoard.columnOrder = newColumns.map(col => col.id);
            newBoard.columns = newColumns;

            setColumns(newColumns);
            setBoard(newBoard);
            setNewColumnTitle('');
            toggleOpenAddNewColumnForm();
        }
    }

    const onUpdateColumn = (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate.id;

        let newColumns = [...columns];
        const columnIndexToUpdate = newColumns.findIndex((i) => i.id === columnIdToUpdate)
        console.log(columnIdToUpdate);

        if (newColumnToUpdate._destroy) {
            // remove column
            newColumns.splice(columnIndexToUpdate, 1);
        } else {
            // update column info
            newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate);
        }

        // update board
        let newBoard = { ...board };
        newBoard.columnOrder = newColumns.map(col => col.id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    }

    const handleNewColumnTitleChange = (event) => {
        setNewColumnTitle(event.target.value)
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
                            onUpdateColumn={onUpdateColumn}
                        />
                    </Draggable>
                ))}
            </Container>
            <BootstrapContainer className='trello-container'>
                {!openNewComlumnForm ?
                    <Row>
                        <Col className='add-new-column'
                            onClick={toggleOpenAddNewColumnForm}>
                            <i className='fa fa-plus icon' />
                            <span>
                                Add another column
                            </span>
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col className='enter-new-column'>
                            <Form.Control size='sm'
                                type='text'
                                placeholder='Enter column title...'
                                className='input-enter-new-column'
                                ref={newColumnInputRef}
                                value={newColumnTitle}
                                onChange={(event) => handleNewColumnTitleChange(event)}
                                onKeyDown={(event) => (event.key === 'Enter') && addNewColumn()}
                            />
                            <Button size='sm'
                                variant="success"
                                onClick={addNewColumn}>
                                Add column
                            </Button>
                            <span className='cancle-new-col'
                                onClick={toggleOpenAddNewColumnForm}>
                                <svg width="40" height="40" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 300 287C 303 287 306 289 309 291C 309 291 500 482 500 482C 500 482 691 291 691 291C 693 289 697 287 700 287C 705 287 710 290 712 295C 714 300 713 305 709 309C 709 309 518 500 518 500C 518 500 709 691 709 691C 712 694 713 699 712 703C 711 708 708 711 703 712C 699 713 694 712 691 709C 691 709 500 518 500 518C 500 518 309 709 309 709C 306 712 301 713 297 712C 292 711 289 708 288 703C 287 699 288 694 291 691C 291 691 482 500 482 500C 482 500 291 309 291 309C 288 305 286 300 288 295C 290 290 295 287 300 287C 300 287 300 287 300 287" /></svg>
                            </span>
                        </Col>
                    </Row>

                }
            </BootstrapContainer>
        </div>
    )
}

export default BoardContent