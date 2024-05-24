import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { balanceAtom } from "./atoms";

export function Dashboard(){
    return (
        <div>
            <RecoilRoot>
        <AppBar></AppBar>
        <Balance></Balance>
        <Users></Users>
            </RecoilRoot>
        </div>
    )
}

function AppBar(){
    const user=localStorage.getItem("user")
    console.log(user)
    return(
        <div className="flex justify-between items-center p-5 shadow-sm">
            <h2 className="text-3xl font-bold">Payments App</h2>
            <h4 className="font-medium">Hello, {user}</h4>  
        </div>
    )
}

function Balance(){
    const balance=useRecoilValue(balanceAtom)
    return(
        <div className="font-bold text-xl p-5">Your Balance Rs.{balance}</div>
    )
}

function Users(){
    const [name,setName]=useState("")
    const [users,setUsers]=useState([])
    useEffect(()=>{
        axios({
            url:`http://localhost:3000/api/v1/user/bulk?filter=${name}`,
            method:"GET",
        }).then((res)=>{
            setUsers(res.data.user)
            
        })
    },[name])
    return(
        <div className="p-5">
            <div className="font-bold text-xl">Users</div>
            <UserList users={users} setName={setName}/>
        </div>
    )
}

function UserList({users,setName}) {
    const navigate=useNavigate()
    return( <div>
        <form>
                <input className="border w-full p-2 rounded-md mt-5" placeholder="Search users..." onChange={(e)=>{
                    setName(e.target.value)
                }} type="text" />
            </form>
        {users.map(element=>{
            return(
            <div className="m-5">
            <div className="flex justify-between items-center focus:outline-none font-bold text-lg">
                {element.firstName}
            <button onClick={()=>{  
                navigate("/send",{state:{firstName:element.firstName,id:element.id}})   
            }} className="bg-neutral-900 text-white p-2 text-sm rounded-md hover:bg-black focus:ring focus:ring-black-300">Send Money</button>
            </div>
            </div>)
        })}
        </div>
    )
}