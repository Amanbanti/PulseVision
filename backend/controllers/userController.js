
import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';
import { generateToken } from "../utils/generateToken.js";


export const authUser = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body
  
    const user = await User.findOne({ email })
  
    if (user && (await user.matchPassword(password))) {
      if (role && user.role !== role) {
        return res.status(403).json({ message : "Unauthorized role access!" })
      }
  
      generateToken(res, user._id)
  
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
    }
  
    res.status(401).json({message: "Invalid email or password!" })
  })





export const registerUser = asyncHandler (async (req, res) =>{
    const {name, email,password} = req.body;
    const userExist = await User.findOne({
        email: email
    })

    if( userExist){
        res.status(400).json({message:'User Already Exist!'});
    }else{
        const user = await User.create({
            name : name,
            email: email,
            password: password,
        })
        if(user){
        generateToken ( res,user._id)
           res.status(201).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            role: user.role
           })
        }else{
            res.status(400).json({message: 'Invalid User Data!' });
           }
    }

});





export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0), // Expire the cookie
    });

    res.status(200).json({ message: 'Logged out successfully' });
});







export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } else {
        res.status(404).json({ message: 'User not found!'});
    }
});




export const getUserById = asyncHandler (async (req, res) =>{
    
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({ message : 'User not found!' });
    }
});






export const getUsers = asyncHandler (async (req, res) =>{
    
    const users = await User.find({}); // Fetch all users
    res.status(200).json(users);

});




export const deleteUser = asyncHandler (async (req, res) =>{
    
    const user = await User.findById(req.params.id);

    if(user){
        await user.remove();
        res.status(200).json({message: 'User removed!'});
    }else{
       res.status(404).json({ message :'User not found!' }) 
    }
} )


export const updateUserRole = asyncHandler (async (req, res) =>{
    
    const user = await User.findById(req.params.id);

    if(user){
        user.role = req.body.role || user.role;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        });
    }else{
       res.status(404).json({ message :'User not found!' }) 
    }
} )
