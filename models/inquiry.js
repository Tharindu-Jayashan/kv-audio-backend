import { response } from "express";
import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({

    id : {
        type : number,
        required : true,
        unique : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    message : {
        type : String,
        required : true
    },

    Date : {
        type : Date,
        required : true,
        default : Date.now()
    },

    phone : {
        type : String,
        required : true
    },

    response : {
        type : String,  
        required : false,
        default : ""
    },

    isResolved : {
        type : Boolean,
        required : true,
        default : false
    }  
  
})

const Inquiry = mongoose.model("inquiry", inquirySchema);

export default Inquiry;