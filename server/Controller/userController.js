const asyncHandler = require("express-async-handler");
const User = require("../Model/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

const register= asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error("All fields are required")
    }

    const existingUser=await User.findOne({email})

    if(existingUser){
        res.status(400)
        throw new Error("User already exists")
    }

    const salt=10
    const hashedPassword=await bcrypt.hash(password,salt)

    const user = await User.create({
        name:name,
        email:email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid user Data")
    }

})

const login = asyncHandler(async (req, res) => {
    console.log("hiiii");
    
    const {email,password} = req.body

    if(!email || !password){
        res.status(400)
        throw new Error("All fields are required")
    }

    const user= await User.findOne({email})

    if(user && await bcrypt.compare(password,user.password)){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error("Invalid Credentials");
    }
})

module.exports ={register,login}