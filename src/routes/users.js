import express from "express";
import jwt from 'jsonwebtoken';
import  bcrypt from 'bcrypt';
import {UserModel} from "../models/Users.js"

const router = express.Router();



router.post("/register", async (req,res) => {
    const {username, password} = req.body;

    const user = await UserModel.findOne({username});
    // res.json(user);
    if(user){
        return res.json({message:"This user already exist "});
    }
    const hasedpassword = await bcrypt.hash(password,10);
    const newUser =  new UserModel({username,password: hasedpassword});
    await newUser.save();  

    res.json({massage:"user register successfully "})
     
});
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    if(!user){
        return res.json({message: "user doesn't exist"});
    };
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.json({message: "Password  is incorrect"});
    };
    const token = jwt.sign({id : user._id}, "secret");
    res.json({token, userID: user._id});
});



 export{router as userRouter};
 export const verifyToken = (req,res, next ) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, "secret", (err) =>{
            if(err) return res.sendStatus(403);
            next();
        });

    }else{
        res.sendStatus(401);
    }
 } ;