import SockJS from 'sockjs-client';
import {useEffect} from "react";

const stomp = require('stompjs');
let stompClient = null;
let json = null;
function ConnectPage()
{
    useEffect(()=>{
        json = {};
        json.data = "test";
        json.name = 'jin';
    },[])

    function register()
    {
        const sock = new SockJS("http://localhost:8080/client/socket");
        stompClient = stomp.over(sock);
        stompClient.connect({authorization:localStorage.getItem("jwt")},onConnected)
    }

    function onConnected()
    {
        stompClient.send(null,null,"test");
    }

    function send()
    {
        stompClient.send(null,null,JSON.stringify(json));
    }
    return(
        <div>
            <button onClick={register}>register</button>
            <button onClick={send}>send</button>
        </div>
    );
}

export default ConnectPage;