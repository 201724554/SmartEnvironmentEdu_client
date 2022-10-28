import axios from "axios";
import {RESPONSE_FORBIDDEN, RESPONSE_OK, RESPONSE_UNAUTHORIZED} from "./Response";
import {isExpired} from "react-jwt";

export const customAxios = axios.create({
    baseURL: "http://localhost:8080"
})

customAxios.interceptors.request.use(
    function (config)
    {
        if(isExpired(localStorage.getItem("jwt")))
        {
            config.headers.refresh = localStorage.getItem("refresh");
        }
        config.headers.ContentType = "application/json; charset=utf-8";
        config.headers.authorization = localStorage.getItem("jwt");
        return config;
    }
)

customAxios.interceptors.response.use(
    function (response)
    {
        if(response.headers['authorization'] !== undefined)
        {
            localStorage.setItem("jwt", response.headers['authorization']);
        }
        if(response.headers['refresh'] !== undefined)
        {
            localStorage.setItem("refresh", response.headers['refresh']);
        }
        return response;
    },

    function (error) {
        if(error.response.headers['authorization'] !== undefined)
        {
            localStorage.setItem("jwt", error.response.headers['authorization']);
        }
        if (error.response.request.status === RESPONSE_UNAUTHORIZED)
        {
            axios.post(`http://localhost:8080/Logout`,{},{
            headers:
                {
                    ContentType: "application/json; charset=utf-8",
                    authorization: localStorage.getItem("jwt")
                }
            })
                .then((response)=>{
                    if(response.data.code === RESPONSE_OK)
                    {
                        localStorage.clear();
                        alert("로그인 해주세요");
                    }
                }).catch((error)=>{
                    alert(error.response.request.status);
            });
        }
        else if(error.response.request.status === RESPONSE_FORBIDDEN)
        {
            alert("권한이 없습니다");
        }
        return Promise.reject(error);
    }
);