
import { Request, Response } from 'express';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';


export const sendResetPasswordEmail = async (req: Request, res: Response) => {
    try {
        const { to } = req.body;

        const OAuth2 = google.auth.OAuth2;

        const oauth2Client = new OAuth2({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectUri: "https://developers.google.com/oauthplayground"
        });

        oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN
        });

        const { token } = await oauth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_ADDRESS,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                accessToken: token
            }
        })

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS as string,
            to,
            subject: "Reset your password",
            text: "Click the link to reset your password"
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ status: true, message: "Email sent" });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ status: false, message: err.message });
    }
}