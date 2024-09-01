const express = require('express')
const cartrouter = express.Router()
const {getallcart,getcartbyid,deletecart,updatecart,createcart} = require("../controllers/cartcontroller")
const {verifyauth} = require("../middlewares/verify")
const {verifyisblocked} = require("../middlewares/verifyblocked")
cartrouter.post("create-cart",verifyauth,verifyisblocked,createcart)
cartrouter.get("/getallcart",verifyauth,verifyisblocked,getallcart)
cartrouter.get("/getcart/:id",verifyauth,verifyisblocked,getcartbyid)
cartrouter.delete("/delete-cart/:id",verifyauth,verifyisblocked,deletecart)
cartrouter.put("/update-cart/:id",verifyauth,verifyisblocked,updatecart)

module.exports = {cartrouter};