import './App.scss';
import AppBar from 'components/app_bar/AppBar';
import BoardBar from 'components/board_bar/BoardBar';
import BoardContent from 'components/board_content/BoardContent';

function App() {
    return (
        <div className="app-master">
            <AppBar />
            <BoardBar />
            <BoardContent/>
        </div>
    );
}

export default App;
