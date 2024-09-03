const express = require("express")
const issuerouter = express.Router
const {createissue} = require("../controllers/raiseissuecontroller")
const { verifyauth } = require("../middlewares/verify")
issuerouter.post("/product/issue/createissue",verifyauth,createissue)
module.exports = {issuerouter}