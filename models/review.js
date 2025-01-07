const reviewSchema = new mongoose.Schema({

    email : {
        type : String,
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
        type : String,
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
        required : true,
        default : false
    }
})

const Review = mongoose.model("Review", reviewSchema);
export default Review