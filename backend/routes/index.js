const express=require("express")
const userRoute=require("./user")
const router = express.Router();
const accountRouter = require("./account")

router.use("/account",accountRouter)
router.use("/user",userRoute)
module.exports = router