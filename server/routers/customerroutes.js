const express = require("express")
const customerrouter = express.Router()
const {getcustomers,getcustomerbyid} = require("../controllers/customercontroller");
const { verifyisadmin } = require("../middlewares/verifyadmin");
const {verifyauth} = require("../middlewares/verify");
customerrouter.get("/getall-customer",verifyauth,verifyisadmin,getcustomers);
customerrouter.get("/get-customer/:id",getcustomerbyid);

module.exports = {customerrouter};
