// src/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './config.js';
import prisma from './prisma.js';
import { randomUUID } from 'crypto';

passport.use(
  new GoogleStrategy(
    {
      clientID: config.oauth.google.clientId,
      clientSecret: config.oauth.google.clientSecret,
      callbackURL: config.oauth.google.callbackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleEmail = profile.emails[0].value;
        const googleFirstName = profile.name.givenName || '';
        const googleLastName = profile.name.familyName || '';
        const googleAvatar = profile.photos?.[0]?.value || null;

        let user = await prisma.users.findUnique({
          where: { email: googleEmail },
        });

        if (!user) {

          user = await prisma.users.create({
            data: {
              user_id: randomUUID(),
              email: googleEmail,
              first_name: googleFirstName,
              last_name: googleLastName,
              password: '',
              last_login: new Date(),
              role: 'user',
              is_active: true,
              avatar_url: googleAvatar,
            },
          });
        } else {

          if (user.password && user.password !== '') {

            return done(
              new Error(
                'Dieser Account wurde mit E-Mail/Passwort erstellt. Bitte melde dich mit deinen Zugangsdaten an.',
              ),
              null,
            );
          }

          user = await prisma.users.update({
            where: { user_id: user.user_id },
            data: {
              last_login: new Date(),
              avatar_url: googleAvatar || user.avatar_url,
            },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

export default passport;
