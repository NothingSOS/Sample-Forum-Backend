import express from "express";
import authController from "../controller/auth.controller";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/verify-email", authController.verifyEmail);
router.post("/verify-user", authController.verifyUser);

export default router;
