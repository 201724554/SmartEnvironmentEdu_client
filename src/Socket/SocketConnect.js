import SockJS from 'sockjs-client';
import {useEffect, useState} from "react";


const stomp = require('stompjs');
let stompClient = null;
let json = null;
function SocketConnect(props)
{
    const [connected, setConnected] = useState(false);

    useEffect(()=>{
        json = {};
        json.MAC = "bb-bb-bb-bb-bb-bb";
        json.data = "Test";
        json.name = "jin";
    },[])

    function register()
    {
        const sock = new SockJS("http://localhost:8080/client/socket");
        stompClient = stomp.over(sock);
        stompClient.connect({authorization: localStorage.getItem("refresh")}, onConnected, onError)
    }

    function disconnect()
    {
        stompClient.disconnect();
        setConnected(false);
    }

    function onConnected()
    {
        setConnected(true);
        stompClient.subscribe("/topic/" + props.mac, onMessageReceived, onError);
    }

    function onError()
    {
        alert("연결 실패");
    }

    function onMessageReceived(payload)
    {
        console.log(props.mac + ": " + payload);
    }

    function send()
    {
        stompClient.send("/app/device", {}, JSON.stringify(json));
    }


    return(
        <>
            {
                connected === false ? (<button onClick={register}>connect</button>) : (<button onClick={disconnect}>disconnect</button>)
            }
            <button onClick={send}>send</button>
            <div>{props.mac}</div>
        </>
    );
}

export default SocketConnect;