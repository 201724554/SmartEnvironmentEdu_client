import {customAxios} from "./Common/CustomAxios";
import {RESPONSE_BAD_REQ, RESPONSE_OK} from "./Common/Response";
import {isExpired} from "react-jwt";

function HomePage()
{
    function logout()
    {
        customAxios.post("/logout").then((response)=> {
            if(response.data.code === RESPONSE_OK)
            {
                localStorage.clear();
                alert("로그아웃 성공");
            }
            else if(response.data.code === RESPONSE_BAD_REQ)
            {
                alert("로그아웃 실패");
            }
        })
    }

    function test()
    {
        console.log(localStorage.getItem("jwt"));
        console.log(isExpired(localStorage.getItem("jwt")));
        console.log(localStorage.getItem("refresh"));
        console.log(isExpired(localStorage.getItem("refresh")));
    }

    function test2()
    {
        customAxios.get("/user/test").then((res)=>{console.log(res)})
    }

    function authUp()
    {
        customAxios.post("/test/authup",{username: "pay7845"}).then((res)=>{console.log(res)})
    }
    return(
      <>
          <div>home</div>
          <button type="button" onClick={logout}>로그아웃</button>
          <button type="button" onClick={test}>test</button>
          <button type="button" onClick={test2}>test2</button>
          <button type="button" onClick={authUp}>auth</button>
      </>
    );
}

export default HomePage