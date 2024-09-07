const express = require("express")
const customerrouter = express.Router()
const {getcustomers,getcustomerbyid, deletecustomer,createcustomer} = require("../controllers/customercontroller");
const { verifyisadmin } = require("../middlewares/verifyadmin");
const {verifyauth} = require("../middlewares/verify");
customerrouter.post("/customer/create-customer",createcustomer)
customerrouter.get("/getall-customer",verifyauth,verifyisadmin,getcustomers);
customerrouter.get("/get-customer/:id",getcustomerbyid);
customerrouter.delete("/customer/delete/:id",deletecustomer)
module.exports = {customerrouter};
