import { Router } from "express";
import { checkSchema } from "express-validator";

import { loginSchema, newUserSchema } from "../utils/validations/users-validations.js";
import { checkForErrorsORData } from "../middle-wares/index.js";
import { loginUser, registerUser } from "../db/resources/users.resources.js";

const authRouter = Router();

authRouter.post("/register", checkSchema(newUserSchema), checkForErrorsORData, async (req, res) => {
    const newUser = req.data;
    try {
        await registerUser(newUser);
        res.send({status: 'success', message: 'user registered'}).end()
    } catch (error) {
        const errorMessage = error.message;
        if(errorMessage === 'user already exists') {
            return res.status(400).send({status: 'fail', message: errorMessage}).end()
        }
        res.status(500).send({status: 'fail', message: error.message}).end()
    }
})

authRouter.post("/login", checkSchema(loginSchema), checkForErrorsORData, async (req, res) => {
    const loginData = req.data;
    try {
        const [user, token]= await loginUser(loginData);
        req.session.user = user;
        res.cookies("auth_token", token);
        res.status(200).send({status: 'success', user}).end()
    } catch (error) {
        const errorMessage = error.message;
        if(errorMessage === 'invalid login details') {
            return res.status(400).send({status: 'fail', message: errorMessage})
        }
        res.status(500).send({status: 'fail', message: error.message}).end()
    }
})

authRouter.get("/logout", (req, res) => {
    res.clearCookie("auth_token");
    res.status(200).send({status: 'success', message: 'user logged out'}).end()
})
export default authRouter;