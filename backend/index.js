const express = require("express");
const cors = require("cors")
const route = require("./routes/index")
const app = express()


app.use(express.json())
app.use(cors())
app.use("/api/v1", route)

app.listen(3000)