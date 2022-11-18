import SockJS from 'sockjs-client';
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {forEach} from "react-bootstrap/ElementChildren";
import SingleDataContainer from "./SingleDataContainer";


const stomp = require('stompjs');
let stompClient = null;
let json = null;
let object = null;
function SocketConnect(props)
{
    const dataTypes = ["temp", "pH", "hum", "hum_earth", "tur", "dust", "do", "co2", "lux", "pre"];
    const [connected, setConnected] = useState(false);
    const [receivedData, setReceivedData] = useState([]);

    useEffect(()=>{
        object = {};
        json = {};
        json.mac = "bb:bb:bb:bb:bb:bb";
        json.adjust = 0;
        json.value = 0;
        json.censor = "PH";
        json.disconnect = "NO";
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
        stompClient.subscribe("/topic/user", onMessageReceived, onError);
    }

    function onError()
    {
        alert("연결 실패");
    }

    function onMessageReceived(payload)
    {
        object = JSON.parse(payload.body);
        receivedData.push(JSON.stringify(object));
        setReceivedData([...receivedData]);
        console.log(receivedData);

    }

    function send()
    {
        stompClient.send("/app/test", {}, JSON.stringify(json));
    }


    return(
        <>
            <div>{props.mac}</div>
            {
                connected === false ? (<Button onClick={register}>connect</Button>) : (<Button onClick={disconnect}>disconnect</Button>)
            }
            &nbsp;&nbsp;
            {
                connected === true
                    ? dataTypes.map((elem)=>
                        (<div key={elem}>
                            <SingleDataContainer type={elem} data={receivedData} current={receivedData[receivedData.length-1]}/>
                            <br/>
                        </div>)
                        )
                    : (<></>)
            }
            {/*<Button onClick={send}>send</Button>*/}
        </>
    );
}

export default SocketConnect;