
import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export function registerUser(req, res) {

    const data = req.body;
    data.password = bcrypt.hashSync(data.password, 10); 

    const newUSer = new User(data)

    newUSer.save().then(()=>{
        res.json({
            message : "User registered successfully"
        })
    }).catch((error)=>{
       console.log(error);
    })
}

export function getAllUsers(req, res) {

    User.find().then((users)=>{
        res.json({
            users
        })
    }).catch((error)=>{
            res.status(500).json({
                error : "user registration failed"
            })
        })
}

export function loginUser(req, res){

    const data = req.body;

    User.findOne({
        email : data.email
    }).then((user)=>{

        if(user == null){
            res.status(404).json({  message : "User not found"})
        }else{
        
           const isPasswordCorrect = bcrypt.compareSync(data.password, user.password)  

            if(isPasswordCorrect){
                const token = jwt.sign({

                    firstname : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    role : user.role,
                    phone : user.phone,
                    profilePicture : user.profilePicture
                    
            },process.env.JWT_SECRET)

            res.json({ message : "Login Successful" , token : token, user : user})

           } else {
            res.status(401).json({message : "Login Failed"})
           }
        }
       })

}

export function isItAdmin(req) {

    let isAdmin = false;

    if(req.user != null && req.user.role == "admin"){
        isAdmin = true;
    }

    return isAdmin;
}

export function isItCustomer(req){

    let isItCustomer = false;

    if(req.user != null && req.user.role == "customer"){
        isItCustomer = true;
    }
    return isItCustomer;
}