import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios"

export function Sendmoney(){
    return(
        <div className="flex justify-center items-center h-screen">
        <Details></Details>
        </div>
    )
}

function Details(){
    const [amount,setAmount]=useState(0)
    const[done,setDone]=useState(false)
    const location = useLocation();
    const data = location.state;
    const firstName=data.firstName
    return(
        <div className="shadow-xl md:w-1/3 w-96">
            <h1 className="text-3xl font-bold text-center p-10 mb-5">Send Money</h1>
            <div className="flex flex-col p-10">
                <div className="flex items-center ">
                <div className="border px-5 py-3 my-2 rounded-full bg-green-500 font-semibold text-2xl text-white">{firstName[0].toUpperCase()}</div>
                <div className="p-2 font-bold text-2xl">{firstName[0].toUpperCase()+firstName.substring(1)}</div>
                </div>
                <div className="text-sm px-2 ">Amount (in Rs)</div>
                <input className="ml-1 text-sm mb-5 border p-2 rounded-md" type="text" placeholder="Enter amount" onChange={(e)=>{
                    setAmount(e.target.value)
                }}/>
                <button className="border text-sm ml-1 rounded-md p-2 bg-green-500 text-white focus:ring focus:ring-black-300 hover:bg-green-700 focus:" onClick={async()=>{
                    await axios({
                        url:"http://localhost:3000/api/v1/account/transfer",
                        method:"POST",
                        headers:{
                            authorization:"Bearer "+localStorage.getItem("token")
                        },
                        data:{
                            to:data.id,
                            amount:amount
                        }
                    })
                    setDone(true)
                }}>Initiate Transfer</button>
            </div>
            <PaymentDone done={done}></PaymentDone>
        </div>
    )
} 

function PaymentDone({done}){
    const navigate = useNavigate()
    return(
        <div className={`h-screen w-screen backdrop-blur-lg absolute top-0 left-0 ${done?"visible":"invisible"}`}>
        <div className="absolute top-40 left-1/3 bg-white flex flex-col p-5 shadow-lg">
            <div className="text-center text-xl p-5">Payment Done</div>
            <button onClick={()=>{
                navigate("/dashboard")
            }} className="bg-green-500 rounded-md">OK</button>
        </div>
        </div>
    )
}