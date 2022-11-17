import {useEffect, useState} from "react";

let object = null;
function SingleDataContainer(props)
{
    const [value,setValue] = useState("");
    useEffect(()=>{
        object = {};
        if(props.current !== null && props.current !== undefined)
        {
            object = JSON.parse(props.current);
            console.log(object)
            if(props.type === "temp")
            {
                setValue(object.temp);
            }
            else if(props.type === "pH")
            {
                setValue(object.ph);
            }
            else if(props.type === "hum")
            {
                setValue(object.hum);
            }
            else if(props.type === "hum_earth")
            {
                setValue(object.hum_earth);
            }
            else if(props.type === "tur")
            {
                setValue(object.tur);
            }
            else if(props.type === "dust")
            {
                setValue(object.dust);
            }
            else if(props.type === "do")
            {
                setValue(object.do);
            }
            else if(props.type === "co2")
            {
                setValue(object.co2);
            }
            else if(props.type === "lux")
            {
                setValue(object.lux);
            }
            else if(props.type === "pre")
            {
                setValue(object.pre);
            }
        }
    },[props.current])
    return(
        <div>
            <div>{props.type}</div>
            <div style={{border: "1px solid black"}}>{value}</div>
        </div>
    );
}

export default SingleDataContainer;

