import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {customAxios} from "../Common/CustomAxios";
import {RESPONSE_UNAUTHORIZED} from "../Common/Response";

function LoginForm()
{
    const {register,handleSubmit,formState: {errors}} = useForm();
    const navigate = useNavigate();

    function onSubmit(data)
    {
        customAxios.post("/login",{...data})
            .then((response)=> {
                navigate("/");
            })
            .catch((error)=>{
                if(error.response.request.status === RESPONSE_UNAUTHORIZED)
                {
                    alert("아이디 또는 비밀번호가 일치하지 않습니다");
                }
                else
                {
                    alert(error.response.request.status);
                }
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input placeholder="아이디" {...register("username", {required: {value: true, message: "아이디를 입력하세요"}})}/>
                    {errors.username && <span style={{color:'red', fontSize:"13px"}}>{errors.username.message}</span>}
                </div>
                <div>
                    <input placeholder="비밀번호" type="password" {...register("password", {required: {value: true, message: "비밀번호를 입력하세요"}})}/>
                    {errors.password && <span style={{color:'red', fontSize:"13px"}}>{errors.password.message}</span>}
                </div>
                <button type="submit">로그인</button>
            </form>
        </>
    );
}

export default LoginForm;