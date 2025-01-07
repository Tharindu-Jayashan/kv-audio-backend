import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({

    email : {
        type : String,
        unique : true,
        required : true
    },

    name : {
        type : String,
        required : true
    },

    review : {
        type : String,
        required : true
    },

    rate : {
        type : String,
        required : true
    },

    Date : {
        type : Date,
        required : true,
        default : Date.now()
    },

    profilePicture : {
        type : String,
        required : true,
        default : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
    },

    isApproved : {
        type : Boolean,
        default : false
    }
})

const Review = mongoose.model("Review", reviewSchema);
export default Review