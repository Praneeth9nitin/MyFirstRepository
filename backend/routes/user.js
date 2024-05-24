const express = require("express")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const router=express.Router();
const { JWT_SECRET } = require("../config")
const { User,Account } =require("../db");
const {authMiddleware }=require("./middleware");

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})
const a=zod.string().email()
const b=zod.string()
const c=zod.string()
const d=zod.string()

router.post("/signup",async (req,res)=>{
    const { success } = signupBody.safeParse(req.body)
    console.log(success)
    console.log(a.safeParse(req.body.username).success)
    console.log(b.safeParse(req.body.password).success)
    console.log(c.safeParse(req.body.firstName).success)
    console.log(d.safeParse(req.body.lastName).success)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const username=req.body.username
        const find=await User.findOne({username:username});
        if(find){
            return(
                res.status(411).json({
                    message: "Email already taken / Incorrect inputs"
                })
            )
        }
        const user= await User.create({
            username:req.body.username,
            password:req.body.password,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        })
        const userId=user._id

        const account =await Account.create({
            userId,
            balance:1+Math.random()*10000
        })
        const token = jwt.sign({userId},JWT_SECRET)
        res.status(200).json({
            message: "User created successfully",
            fname:req.body.firstName,
            token: token,
            account
        })
})

router.post("/signin",async (req,res)=>{
    const signIn = zod.object({
        username:zod.string().email(),
        password:zod.string()
    })
    const username=req.body.username
    const password=req.body.password
    if(!signIn.safeParse(req.body).success){
        return(
        res.status(411).json({
            message: "incorrect input"
        })
)}
    const user=await User.findOne({
        username,
        password
    })
    console.log(user.firstName)
    if(user){
    const token = jwt.sign({userId:user._id},JWT_SECRET)
    return (
    res.status(200).json({
        fname:user.firstName,
        token:token
    })
)}
    res.status(411).json({
        message: "no user found"
    })
})


const updateBody=zod.object({
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})
router.put("/",authMiddleware,(req,res)=>{
    if (updateBody.safeParse(change).success) {
        User.updateOne({_id:req.userId},req.body)
        res.status(200).json({
            message: "Updated successfully"
        })
    }
    else{
        res.status(411).json({
            message: "Error while updating information"
        })
    }
})

router.get("/bulk",async (req,res)=>{ 
    const name = req.query.filter
    // if(name.startsWith("filter=")){
    //     name=name.substring(7)
    // }
        
            try{const users=await User.find({
                $or:[{
                    firstName:{"$regex":name}
                },{
                    lastName:{"$regex":name}
                }]
            })
            res.json({
                user: users.map(element=>({
                    firstName:element.firstName,
                    lastName:element.lastName,
                    id:element._id
                }))
            })
            }catch{
                res.json({
                    msg:"user not found"
                })
            }
            
})


module.exports= router
