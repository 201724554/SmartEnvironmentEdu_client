import { Route, Routes } from 'react-router-dom';
import './App.css';
import Test from './Test.js'
function App() {

    return(
        <div>
            <Routes>
                <Route path='test' exact={true} element={<Test/>}/>
            </Routes>
        </div>
    );
}

export default App;
