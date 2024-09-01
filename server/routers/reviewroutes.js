const express = require("'express")
const reviewrouter = express.Router()
const {createreview,deletereviews} = require("../controllers/reviewcontroller")
const {verifyauth} = require("../middlewares/verify")
reviewrouter.post("/products/create-review",verifyauth,createreview);
reviewrouter.delete("/products/delete-review/:id",verifyauth,deletereviews)
module.exports = {reviewrouter}