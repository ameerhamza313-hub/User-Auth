import { Router } from "express";
import authController from "../../controller/auth/index.js";
const authRouter = Router();

authRouter.post("/user/signup", authController.signUp);
authRouter.post("/user/signIn", authController.signIn);

export default authRouter;
