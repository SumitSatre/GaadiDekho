import express from "express";
import registerUserController from "../controllers/signup.controller.js";
import loginUserController from "../controllers/login.controller.js";

const router = express.Router();

router.post("/user/signup" , registerUserController);
router.post("/user/login" , loginUserController);

export default router;