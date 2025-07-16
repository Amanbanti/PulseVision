import express from "express";
import {
    authUser,
    registerUser,
    logoutUser ,
    updateUserProfile,
    getUserById,
    getUsers,
    deleteUser,
    updateUserRole 
    
    } from '../controllers/userController.js'

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/',protect,admin,getUsers);
router.get('/:id',protect,admin, getUserById);
router.post('/',registerUser);
router.post('/logout',logoutUser);
router.post('/login', authUser);
router.put('/profile', protect, updateUserProfile);
router.delete('/:id',protect,admin,  deleteUser);
router.put('/:id',protect,admin,  updateUserRole);


export default router;