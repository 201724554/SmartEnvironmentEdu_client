import {useForm} from "react-hook-form";
import axios from "axios";

function RegisterForm()
{
    const {register,handleSubmit,formState: {errors}} = useForm();

    function onSubmit(data)
    {
        axios.post("http://localhost:8080/register", {...data}).then((response)=>{
            alert(response.data);
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
                <div>
                    <input placeholder="이메일" type="email" {...register("email", {required: {value: true, message: "이메일을 입력하세요"}})}/>
                    {errors.email && <span style={{color:'red', fontSize:"13px"}}>{errors.email.message}</span>}
                </div>
                <div>
                    <input placeholder="기기 MAC 주소" {...register("userDeviceMAC", {required: {value: true, message: "MAC 주소를 입력하세요"}})}/>
                    {errors.userDeviceMAC && <span style={{color:'red', fontSize:"13px"}}>{errors.userDeviceMAC.message}</span>}
                </div>
                <input type="submit"/>
            </form>
        </>
    );
}

export default RegisterForm;