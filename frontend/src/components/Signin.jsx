import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Signin() {
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
            <div className="shadow-md md:w-1/5 w-96 bg-white rounded-lg ">
            <MainHeader></MainHeader>
            <Form></Form>
            </div>
        </div>
    )
}

function MainHeader() {
    return(
        <div className="text-center p-3">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <h4 className="text-sm text-slate-400 ">Enter your credentials to access your account</h4>
        </div>
    )
}

function Form(){
    let navigate=useNavigate();
    let [username,setUsername]=useState("")
    let [password,setPassword]=useState("")
    let [err,setErr]=useState(false)
    let [show,setShow]=useState(false)
    return(
        <div >
            <form method="post" className="p-3">
                <div className="text-sm m-2">Email</div>
                <input type="email" className={`${err?'border-red-500 text-red-500':''} p-1 text-sm border w-full rounded-lg  focus:outline-none`} placeholder={`${err?'invlid email or email already taken':"praneeth@something.com"}`} required onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>
                <div className="text-sm m-2">Password</div>
                <div className="flex items-center border rounded-lg ">
                <input type={show?"text":"password"} className="p-1 text-sm w-full focus:outline-none " required onChange={(e)=>{
                    setPassword(e.target.value)
                }} /> <div onClick={()=>{
                    setShow(!show)
                }}>
                   {show?<Eye/>:<EyeSlash/>}
                    </div>
                </div>
            </form>
            <div className="p-3">
            <button className="w-full text-center p-1 rounded-lg text-sm bg-black text-white  focus:outline-none" onClick={async ()=>{
                try{const res = await axios.post("http://localhost:3000/api/v1/user/signin",{
                    username,
                    password,
                });
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("user",res.data.fname)
                }catch{
                    setErr(true);
                }
                
                navigate("/dashboard")
            }} >Sign in</button>
            </div>
            <div className="text-xs text-center pb-2">
                Don't have an account? <Link to={"/signup"} className="underline">Sign up</Link>
            </div>
        </div>
    )
}

function Eye(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

    )
}
function EyeSlash() {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
<path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
<path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
<path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
</svg>
    )
}   