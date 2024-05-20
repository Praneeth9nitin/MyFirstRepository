const mongoose=require("mongoose")
const { number } = require("zod")

mongoose.connect("mongodb+srv://Praneeth:922004%40ni@cluster0.cf6bast.mongodb.net/")

const userScheme = new mongoose.Schema({
    username:String,
    firstName:String,
    lastName:String,
    password:String
})

const bankScheme = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    balance:Number
})

const Account = mongoose.model("account",bankScheme)
const User = mongoose.model("user",userScheme)

module.exports = {User,Account};