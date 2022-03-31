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

import { createNewColumn, fetchBoardDetail, updateBoard, updateCard, updateColumn } from 'actions/APIs'
import Column from 'components/column/Column'
import { mapOrder } from 'utilities/Sorts'
import { applyDrag } from 'utilities/DragDrop'

import './BoardContent.scss'
import cloneDeep from 'lodash/cloneDeep'

const BoardContent = () => {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    const [openNewComlumnForm, setOpenNewColumnForm] = useState(false);
    const toggleOpenAddNewColumnForm = () => {
        setOpenNewColumnForm(!openNewComlumnForm);
    }

    const newColumnInputRef = useRef(null);

    const [newColumnTitle, setNewColumnTitle] = useState('');

    const handleNewColumnTitleChange = (event) => {
        setNewColumnTitle(event.target.value)
    }

    useEffect(() => {
        const boardId = '6241795b98044585b51fe6b4'
        fetchBoardDetail(boardId)
            .then((boardFromDB) => {
                setBoard(boardFromDB)

                // Sort Column ----> mapOrder
                // boardFromDB.columns.sort((a, b) => {
                //     return boardFromDB.columnOrder.indexOf(a._id) - boardFromDB.columnOrder.indexOf(b._id);
                // })
                setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, '_id'))
            });
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

    // Update Board
    /**
     *
     * @param {parameter of smooth dnd} dropResult : return index of item addIndex and remove index
     */
    const onColumnDrop = (dropResult) => {
        /**
         * @param {field of dropResult} addedIndex : the new index after change when drag drop
         * @param {field of dropResult} removedIndex : the old index after change when drag drop
         */
        const addedIndex = dropResult.addedIndex;
        const removedIndex = dropResult.removedIndex;

        // Check if have a new change -> call API
        if (addedIndex !== removedIndex) {
            let newColumns = cloneDeep(columns);

            // handle swap 2 columns
            newColumns = applyDrag(newColumns, dropResult);

            let newBoard = cloneDeep(board);
            newBoard.columnOrder = newColumns.map(col => col._id);
            newBoard.columns = newColumns;

            // when deploy in real server have waste time -> lag
            // set Board and Column before call API the UI will smooth
            setBoard(newBoard);
            setColumns(newColumns);

            // Call API update columnOrder in BoardDetail
            updateBoard(newBoard._id, newBoard)
                // If when call APIs have error -> log error
                .catch((error) => {
                    // make a popup
                    console.log(error.message);

                    setBoard(board);
                    setColumns(columns);
                })
        }
    }

    const onCardDrop = (columnId, dropResult) => {
        /**
         * @param {field of dropResult} addedIndex : the new index after change when drag drop
         * @param {field of dropResult} removedIndex : the old index after change when drag drop
         */
        const addedIndex = dropResult.addedIndex;
        const removedIndex = dropResult.removedIndex;

        // Điều kiện để xử lý các cols có sự thay đổi
        if (addedIndex !== removedIndex) {
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
                let newColumns = cloneDeep(columns);

                // Tìm cột có id đã xảy ra sự thay đổi
                let columnHasChangeOccurred = newColumns.find((col) => col._id === columnId);

                columnHasChangeOccurred.cards = applyDrag(columnHasChangeOccurred.cards, dropResult);
                columnHasChangeOccurred.cardOrder = columnHasChangeOccurred.cards.map(card => { return card._id });

                // Set column for smooth UI in screen client after that call API
                setColumns(newColumns);

                updateColumn(columnHasChangeOccurred._id, columnHasChangeOccurred)
                    .catch((error) => {
                        // If when call APIs have error -> log error
                        console.log(error.message);
                        setColumns(columns);
                    })

                // Actions: move card inside column
                if (removedIndex === null || addedIndex === null) {
                    if (dropResult.addedIndex !== null) {
                        let cardDrop = cloneDeep(dropResult.payload);
                        cardDrop.columnId = columnHasChangeOccurred._id;
                        // Call API update columnId in column has change occurred
                        updateCard(cardDrop._id, cardDrop)
                            .catch((error) => {
                                console.log(error.message);
                            })
                    }
                }
            }
        }
    }

    const addNewColumn = () => {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus();
        } else {
            const newColumnToAdd = {
                boardId: board._id,
                title: newColumnTitle.trim()
            }

            createNewColumn(newColumnToAdd)
                .then((column) => {
                    let newColumns = [...columns, column];

                    let newBoard = { ...board };
                    newBoard.columnOrder = newColumns.map(col => col._id);
                    newBoard.columns = newColumns;

                    setColumns(newColumns);
                    setBoard(newBoard);
                    setNewColumnTitle('');
                    toggleOpenAddNewColumnForm();
                })
        }
    }

    const onUpdateColumnState = (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate._id;

        let newColumns = [...columns];
        const columnIndexToUpdate = newColumns.findIndex((i) => i._id === columnIdToUpdate);

        if (newColumnToUpdate._destroy) {
            // remove column
            newColumns.splice(columnIndexToUpdate, 1);
        } else {
            // update column info
            newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate);
        }

        // update board
        let newBoard = { ...board };
        newBoard.columnOrder = newColumns.map(col => col._id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
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
                            onUpdateColumnState={onUpdateColumnState}
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
                            <span className='cancle-icon'
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