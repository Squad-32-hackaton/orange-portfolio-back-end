import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.REDIRECT_URL,
            passReqToCallback: true,
        },
        function (_, __, ___, profile, done) {
            return done(null, profile);
        },
    ),
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
