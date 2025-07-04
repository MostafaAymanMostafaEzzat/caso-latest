
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/api/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value
    };
    console.log('Google profile:', user);
    return done(null, user);
  })
);

export default passport;

