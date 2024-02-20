import passport, { use } from "passport";
import pkg from "passport";
const { use } = pkg;
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

use(
  new GoogleStrategy(
    {
      clientID: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      callbackURL: "http://www.example.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Dummy function - replace this with your actual implementation
      done(null, {});
    }
  )
);

export default passport;
