import axios from "axios";
import {RESPONSE_FORBIDDEN, RESPONSE_UNAUTHORIZED} from "./Response";

export const customAxios = axios.create({
    baseURL: "http://localhost:8080"
})

customAxios.interceptors.request.use(
    function (config)
    {
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
        return response;
    },
    function (error) {
        if(error.response.headers['authorization'] !== undefined)
        {
            localStorage.setItem("jwt", error.response.headers['authorization']);
        }
        if (error.response.request.status === RESPONSE_UNAUTHORIZED)
        {
            alert("로그인 해주세요");
            axios.post(`http://localhost:8080/logout`)
                .then((response)=>{
                    localStorage.clear();
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