import express from "express";

import validateRequest from "../middlewares/validateRequest";
import authController from "../controllers/auth.controller";

import { RequestBodyLogin, RequestBodyRegister, RequestBodyVerifyEmail, RequestBodyVerifyUser } from "../@types/auth.type";

const router = express.Router();

router.post("/login", [validateRequest(null, null, RequestBodyLogin)], authController.login);
router.post("/register", [validateRequest(null, null, RequestBodyRegister)], authController.register);
router.post("/verify-email", [validateRequest(null, null, RequestBodyVerifyEmail)], authController.verifyEmail);
router.post("/verify-user", [validateRequest(null, null, RequestBodyVerifyUser)], authController.verifyUser);

export default router;
