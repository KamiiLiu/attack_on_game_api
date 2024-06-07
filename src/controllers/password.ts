
import { Request, Response } from 'express';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { getUser } from '@/utils/help';


export const sendResetPasswordEmail = async (req: Request, res: Response) => {
    try {
        const { to } = req.body;

        const user = await User.findOne({ email: to });

        if (!user) {
            res.status(404).json({ status: false, message: "User not found" });
            return;
        }

        const validateCode = Math.floor(100000 + Math.random() * 900000).toString();
        const validationToken = jwt.sign({ email: user.email, emailCode: validateCode }, process.env.JWT_SECRET!, { expiresIn: "1h" });

        user.emailCode = validateCode;
        await user.save();


        await sendEamilValidationCode(to, validationToken);
        res.status(200).json({ status: true, message: "Email sent" });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ status: false, message: err.message });
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { validationToken, newPassword } = req.body;

        type Decoded = {
            email: string,
            emailCode: string
        }

        const decoded = jwt.verify(validationToken, process.env.JWT_SECRET!) as Decoded;
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            res.status(404).json({ status: false, message: "User not found" });
            return;
        }

        if (user.emailCode !== decoded.emailCode) {
            res.status(400).json({ status: false, message: "Invalid code" });
            return;
        }

        console.log(newPassword);
        user.password = await hash(newPassword, 10);
        user.emailCode = "";
        await user.save();

        res.status(200).json({ status: true, message: "Code is valid" });
    }
    catch (err: any) {
        console.error(err);
        res.status(500).json({ status: false, message: err.message });
    }

}

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(getUser(req)._id);

        if (!user) {
            res.status(404).json({ status: false, message: "User not found" });
            return;
        }

        const isPasswordValid = compare(oldPassword, user.password);

        if (!isPasswordValid) {
            res.status(400).json({ status: false, message: "Invalid password" });
            return;
        }

        user.password = await hash(newPassword, 10);
        await user.save();

        res.status(200).json({ status: true, message: "Password changed" });
    }
    catch (err: any) {
        console.error(err);
        res.status(500).json({ status: false, message: err.message });
    }
}



const sendEamilValidationCode = async (to: string, validationToken: string) => {
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
        text: `Click the link to reset your password: http://localhost:5173/#/password/getEmailCode/${validationToken}`
    };

    await transporter.sendMail(mailOptions);

}