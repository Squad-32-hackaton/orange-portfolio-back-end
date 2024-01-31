import { use, serializeUser, deserializeUser } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.REDIRECT_URL,
            passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
        },
    ),
);

serializeUser(function (user, done) {
    done(null, user);
});

deserializeUser(function (user, done) {
    done(null, user);
});
