const express = require("express")
const zod = require("zod")
const jwt = require("jsonwebtoken")
const router=express();
const { JWT_SECRET } = require("../config")
const { User } =require("../db");
const {authMiddleware }=require("./middleware");

const Schema = zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/signup",async (req,res)=>{
    
    
    if(!Schema.safeParse(req.body).success){
        console.log(req.body);
        res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const username = req.body.username
    await User.find({username:username},async function(err,data){
        if(err){
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
            res.send(200).json({
                message: "User created successfully",
                token: token,
                account
            })
        }else{
            res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }
    })
})

router.post("/signin",(req,res)=>{
    const signIn = zod.object({
        username:zod.string().email(),
        password:zod.string().min(8)
    })
    const username=req.body.username
    const password=req.body.password
    if(signIn.safeParse(req.body).success){
        const token = jwt.sign(username,JWT_SECRET)
        res.status(200).json({
            token:token
        })
    }else{
        res.status(411).json({
            message: "Error while logging in"
        })
    }
})


const updateBody=zod.object({
    password:zod.string().min(8),
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

router.get("/bulk/:name",(req,res)=>{
    const name = req.params.name
    if(name.startsWith("filter=")){
        name=name.substring(7)
    }
    User.find({name},function(err,data){
        if(err){
            res.status(411).json({
                msg:"invalid input"
            })
        }
        else{
            const users=User.find({
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
        }
    })
})


module.exports= router
