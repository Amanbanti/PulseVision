import jwt from 'jsonwebtoken';

export const generateToken = (res,userID) =>{
    const token = jwt.sign({userId:userID},process.env.JWT_SECRET
        ,{
            expiresIn: '1d'
        });

    //set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',  // only true in prod
        sameSite: 'none',   // allow cross-site cookies with HTTPS
        maxAge: 1 * 24 * 60 * 60 * 1000
    });
    

}