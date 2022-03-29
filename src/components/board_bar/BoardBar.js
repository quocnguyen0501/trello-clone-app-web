import { Col, Container, Row } from 'react-bootstrap'
import './BoardBar.scss'

const BoardBar = () => {
    return (
        <nav className='navbar__board'>
            <Container className='trello-container'>
                <Row>
                    <Col sm={10} xs={12} className='col-no-padding'>
                        <div className='board-info'>
                            <div className='item board-logo-icon'>
                                <i className='fa fa-coffee' />
                                &nbsp;&nbsp;
                                <strong>Trello Project MERN Stack</strong>
                            </div>
                            <div className='divider'></div>

                            <div className='item board-type'>
                                Private Workspace
                            </div>
                            <div className='divider'></div>

                            <div className='item member-avatar'>
                                <img src='https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/46357855_2721085164783709_3687570366709891072_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=S7c8eQGqZi8AX_jdAJq&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT-32j__zeKAY8Ns0I4dZgyySwpz6J2DzZruWC1d4qUfjw&oe=625E4FB1'
                                    alt='avatar' title='avatar'
                                />
                                <img src='https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/46357855_2721085164783709_3687570366709891072_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=S7c8eQGqZi8AX_jdAJq&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT-32j__zeKAY8Ns0I4dZgyySwpz6J2DzZruWC1d4qUfjw&oe=625E4FB1'
                                    alt='avatar' title='avatar'
                                />
                                <img src='https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/46357855_2721085164783709_3687570366709891072_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=S7c8eQGqZi8AX_jdAJq&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT-32j__zeKAY8Ns0I4dZgyySwpz6J2DzZruWC1d4qUfjw&oe=625E4FB1'
                                    alt='avatar' title='avatar'
                                />
                                <img src='https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/46357855_2721085164783709_3687570366709891072_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=S7c8eQGqZi8AX_jdAJq&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT-32j__zeKAY8Ns0I4dZgyySwpz6J2DzZruWC1d4qUfjw&oe=625E4FB1'
                                    alt='avatar' title='avatar'
                                />
                                <img src='https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/46357855_2721085164783709_3687570366709891072_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=S7c8eQGqZi8AX_jdAJq&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT-32j__zeKAY8Ns0I4dZgyySwpz6J2DzZruWC1d4qUfjw&oe=625E4FB1'
                                    alt='avatar' title='avatar'
                                />
                                <img src='https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/46357855_2721085164783709_3687570366709891072_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=S7c8eQGqZi8AX_jdAJq&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT-32j__zeKAY8Ns0I4dZgyySwpz6J2DzZruWC1d4qUfjw&oe=625E4FB1'
                                    alt='avatar' title='avatar'
                                />
                                <span className='more-members'>+7</span>
                                <span className='invite'>Invite</span>
                            </div>
                        </div>
                    </Col>
                    <Col sm={2} xs={12} className='col-no-padding'>
                        <div className='board-actions'>
                            <div className='item menu'>
                                Show Menu
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </nav>
    )
}

export default BoardBar