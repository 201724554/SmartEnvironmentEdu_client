import SocketConnect from "./SocketConnect";
import {decodeToken} from "react-jwt";

function UserMacList(props)
{
    return(
        <>
            {
                props.mac.username === decodeToken(localStorage.getItem("refresh")).username ? (<div>{props.mac.username}(본인)</div>) : (<div>{props.mac.username}</div>)
            }
            {
                props.mac.macList.map((elem, idx)=>
                    (<div key={idx}>
                        <SocketConnect mac={elem} username={props.mac.username}/>
                    </div>)
                )
            }
        </>
    );
}

export default UserMacList;