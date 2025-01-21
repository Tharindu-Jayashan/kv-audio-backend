import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    key : {
        type : String,
        unique : true,
        required : true 
    },

    name : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true,
        default : "uncategorized"
    },

    dimensions : {
        type : String,
        required : true
    },
    
    price : {
        type : Number,
        required : true
    },

    description : {
        type : String,
        required : true
    },
    
    availability : {
        type : Boolean,
        required : true,
        default : true
    },
    
    image : {
        type : [String],
        required : true,
        default : [
            "https://images.app.goo.gl/vyVZPWunDzYEWQmo8",
            "https://images.app.goo.gl/vyVZPWunDzYEWQmo8"
            ]
    }
})

const Product = mongoose.model("Product", productSchema);
export default Product;