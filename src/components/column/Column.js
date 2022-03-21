import Task from 'components/task/Task'
import React from 'react'

import './Column.scss'

const Column = () => {
    return (
        <div className='board-col'>
            <header>Brainstorm</header>
            <ul className='task-list'>
                <Task />
                {/* <li>
                    dasdadasasdadad
                </li>
                <li>
                    dasdadasasdadad
                </li>
                <li>
                    dasdadasasdadad
                </li>
                <li>
                    dasdadasasdadad
                </li>
                <li>
                    dasdadasasdadad
                </li>
                <li>
                    dasdadasasdadad
                </li>
                <li>
                    dasdadasasdadad
                </li>
                <li>
                    dasdadasasdadad
                </li>
                <li>
                    dasdadasasdadad
                </li><li>
                    dasdadasasdadad
                </li> */}
            </ul>
            <footer>Add another card</footer>
        </div>
    )
}

export default Column