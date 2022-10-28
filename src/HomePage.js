import {customAxios} from "./Common/CustomAxios";
import {RESPONSE_BAD_REQ, RESPONSE_OK} from "./Common/Response";
import {isExpired} from "react-jwt";
import axios from "axios";

function HomePage()
{
    function logout()
    {
        customAxios.post("/Logout").then((response)=> {
            console.log(response)
            if(response.request.status === RESPONSE_OK)
            {
                localStorage.clear();
                alert("로그아웃 성공");
            }
            else if(response.request.status === RESPONSE_BAD_REQ)
            {
                alert("로그아웃 실패");
            }
        })
    }

    function test()
    {
        console.log(localStorage.getItem("jwt"));
        console.log(localStorage.getItem("refresh"));
    }

    function test2()
    {
        console.log(isExpired(localStorage.getItem("jwt")))
        customAxios.get("http://localhost:8080/user/test").then((res)=>{console.log(res)})
    }
    return(
      <>
          <div>home</div>
          <button type="button" onClick={logout}>로그아웃</button>
          <button type="button" onClick={test}>test</button>
          <button type="button" onClick={test2}>test2</button>
      </>
    );
}

export default HomePage