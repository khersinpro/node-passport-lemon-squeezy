import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const prisma = new PrismaClient();

// For base local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          return done(null, false, { message: "Incorrect credentials." });
        }

        if (user.google_id && user.password === null) {
          return done(null, false, { message: "Incorrect credentials" });
        }

        if (user.password === null) {
          return done(null, false, { message: "Incorrect credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: "Incorrect credentials." });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});

// For google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const id = profile.id;
        const email = profile.emails ? profile.emails[0].value : null;
        const username = profile.displayName;

        if (!email) {
          return done(null, false, { message: "Incorrect email." });
        }

        const existingUser = await prisma.user.findUnique({
          where: { google_id: profile.id, email: email },
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await prisma.user.create({
          data: {
            google_id: id,
            email,
            username,
            role: "USER",
          },
        });

        done(null, newUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
