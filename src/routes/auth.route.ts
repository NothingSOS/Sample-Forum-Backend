import express from "express";

import validateRequest from "../middlewares/validateRequest";
import authController from "../controllers/auth.controller";

import { RequestBodyLogin, RequestBodyRegister, RequestBodyVerifyEmail, RequestBodyVerifyUser } from "../@types/auth.type";

const router = express.Router();

router.post("/login", [validateRequest("body", RequestBodyLogin)], authController.login);
router.post("/register", [validateRequest("body", RequestBodyRegister)], authController.register);
router.post("/verify-email", [validateRequest("body", RequestBodyVerifyEmail)], authController.verifyEmail);
router.post("/verify-user", [validateRequest("body", RequestBodyVerifyUser)], authController.verifyUser);

export default router;
