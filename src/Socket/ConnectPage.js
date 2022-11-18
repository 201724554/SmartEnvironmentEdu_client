import SockJS from 'sockjs-client';
import {useEffect, useState} from "react";
import {decodeToken} from "react-jwt";
import {customAxios} from "../Common/CustomAxios";
import {RESPONSE_CONFLICT, RESPONSE_UNAUTHORIZED} from "../Common/Response";
import SocketConnect from "./SocketConnect";

function ConnectPage()
{
    const username = localStorage.getItem("refresh") === null ? null : decodeToken(localStorage.getItem("refresh")).username;
    const [connectableSocket, setConnectableSocket] = useState([]);

    useEffect(()=>{
        if(username === null)
        {
            alert("로그인이 필요합니다");
            return;
        }
        customAxios.get(`/user/device/${username}`)
            .then((response)=>{
                setConnectableSocket(response.data.data);
            })
            .catch((error)=>{
                if(error.response.request.status === RESPONSE_CONFLICT)
                {
                    alert("기기를 추가해주세요");
                }
            })
    },[]);

    return(
        <div>
            {
                connectableSocket.map((elem,idx)=>
                    (<div key={idx}>
                        <SocketConnect mac={elem}/>
                        <br/>
                    </div>)
                )
            }
        </div>
    );
}

export default ConnectPage;