import './App.css';
import {Routes,Route} from "react-router-dom";
import RegisterForm from "./User/RegisterForm";
import HomePage from "./HomePage";



function App() {
    return(
        <>
            <Routes>
                <Route index element={<HomePage/>}/>
                {/*user*/}
                <Route path="/register" exact={true} element={<RegisterForm/>}/>
            </Routes>
        </>
    );
}

export default App;
