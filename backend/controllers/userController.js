
import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";


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
    
        const emailExists = await User.find({ email: user.email, _id: { $ne: user._id } });
        if (emailExists.length > 0) {
            return res.status(400).json({ message: 'Email already exists!' });
        }
        


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

export const updatePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user && (await user.matchPassword(req.body.currentPassword))) {
        user.password = req.body.newPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully!' });
    } else {
        res.status(400).json({ message: 'Invalid current password!' });
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





export const getAllUsers = async (req, res) => {
    try {
      const { search, page = 1, limit = 10 } = req.query;
  
      const filter = {};
  
      // 🔍 Search by name or email
      if (search) {
        filter.$or = [
          { name: new RegExp(search, "i") },
          { email: new RegExp(search, "i") },
        ];
      }
  
  
      const pageNumber = parseInt(page);
      const pageSize = parseInt(limit);
      const skip = (pageNumber - 1) * pageSize;
  
      const total = await User.countDocuments(filter);
  
      const users = await User.find(filter)
        .sort({ createdAt: -1 }) // sort by date joined
        .skip(skip)
        .limit(pageSize)
  
      res.status(200).json({
        success: true,
        count: users.length,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
        totalUsers: total,
        hasNextPage: pageNumber * pageSize < total,
        hasPrevPage: pageNumber > 1,
        users: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };




export const deleteUser = asyncHandler (async (req, res) =>{
    
    const user = await User.findById(req.params.id);
    if(user){
        if(user.role === 'admin'){
            res.status(400);
            throw new Error('Can not delete admin user!');
            
        }else{
            await User.deleteOne({_id: user._id})
            res.status(200).json({message: 'User deleted Successfully!'})
        }
    }else{
        res.status(404);
        throw new Error('User not found!');
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




export const checkAuth = asyncHandler(async (req, res) => {
    const token = req.cookies.jwt;
  
    if (!token) {
      return res.status(200).json({ user:"null"})
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.userId).select("-password")
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
  
      res.status(200).json({ user }) // wrapped for clarity
    } catch (err) {
      console.error("JWT decode failed:", err)
      res.status(401).json({ message: "Invalid token" })
    }
  })
  