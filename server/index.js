const express = require("express")
const databaseconnect = require("./db/connectdb")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const authrouter = require("./routers/authroutes")
const productrouter = require("./routers/productroutes")
const cartrouter = require("./routers/cartroutes")
const userrouter = require("./routers/userroutes")
const orderrouter = require("./routers/orderroutes")
const paymentrouter = require("./routers/paymentroutes")
const reviewrouter = require("./routers/reviewroutes")
require("dotenv").config()
app.use(bodyParser)
app.use("/api/v1/auth",authrouter);
app.use("/api/v1/products",productrouter);
app.use("/api/v1/carts",cartrouter);
app.use("/api/v1/users",userrouter);
app.use("/api/v1/orders",orderrouter);
app.use("/api/v1/payments",paymentrouter);
app.use("/api/v1/reviews",reviewrouter);
const corsOption = [origin="*"]
app.use(cors(corsOption))
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port:${process.env.PORT}......`)
    databaseconnect();
})
