
import { Router } from "express";
import { sendResetPasswordEmail, resetPassword } from "../controllers/password";

const router = Router();

router.post("/forgot-password", sendResetPasswordEmail);
router.post("/reset-password", resetPassword);


export default router;