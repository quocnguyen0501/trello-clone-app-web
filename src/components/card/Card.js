import './Card.scss'

const Task = (props) => {
    const card = props.card;
    return (
        <div className='card-item'>
            {card.cover &&
                <img className='card-cover'
                    src={card.cover}
                    alt='quocnguyen-alt-img'
                    // Xử lý khi ấn chuột xuống
                    onMouseDown={e => e.preventDefault()}
                />
            }
            {card.title}
        </div>
    )
}

export default Task