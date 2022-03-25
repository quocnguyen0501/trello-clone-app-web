import './Column.scss'

import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap';

import Card from 'components/card/Card'
import { mapOrder } from 'utilities/Sorts';
import ConfirmModal from 'components/common/ConfirmModal';
import { useEffect, useState } from 'react';

import { MODAL_ACTION_CONFIRM } from 'utilities/Constants';
import { selectAllInlineText, saveContentAfterPressEnter } from 'utilities/ContentEditable';

const Column = (props) => {
    const column = props.column;
    const onCardDrop = props.onCardDrop;
    const onUpdateColumn = props.onUpdateColumn;

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const toggleShowConfirmModal = () => (setShowConfirmModal(!showConfirmModal));

    const [columnTitle, setColumnTitle] = useState('');

    useEffect(() => {
        setColumnTitle(column.title);
    }, [column.title])

    const cards = mapOrder(column.cards, column.cardOrder, 'id');

    const onConfirmModalAction = (action) => {
        console.log(action);
        if (action === MODAL_ACTION_CONFIRM) {
            const newColumn = {
                ...column,
                _destroy: true
            }
            onUpdateColumn(newColumn);
        }
        toggleShowConfirmModal();
    }

    const handleColumnTitleChange = (event) => {
        setColumnTitle(event.target.value)
    }

    const handleColumnTitleBlur = () => {
        const newColumn = {
            ...column,
            title: columnTitle
        }
        onUpdateColumn(newColumn);
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
                            <Dropdown.Item>Add Card...</Dropdown.Item>
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
                    onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
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
            </div>
            <footer>
                <div className='footer-actions'>
                    <i className='fa fa-plus icon' />
                    <span>
                        Add another card
                    </span>
                </div>
            </footer>
            <ConfirmModal show={showConfirmModal}
                onAction={onConfirmModalAction}
                title={'Remove column'}
                content={`Are you sure you want to remove <strong>${columnTitle}</strong>! <br/> All related cards will also be removed`} />
        </div>
    )
}

export default Column