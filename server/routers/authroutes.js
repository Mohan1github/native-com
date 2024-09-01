const express = require('express')
const authrouter = express.Router()
const {login,register,logout} = require("../controllers/authcontroller")
const{resetpassword,checkemail} = require("../controllers/forgotpasswordcontroller")

authrouter.get("auth/login",login)
authrouter.post("auth/register",register)
authrouter.get("auth/logout",logout)
authrouter.post("auht/check-email",checkemail)
authrouter.post("auth/forgot-password",resetpassword)
module.exports = {authrouter};


