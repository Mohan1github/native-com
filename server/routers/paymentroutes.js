const express = require("express")
const paymentrouter = express.Router()
const {stripe} = require("../controllers/paymentcontroller")
paymentrouter.post("/payment",stripe)
module.exports = {paymentrouter};  