const express = require("express")
const issuerouter = express.Router
const {createissue,deleteissue, getissues, getsingleissue} = require("../controllers/raiseissuecontroller")
const { verifyauth } = require("../middlewares/verify")
const { verifyisadmin } = require("../middlewares/verifyadmin")
issuerouter.post("/product/issue/create-issue",verifyauth,createissue)
issuerouter.delete("/product/issue/delete-issue/:id",verifyauth,verifyisadmin)
issuerouter.get("/product/issue/get-issue/:id",verifyauth,verifyisadmin,getsingleissue)
issuerouter.get("/product/issue/get-issue",verifyauth,verifyisadmin,getissues)
module.exports = {issuerouter}