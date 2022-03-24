import './Column.scss'

import { Container, Draggable } from 'react-smooth-dnd'

import Card from 'components/card/Card'
import { mapOrder } from 'utilities/Sorts';

const Column = (props) => {
    const column = props.column;
    const cards = mapOrder(column.cards, column.cardOrder, 'id');

    const onCardDrop = (columnId, err) => {
        console.log('>>> Column ID: ', columnId, ' error: ', err);
    }
    return (
        <div className='board-col'>
            <header className='column-drag-handle'>{column.title}</header>
            <div className='card-list'>
                <Container
                    //Nếu không có thẻ này sẽ không thể kéo thả sang các cột khác vì không có chung 1 group name
                    orientation='vertical' // default
                    groupName="todo-columns"
                    onDrop={(e) => onCardDrop(column.id, e)}
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
            <footer>Add another card</footer>
        </div>
    )
}

export default Column