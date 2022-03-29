import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap'

import './AppBar.scss'
import trelloAppLogo from '../../resources/trello-icons/icons8-trello-240.png'

const AppBar = () => {
    return (
        <nav className='navbar__app'>
            <Container className='trello-container'>
                <Row>
                    {/* LEFT APP BAR */}
                    <Col sm={5} xs={12} className='col-no-padding'>
                        <div className='app-actions'>
                            <div className='item all'>
                                <i className='fa fa-th' />
                            </div>
                            <div className='item home'>
                                <i className='fa fa-home' />
                            </div>
                            <div className='item boards'>
                                <i className='fa fa-columns' />
                                &nbsp;&nbsp;
                                Board
                            </div>
                            <div className='item search'>
                                <InputGroup className='group-search'>
                                    <FormControl className='input-search' placeholder='Jump to...' />
                                    <InputGroup.Text className='input-icon-search'>
                                        <i className='fa fa-search' />
                                    </InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>
                    </Col>
                    {/* MIDDLE APP BAR */}
                    <Col sm={2} xs={12} className='col-no-padding'>
                        <div className='app-brading text-center'>
                            <a href='/' target="blank">
                                <img src={trelloAppLogo} className='top-logo' alt='trello-logo' />
                                <span className='trello-slogan'>Trello</span>
                            </a>
                        </div>
                    </Col>
                    <Col sm={5} xs={12} className='col-no-padding'>
                        <div className='user-actions'>
                            <div className='item quick'>
                                <i className='fa fa-plus-square-o' />
                            </div>
                            <div className='item news'>
                                <i className='fa fa-info-circle' />
                            </div>
                            <div className='item notification'>
                                <i className='fa fa-bell-o' />
                            </div>
                            <div className='item user-avatar'>
                                <img src='https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.6435-9/46357855_2721085164783709_3687570366709891072_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=S7c8eQGqZi8AX_jdAJq&_nc_ht=scontent.fsgn3-1.fna&oh=00_AT-32j__zeKAY8Ns0I4dZgyySwpz6J2DzZruWC1d4qUfjw&oe=625E4FB1'
                                    alt='avatar' title='avatar'
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </nav>
    )
}

export default AppBar