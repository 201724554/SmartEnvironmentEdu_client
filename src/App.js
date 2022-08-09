import './App.css';
import axios from "axios";
import {useState} from "react";


function App() {


    const [temp,setTemp] = useState(null);
    return (
        <div className="App">
            <input type="text" onChange={(e)=>{setTemp(e.target.value)}}/>
            <button type="button" onClick={()=>{
                axios.get(`http://localhost:8080/test/${temp}`)
                    .then((res)=>{
                        if(res.status === 200)
                        {
                            alert("done");
                        }
                        else alert("failed");
                    })
                    .catch((err)=>{

                    })
            }}>button</button>
        </div>
      );
}

export default App;
