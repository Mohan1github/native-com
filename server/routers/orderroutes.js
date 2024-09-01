const express = require("express")
const orderrouter = express.Router()
const {verifyauth} = require("../middlewares/verify")
const {cancelorder,createorder,getorders} = require("../controllers/ordercontroller")
orderrouter.get("/getall-orders",verifyauth,getorders)
orderrouter.post("/create-order",verifyauth,createorder,)
orderrouter.delete("/delete-order/:id",verifyauth,cancelorder)
orderrouter.delete("/delete-order/admin")
module.exports = {orderrouter}