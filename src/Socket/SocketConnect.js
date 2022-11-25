import SockJS from 'sockjs-client';
import {useEffect, useState} from "react";
import SingleDataContainer from "./SingleDataContainer";
import {decodeToken} from "react-jwt";
import {customAxios} from "../Common/CustomAxios";


const stomp = require('stompjs');
let stompClient = null;
let json = null;
let sendObject = null;
let receiveObject = null
let save = false;

function SocketConnect(props)
{
    const dataTypes = ["temp", "pH", "hum", "hum_earth", "tur", "dust", "dox", "co2", "lux", "pre"];
    const [checked, setChecked] = useState(false);
    const [connected, setConnected] = useState(false);
    const [receivedData, setReceivedData] = useState([]);
    const [saveData, setSaveData] = useState([]);

    useEffect(()=>{
        sendObject = {};
        json = {};
        json.mac = props.mac;
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
        stompClient.subscribe("/topic/user"/* + props.mac*/, onMessageReceived, onError);
    }

    function onError()
    {
        alert("연결 실패");
    }

    function onMessageReceived(payload)
    {
        console.log(save);
        receiveObject = JSON.parse(payload.body);
        receivedData.push(JSON.stringify(receiveObject));
        if(receivedData.length > 100)
        {
            receivedData.splice(0,1);
        }
        if(save === true)
        {
            saveData.push(JSON.stringify(receiveObject));
            setSaveData([...saveData]);
            if(saveData.length === 10)
            {
                console.log("save");
                customAxios.post("/user/save",{data: saveData}).then().catch(()=>{
                    disconnect();
                });
                saveData.splice(0,saveData.length);
                setSaveData([...saveData]);
            }
        }
        setReceivedData([...receivedData]);
    }

    function send()
    {
        stompClient.send("/app/test", {}, JSON.stringify(json));
    }


    return(
        <>
            {
                connected === false ? (<button onClick={register}>connect</button>) : (<button onClick={disconnect}>disconnect</button>)
            }
            &nbsp;&nbsp;
            {
                props.username === decodeToken(localStorage.getItem("refresh")).username ? (<><input type="checkbox" checked={checked} onChange={()=>{save = !save;setChecked(!checked)}}/>&nbsp;저장하기</>) : (<></>)
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