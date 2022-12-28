import SockJS from 'sockjs-client';
import {useEffect, useRef, useState} from "react";
import SingleDataContainer from "./SingleDataContainer";
import {decodeToken} from "react-jwt";
import {customAxios} from "../Common/CustomAxios";


const stomp = require('stompjs');
let stompClient = null;
let receiveObject = null
let save = false;

function SocketConnect(props) {
    const dataTypes = ["temp", "pH", "hum", "hum_earth", "tur", "dust", "dox", "co2", "lux", "pre"];
    const [checked, setChecked] = useState(false);
    const [connected, setConnected] = useState(false);
    const [receivedData, setReceivedData] = useState([]);
    const [saveData, setSaveData] = useState([]);
    let location = "";

    function register() {
        const sock = new SockJS("http://13.124.30.108:8080/client/socket");
        stompClient = stomp.over(sock);
        stompClient.connect({authorization: localStorage.getItem("refresh")}, onConnected, onError)
    }

    function disconnect() {
        stompClient.disconnect();
        setConnected(false);
    }

    function onConnected() {
        setConnected(true);
        stompClient.subscribe("/topic/user/" + props.mac, onMessageReceived, onError);
    }

    function onError() {
        alert("연결 실패");
    }

    function onMessageReceived(payload) {
        receiveObject = JSON.parse(payload.body);
        if(location !== "")
        {
            receiveObject.location = location;
        }
        console.log(receiveObject)
        receivedData.push(receiveObject);
        if (receivedData.length > 10) {
            receivedData.splice(0, 1);
        }
        if (save === true) {
            saveData.push(JSON.stringify(receiveObject));
            setSaveData([...saveData]);
            if (saveData.length === 5) {
                console.log("save");
                customAxios.post("/user/save", {data: saveData}).then().catch(() => {
                    disconnect();
                });
                saveData.splice(0, saveData.length);
                setSaveData([...saveData]);
            }
        }
        setReceivedData([...receivedData]);
    }


    return (
        <div>
            <br/>
            <div className="d-flex justify-content-between">
                <div>
                    <span className="border p-2" style={{
                        cursor: "pointer",
                        backgroundColor: `${connected === false ? "rgb(192,192,192)" : "rgb(102,255,102)"}`
                    }} onClick={() => {
                        if(connected === false) {
                            location = prompt("위치 정보를 입력하세요(optional)");
                            register();
                        } else {
                            disconnect()
                        }
                    }}>{props.mac}</span>
                    {
                        props.username === decodeToken(localStorage.getItem("refresh")).username ? (
                            <span className="p-2" style={{fontSize: "0.7em"}}><input type="checkbox"
                                                                                     checked={checked}
                                                                                     onChange={() => {
                                                                                         save = !save;
                                                                                         setChecked(!checked)
                                                                                     }}/>&nbsp;데이터 저장하기</span>) : (
                            <div></div>)
                    }
                </div>
                <div>id: {props.username}</div>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className={connected === true ? "border pt-2 ps-2 pe-2" : ""}>
                {
                    /*connected === true ? (
                        <div className="pb-2"><input ref={locationInputRef} placeholder="위치정보" type="text" size="10"/><span
                            style={{cursor: "pointer"}} className="border ms-3" onClick={() => {
                            if (locationInputRef.current.value.length > 10) {
                                alert("위치 정보는 10자보다 클 수 없습니다");
                            } else {
                                locationValue = locationInputRef.current.value;
                                alert("적용되었습니다");
                            }
                        }}>적용하기</span></div>) : (<></>)*/
                }
                {
                    connected === true
                        ? dataTypes.map((elem) =>
                            (<div key={elem}>
                                <SingleDataContainer type={elem} data={receivedData}
                                                     current={receivedData[receivedData.length - 1]}/>
                            </div>)
                        )
                        : (<></>)
                }
            </div>
        </div>
    );
}

export default SocketConnect;