import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/userModel.js";


passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://codelab-server-harshpx.vercel.app/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        const { id, displayName, email, photos } = profile; 
        try {
            let user = await User.findOne({ userId: id });
            if(!user){
                user = new User({
                    userId: id,
                    displayName,
                    email,
                    dp: photos[0].value,
                });
                await user.save();
            }
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findOne({userId: id});
        done(null, user);
    } catch (error) {
        done(null, id)
    }
});