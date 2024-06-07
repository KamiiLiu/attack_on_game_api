
import { Router } from "express";
import { sendResetPasswordEmail, resetPassword, changePassword } from "../controllers/password";
import { jwtAuthenticator } from '../middlewares/auth';
const router = Router();

router.post("/forgot-password", sendResetPasswordEmail);
router.post("/reset-password", resetPassword);
router.post("/change-password", jwtAuthenticator, changePassword);


export default router;