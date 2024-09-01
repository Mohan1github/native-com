const express = require("express")
const orderrouter = express.Router()
const {verifyauth} = require("../middlewares/verify")
const {createorder,deleteorder,getorders,getpendingorders,orderstatuschanger,cancelorder} = require("../controllers/ordercontroller")
const { verifyisadmin } = require("../middlewares/verifyadmin")
orderrouter.get("/getall-orders",verifyauth,getorders)
orderrouter.post("/create-order",verifyauth,createorder,)
orderrouter.put("/getall-orders",verifyauth,verifyauth,orderstatuschanger)
orderrouter.get("/getall-orders",verifyauth,getpendingorders);
orderrouter.put("/getall-orders",verifyauth,cancelorder)
orderrouter.delete("/delete-order/admin",verifyauth,verifyisadmin,deleteorder)
module.exports = {orderrouter}