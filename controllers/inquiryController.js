
import Inquiry from "../models/inquiry.js";
import {isItCustomer, isItAdmin} from "./userController.js";

export async function addInquiry(req, res){

   try{
    if(isItCustomer(req)){

        const data = req.body;

        data.email = req.user.email;
        data.phone = req.user.phone;

        let id = 0;

        const inquiries = await Inquiry.find().sort
        ({id : -1}).limit(1);

        if(inquiries.length == 0){
            id = 1;
        }else{
            id = inquiries[0].id + 1;
        }   
        
        data.id = id;

        const newInquiry = new Inquiry(data);
        await newInquiry.save();
        res.json({
            message : "Inquiry added successfully",
            id : id
        });
    }else{
        res.status(403).json({
            message : "You are not authorized to perform this action. only customer can add inquiries"
        })
    }

   }catch(e){
       res.status(500).json({
           message : "Inquiry addition failed"
       })
   }
}

export async function getInquiry(req, res){

    try{
        if(isItCustomer(req)){
            const inquiries = await Inquiry.find({email : req.user.email});
            res.json({
                inquiries
            })
            return;
        }else if(isItAdmin(req)){
            const inquiries = await Inquiry.find();
            res.json({
                inquiries
            }) 
            return;
        }
        else{
            res.status(403).json({
                message : "You are not authorized to perform this action. only customer or admin can get inquiries"
            })
            return;
        }

    }catch(e){
        res.status(500).json({
            message : "Inquiry getting failed"
        })
    }
}

export async function deleteInquiry(req, res){

    try{
        if(isItAdmin(req)){
            const id = req.params.id;
            await Inquiry.deleteOne({id : id});
            res.json({
                message : "Inquiry deleted successfully"
            })
            return;
        }
        else if(isItCustomer(req)){
            const id = req.params.id;
            
            const inquiries = await Inquiry.findOne({id : id});
            if(inquiries == null){
                res.status(404).json({
                    message : "Inquiry not found"
                })
                return;
            }else{
                if(inquiries.email == req.user.email){
                    await Inquiry.deleteOne({id : id});
                    res.json({
                        message : "Inquiry deleted successfully"
                    })
                    return;
                }else{
                    res.status(403).json({
                        message : "You are not authorized to perform this action."
                    })
                    return;
                }
            }
        }else{
            res.status(403).json({
                message : "You are not authorized to perform this action. please login and try again"
            })
            return;
        }

    }catch(e){
        console.log(e);
        res.status(500).json({
            message : "Inquiry deletion failed"
        })
    }
}