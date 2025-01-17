import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

export function addProduct(req, res){

    console.log(req.user)

    if(req.user == null){
        res.status(401).json({
            message : "please login and try again"
        })
        return
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized to perform this action. only admin can add products"
        })
        return
    }

    const data = req.body;
    const newProduct = new Product(data);
    newProduct.save()
    .then(() => {
        res.json({
            message : "Product added successfully"
        })
    }).catch((error) => {
        res.status(500).json({
            error : "Product addition failed"
        })
    }
)}

export async function getProducts(req, res) {

    try{ 
        if(isItAdmin(req)){
            const products = await Product.find();
            res.json({products})
            return;
        }else{
            const products = await Product.find({availability : true});
            res.json({products})
        }
    }catch(error){
        res.status(500).json({
            message : "failed to get products"
        })
    }
}

export async function deleteProduct(req, res) {

    try{
        if(req.user == null){
            res.status(401).json({
                message : "please login and try again"
            })
            return
        }
        if(req.user.role != "admin"){
            res.status(403).json({
                message : "You are not authorized to perform this action. only admin can delete products"
            })
            return
        }
    
        const id = req.params.id;

        if(id == null){
            res.status(400).json({
                message : "product id is required"
            })
            return
        }

        const products =  await Product.findById(id);

        if(!products){
            res.status(404).json({
                message : "product not found"
            })
            return
        }else{
            await Product.deleteOne({_id : id})
            res.json({
                message : "Product deleted successfully"
            })

        }

        
      

    }catch(error){
        res.status(500).json({
            error : "Product deletion failed"
        })
    }
    
}