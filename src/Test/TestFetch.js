import {customAxios} from "../Common/CustomAxios";
import {useEffect, useState} from "react";

function TestFetch()
{
    const [data,setData] = useState([]);

    useEffect(()=>{
        customAxios.get("/test/fetch").then((response)=>{
            setData([...response.data.data]);
        })
    },[])

    return(
        <>
            <div>
            {
                data.map((elem)=>
                    (<div>
                        {JSON.stringify(elem)}
                    </div>)
                )
            }
            </div>
        </>
    );
}

export default TestFetch;