import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import '../utils/passport.js';

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    return token;
}

const googleAuthRoute = express.Router();

googleAuthRoute.use(passport.initialize());
googleAuthRoute.use(passport.session());

googleAuthRoute.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

googleAuthRoute.get('/google/callback', 
    passport.authenticate('google', {
        failureRedirect: '/',
        // successRedirect: 'http://localhost:5173',
    }),
    (req,res)=>{
        const user = req.user;
        const token = generateToken(user.userId);

        const output = {
            token: token,
            diaplayName: user?.displayName,
            email: user?.email,
            dp: user?.dp,
        }

        res.redirect(`https://codelab-harshpx.vercel.app/auth?token=${token}&name=${user?.displayName}&email=${user?.email}&dp=${user?.dp}`);
        // console.log(output);
    }
);

googleAuthRoute.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


export default googleAuthRoute;