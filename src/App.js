import './App.css';
import {Routes,Route} from "react-router-dom";
import RegisterForm from "./User/Register/RegisterForm";
import HomePage from "./HomePage";
import EducatorRegisterForm from "./User/Register/EducatorRegisterForm";
import UserAuthentication from "./User/Register/UserAuthentication";
import AddMACForm from "./User/Register/AddMACForm";
import LoginForm from "./Login/LoginForm";
import ConnectPage from "./Socket/ConnectPage";



function App() {
    return(
        <>
            <Routes>
                {/*home*/}
                <Route index element={<HomePage/>}/>
                {/*user*/}
                <Route path="/register" exact={true} element={<RegisterForm/>}/>
                <Route path="/register/authentication" exact={true} element={<UserAuthentication/>}/>
                <Route path="/register/educator" exact={true} element={<EducatorRegisterForm/>}/>
                <Route path="/mac" exact={true} element={<AddMACForm/>}/>
                {/*login*/}
                <Route path="/login" exact={true} element={<LoginForm/>}/>
                {/*socket*/}
                <Route path="/socket" exact={true} element={<ConnectPage/>}/>
            </Routes>
        </>
    );
}

export default App;
