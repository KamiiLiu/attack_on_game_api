
import { Router } from "express";
import { sendResetPasswordEmail } from "../controllers/password";

const router = Router();

router.post("/forgot-password", sendResetPasswordEmail);


export default router;