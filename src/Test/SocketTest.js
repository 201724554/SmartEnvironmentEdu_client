import SockJS from 'sockjs-client';
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";


const stomp = require('stompjs');
let stompClient = null;
let json = null;
let cnt = 0;
function TestSocket()
{
    const [connected, setConnected] = useState(false);
    /*useEffect(()=>{
        json = {};
        json.mac = "bb:bb:bb:bb:bb:bb";
        json.date = "2022-08-13 12:00:00";
        json.hum = 40 + cnt;
        json.temp = 24 + cnt;
        json.tur = 72.4 + cnt;
        json.ph = 71.4 + cnt;
        json.co2 = 74.4 + cnt;
        json.dust = 74.4;
        json.hum_EARTH = 72.4;
        json.lux = 7.34;
        json.do = 7.54;
        json.pre = 7.41;
        cnt++;
    },[])*/

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
        stompClient.subscribe("/topic/test", onMessageReceived, onError);
    }

    function onError()
    {
        alert("연결 실패");
    }

    function onMessageReceived(payload)
    {
        console.log(payload);
    }

    function send()
    {
        json = {};
        json.mac = "bb:bb:bb:bb:bb:bb";
        json.date = "2022-08-13 12:00:00";
        json.hum = 40 + cnt;
        json.temp = 24 + cnt;
        json.tur = 72.4 + cnt;
        json.ph = 71.4 + cnt;
        json.co2 = 74.4 + cnt;
        json.dust = 74.4;
        json.hum_EARTH = 72.4;
        json.lux = 7.34;
        json.do = 7.54;
        json.pre = 7.41;
        cnt++;
        stompClient.send("/app/test", {}, JSON.stringify(json));
    }


    return(
        <>
            {
                connected === false ? (<Button onClick={register}>connect</Button>) : (<Button onClick={disconnect}>disconnect</Button>)
            }
            &nbsp;&nbsp;
            <Button onClick={send}>send</Button>
        </>
    );
}

export default TestSocket;