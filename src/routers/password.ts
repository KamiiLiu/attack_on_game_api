
import { Router } from "express";
import { sendResetPasswordEmail, resetPassword, changePassword } from "../controllers/password";
import { jwtAuthenticator } from '../middlewares/auth';
const router = Router();

router.post("/sendResetEmail", sendResetPasswordEmail);
router.post("/reset-password", resetPassword);
router.post("/change-password", jwtAuthenticator, changePassword);


export default router;