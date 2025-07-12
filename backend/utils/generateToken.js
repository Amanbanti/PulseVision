import jwt from 'jsonwebtoken';

export const generateToken = (res,userID) =>{
    const token = jwt.sign({userId:userID},process.env.JWT_SECRET
        ,{
            expiresIn: '1d'
        });

    //set JWT as HTTP-Only cookie
    res.cookie('jwt', token,{
        httpOnly:true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite : 'strict',
        maxAge:1 * 24 * 60 * 1000 //1day
    })

}