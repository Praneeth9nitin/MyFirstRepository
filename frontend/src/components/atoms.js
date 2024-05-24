import { atom, atomFamily, selector } from "recoil";
import axios from "axios";
export const balanceAtom = atom({
    key:"balanceAtom",
    default:selector({
        key:"balanceSelector",
        get:async ()=>{
            const res = await axios({
                url:"http://localhost:3000/api/v1/account/balance",
                method:"GET",
                headers:{
                    authorization:"Bearer "+localStorage.getItem("token")
                }
            })
            return Math.floor(res.data.balance)
        }
    })
})

