import { Request } from 'express';
import { IUser } from '../models/User';
import { RequestWithUser } from '../types/commonRequest';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

function isRequestWithUser(req: any): req is RequestWithUser {
  return req.user !== undefined;
}

export const getUser = (req: Request) => {
  if (!isRequestWithUser(req)) {
    throw new Error('User not found');
  }
  const user = req.user as IUser;
  return user;
};

export const sendEamilValidationCode = async (
  to: string,
  validationToken: string,
  frontEndUrl: string,
) => {
  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: 'https://developers.google.com/oauthplayground',
  });

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const { token } = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_ADDRESS,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: token,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS as string,
    to,
    subject: 'Reset your password',
    text: `Click the link to reset your password: ${frontEndUrl}/${validationToken}`,
  };

  await transporter.sendMail(mailOptions);
};
