import './App.css';
import {Routes,Route} from "react-router-dom";
import RegisterForm from "./User/Register/RegisterForm";
import HomePage from "./HomePage";
import EducatorRegisterForm from "./User/Register/EducatorRegisterForm";
import UserAuthentication from "./User/Register/UserAuthentication";



function App() {
    return(
        <>
            <Routes>
                <Route index element={<HomePage/>}/>
                {/*user*/}
                <Route path="/register" exact={true} element={<RegisterForm/>}/>
                <Route path="/register/authentication" exact={true} element={<UserAuthentication/>}/>
                <Route path="/register/educator" exact={true} element={<EducatorRegisterForm/>}/>
            </Routes>
        </>
    );
}

export default App;
