const express = reuire("express")
const mongoose = require("mongoose")
const schema = mongoose.Schema
const reviewschema = new schema({

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    review:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        review_comments:{
            type:String,
            trim:true
        },
        ratings:{
            type:Number,
            default:0,
        },
        createdAt:{
            type:Date(),
        }
    }]
},{
    timestamps: true,
})

const review = mongoose.model("review",reviewschema)
module.exports = {review}