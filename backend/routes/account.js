const express = require('express')
const {Account} = require('../db');
const { authMiddleware } = require('./middleware');
const { default: mongoose } = require('mongoose');
const app=express();

app.get("/balance",authMiddleware, async (req,res)=>{
    const account=await Account.findOne({uerId:req.userId})
    res.json({
        balance:account.balance
    })
})

app.post("/transfer",authMiddleware,async (req,res)=>{
    const toId = req.body.to
    const session = await mongoose.startSession()
    session.startTransaction();
   try{
    const post = await Account.findById({toId}).session(session)
    const self = await Account.find({userId:req.userId}).session(session)
    if(req.body.amount>self.balanse){
        res.status(400).json({
            message: "Insufficient balance"
        })
    }
    }catch{
    res.status(400).json({
        message: "Invalid account"
    })
   }
    
    await Account.findByIdAndDelete({toId},{
        $inc:{balance:req.body.amount}
    }).session(session)
    await Account.updateOne({userId:req.userId},{
        $inc:{balance:-req.body.amount}
    }).session(session)
   await session.commitTransaction();
   res.json({
	message: "Transfer successful"
})
})
module.exports=app