import {useEffect, useState} from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const option = {
    responsive: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const labels = ['','','','','','','','','',''];


function SingleDataContainer(props)
{
    const [value,setValue] = useState("");
    const [active,setActive] = useState(false);
    const [graphData] = useState([]);
    const [seeGraph, setSeeGraph] = useState(true);

    useEffect(()=>{
        if(props.type === "temp")
        {
            props.data.forEach((elem)=>graphData.push(elem.temp));
        }
        else if(props.type === "pH")
        {
            props.data.forEach((elem)=>graphData.push(elem.ph));
        }
        else if(props.type === "hum")
        {
            props.data.forEach((elem)=>graphData.push(elem.hum));
        }
        else if(props.type === "hum_earth")
        {
            props.data.forEach((elem)=>graphData.push(elem.hum_EARTH));
        }
        else if(props.type === "tur")
        {
            props.data.forEach((elem)=>graphData.push(elem.tur));
        }
        else if(props.type === "dust")
        {
            props.data.forEach((elem)=>graphData.push(elem.dust));
        }
        else if(props.type === "dox")
        {
            props.data.forEach((elem)=>graphData.push(elem.dox));
        }
        else if(props.type === "co2")
        {
            props.data.forEach((elem)=>graphData.push(elem.co2));
        }
        else if(props.type === "lux")
        {
            props.data.forEach((elem)=>graphData.push(elem.lux));
        }
        else if(props.type === "pre")
        {
            props.data.forEach((elem)=>graphData.push(elem.pre));
        }
    },[])

    useEffect(()=>{
        if(props.current !== null && props.current !== undefined)
        {
            if(props.type === "temp")
            {
                setValue(props.data[props.data.length-1].temp);
                graphData.push(props.current.temp);
            }
            else if(props.type === "pH")
            {
                setValue(props.data[props.data.length-1].ph);
                graphData.push(props.current.ph);
            }
            else if(props.type === "hum")
            {
                setValue(props.data[props.data.length-1].hum);
                graphData.push(props.current.hum);
            }
            else if(props.type === "hum_earth")
            {
                setValue(props.data[props.data.length-1].hum_EARTH);
                graphData.push(props.current.hum_EARTH);
            }
            else if(props.type === "tur")
            {
                setValue(props.data[props.data.length-1].tur);
                graphData.push(props.current.tur);
            }
            else if(props.type === "dust")
            {
                setValue(props.data[props.data.length-1].dust);
                graphData.push(props.current.dust);
            }
            else if(props.type === "dox")
            {
                setValue(props.data[props.data.length-1].dox);
                graphData.push(props.current.dox);
            }
            else if(props.type === "co2")
            {
                setValue(props.data[props.data.length-1].co2);
                graphData.push(props.current.co2);
            }
            else if(props.type === "lux")
            {
                setValue(props.data[props.data.length-1].lux);
                graphData.push(props.current.lux);
            }
            else if(props.type === "pre")
            {
                setValue(props.data[props.data.length-1].pre);
                graphData.push(props.current.pre);
            }


            if(graphData.length > 10)
            {
                graphData.splice(0,1);
            }
            console.log(graphData + " " + graphData.length);
        }
    },[props.data])

    const data = {
        labels,
        datasets: [
            {
                label: props.type,
                data: graphData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return(
        <div>
            <div style={{display: "inline-block", fontSize: "1.3em", cursor: "pointer"}} onClick={() => {
                    setActive(!active)
                }}>{props.type}</div>
                &nbsp;&nbsp;
            {
                active === true ? (
                <div>
                <div style={{display:"inline-block",fontSize: "5em"}}>{value}</div>
            {
                seeGraph === true && props.data.length !== 0 ?
                        (
                            <div>
                                <Line options={option} data={data} width="750px" height="500"/>
                            </div>
                        )
                        : (<></>)

            }
                </div>)
                : (<></>)
            }
        </div>
    );
}

export default SingleDataContainer;

