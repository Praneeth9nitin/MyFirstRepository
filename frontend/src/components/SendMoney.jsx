import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function Sendmoney(){
    return(
        <div className="flex justify-center items-center h-screen">
        <Details></Details>
        </div>
    )
}

function Details(){
    const [amount,setAmount]=useState(0)
    const location = useLocation();
  const data = location.state;

    const firstName=data.firstName
    return(
        <div className="shadow-xl w-1/3">
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
                <button className="border text-sm ml-1 rounded-md p-2 bg-green-500 text-white focus:ring focus:ring-black-300 hover:bg-green-700 focus:" onClick={()=>{
                    axios({
                        url:"http://localhost:3000/api/v1/account/transfer",
                        method:"POST",
                        Headers:{
                            authorization:localStorage.getItem(token)
                        },
                        data:{
                            to:data.id,
                            amount:amount
                        }
                    })
                }}>Initiate Transfer</button>
            </div>
        </div>
    )
} 