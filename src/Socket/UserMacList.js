import SocketConnect from "./SocketConnect";
import {decodeToken} from "react-jwt";

function UserMacList(props)
{
    return(
        <div>
            {
                props.mac.macList.map((elem, idx)=>
                    (<div key={idx}>
                        <SocketConnect mac={elem} username={props.mac.username}/>
                    </div>)
                )
            }
        </div>
    );
}

export default UserMacList;