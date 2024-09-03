const mongoose = require("mongoose")
const schema = mongoose.Schema()

const issuemodel = new schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    complaint:[{
        type:String,
        trim:true,
        minlength:10,
        maxlength:100
    }],
    createdAt:{
        type:Date
    }
},{timestamsp:true})

const issue = mongoose.model("issue",issuemodel)
module.exports = {issue}
