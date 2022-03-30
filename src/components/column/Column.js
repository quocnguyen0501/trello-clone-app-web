import './Column.scss'

import cloneDeep from 'lodash/cloneDeep';

import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap';

import Card from 'components/card/Card'
import { mapOrder } from 'utilities/Sorts';
import ConfirmModal from 'components/common/ConfirmModal';
import { useEffect, useRef, useState } from 'react';

import { MODAL_ACTION_CONFIRM } from 'utilities/Constants';
import { selectAllInlineText, saveContentAfterPressEnter } from 'utilities/ContentEditable';
import { createNewCard, updateColumn } from 'actions/APIs';

const Column = (props) => {
    const column = props.column;
    const onCardDrop = props.onCardDrop;
    const onUpdateColumnState = props.onUpdateColumnState;

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const toggleShowConfirmModal = () => (setShowConfirmModal(!showConfirmModal));

    const [columnTitle, setColumnTitle] = useState('');

    const [openNewCardForm, setOpenNewCardForm] = useState(false);
    const toggleOpenAddNewCardForm = () => {
        setOpenNewCardForm(!openNewCardForm);
    }

    const newCardTextareaRef = useRef(null);

    const [newCardTitle, setNewCardTitle] = useState('');

    const handleNewCardTitleChange = (event) => {
        setNewCardTitle(event.target.value)
    }

    useEffect(() => {
        setColumnTitle(column.title);
    }, [column.title])

    useEffect(() => {
        if (newCardTextareaRef && newCardTextareaRef.current) {
            // focus: Hiện trủ chuột
            newCardTextareaRef.current.focus();
            // Bôi đen value có trong ô input
            newCardTextareaRef.current.select();
        }
    }, [openNewCardForm])

    const cards = mapOrder(column.cards, column.cardOrder, '_id');

    // Update column title
    const handleColumnTitleBlur = () => {

        /**
         * @column.title: title of column from props
         * @columnTitle: title of column from state
         */
        console.log(column.title);
        console.log(columnTitle);

        if (column.title !== columnTitle) {
            const newColumn = {
                ...column,
                title: columnTitle
            }

            // Call API update column
            updateColumn(newColumn._id, newColumn)
                .then((updatedColumn) => {
                    updatedColumn.cards = newColumn.cards
                    onUpdateColumnState(updatedColumn);
                })
        }
    }

    // Remove column
    const onConfirmModalAction = (action) => {
        if (action === MODAL_ACTION_CONFIRM) {
            const newColumn = {
                ...column,
                _destroy: true
            }

            // Call API update column
            updateColumn(newColumn._id, newColumn)
                .then((updatedColumn) => {
                    onUpdateColumnState(updatedColumn);
                })
        }
        toggleShowConfirmModal();
    }

    const handleColumnTitleChange = (event) => {
        setColumnTitle(event.target.value)
    }

    const addNewCard = () => {
        if (!newCardTitle) {
            newCardTextareaRef.current.focus();
        } else {
            const newCardToAdd = {
                boardId: column.boardId,
                columnId: column._id,
                title: newCardTitle.trim()
            }
            createNewCard(newCardToAdd)
                .then((card) => {
                    let newColumn = cloneDeep(column)
                    newColumn.cards.push(card);
                    newColumn.cardOrder.push(card._id);

                    onUpdateColumnState(newColumn);

                    setNewCardTitle('');
                    toggleOpenAddNewCardForm();
                })
        }
    }

    return (
        <div className='board-col'>
            <header className='column-drag-handle'>
                <div className='column-title'>
                    {/* {column.title} */}
                    <Form.Control size='sm'
                        type='text'
                        placeholder='Enter column title...'
                        className='trello-content-editable'
                        value={columnTitle}
                        onChange={(event) => handleColumnTitleChange(event)}
                        // xu ly su kien khi click ra ngoai o input
                        onBlur={() => handleColumnTitleBlur()}
                        // Xu ly su kien khi nhan enter
                        onKeyDown={(event) => saveContentAfterPressEnter(event)}
                        onClick={selectAllInlineText}
                        // Xu ly su kien nhan chuot
                        onMouseDown={(event) => event.preventDefault()}
                        spellCheck='false'
                    />
                </div>
                <div className='column-dropdown-actions'>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic"
                            size='sm'
                            className='dropdown-btn' />

                        <Dropdown.Menu>
                            <div className='header-dropdown'>List Actions</div>
                            <hr style={{ 'margin': '0 7px' }} />
                            <Dropdown.Item onClick={toggleOpenAddNewCardForm}>Add Card...</Dropdown.Item>
                            <Dropdown.Item>Copy List...</Dropdown.Item>
                            <Dropdown.Item>Move List...</Dropdown.Item>
                            <Dropdown.Item>Watch</Dropdown.Item>
                            <hr style={{ 'margin': '0 7px' }} />
                            <Dropdown.Item>Sort By...</Dropdown.Item>
                            <hr style={{ 'margin': '0 7px' }} />
                            <Dropdown.Item>Move All Cards in This List...</Dropdown.Item>
                            <Dropdown.Item>Archive All Cards in This List...</Dropdown.Item>
                            <hr style={{ 'margin': '0 7px' }} />
                            <Dropdown.Item>Archive This List</Dropdown.Item>
                            <hr style={{ 'margin': '0 7px' }} />
                            <Dropdown.Item onClick={() => toggleShowConfirmModal()}>Remove This List</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
            <div className='card-list'>
                <Container
                    //Nếu không có thẻ này sẽ không thể kéo thả sang các cột khác vì không có chung 1 group name
                    orientation='vertical' // default
                    groupName="todo-columns"
                    onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
                    getChildPayload={index => cards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview'
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) => (
                        <Draggable key={index}>
                            <Card card={card} />
                        </Draggable>
                    ))}
                </Container>
                {openNewCardForm ?
                    <div className='add-new-card-area'>
                        <Form.Control size='sm'
                            as='textarea'
                            rows={3}
                            placeholder='Enter a title for this card...'
                            className='textarea-enter-new-card'
                            ref={newCardTextareaRef}
                            value={newCardTitle}
                            onChange={(event) => handleNewCardTitleChange(event)}
                        />
                        <Button size='sm'
                            variant="success"
                            onClick={() => addNewCard()}
                        >
                            Add column
                        </Button>
                        <span className='cancle-icon'
                            onClick={toggleOpenAddNewCardForm}
                        >
                            <svg width="40" height="40" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 300 287C 303 287 306 289 309 291C 309 291 500 482 500 482C 500 482 691 291 691 291C 693 289 697 287 700 287C 705 287 710 290 712 295C 714 300 713 305 709 309C 709 309 518 500 518 500C 518 500 709 691 709 691C 712 694 713 699 712 703C 711 708 708 711 703 712C 699 713 694 712 691 709C 691 709 500 518 500 518C 500 518 309 709 309 709C 306 712 301 713 297 712C 292 711 289 708 288 703C 287 699 288 694 291 691C 291 691 482 500 482 500C 482 500 291 309 291 309C 288 305 286 300 288 295C 290 290 295 287 300 287C 300 287 300 287 300 287" /></svg>
                        </span>
                    </div>
                    :
                    <footer>
                        <div className='footer-actions'
                            onClick={toggleOpenAddNewCardForm}>
                            <i className='fa fa-plus icon' />
                            <span>
                                Add another card
                            </span>
                        </div>
                    </footer>
                }
            </div>
            <ConfirmModal show={showConfirmModal}
                onAction={onConfirmModalAction}
                title={'Remove column'}
                content={`Are you sure you want to remove <strong>${columnTitle}</strong>! <br/> All related cards will also be removed`} />
        </div>
    )
}

export default Column