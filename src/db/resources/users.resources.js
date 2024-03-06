import * as uuid from "uuid";

import {
    generateToken,
    verifyToken,
    comparePassword,
    hashPassword,
} from "../../utils/auth.js";
import dbConnection from "../index.js";


const registerUser = async (newUser) => {
    // find existing user
    const findUserQuery = `SELECT * FROM users WHERE username = ? OR email = ?`;
    const [results, fields] = await dbConnection.query(findUserQuery, [newUser.username, newUser.email]);
    console.log('Register Results: ', results);
    if(results.length) {
        throw new Error("user already exists")
    }
    const userId = uuid.v4();
    const hashedPassword = await hashPassword(newUser.password);
    try {
        const newUserQuery = `INSERT INTO users (id, username, email, hashedPassword) VALUES (?, ?, ?, ?)`;
        const results = await dbConnection.query(newUserQuery, [userId, newUser.username, newUser.email, hashedPassword]);
        console.log(results)
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


const loginUser = async (loginData) => {
    const findUserQuery = `SELECT * FROM users WHERE username = ?`;
    const [results, fields] = await dbConnection.query(findUserQuery, [loginData.username]);
    if(!results[0].length) {
        throw new Error("no such user");
    }
    console.log('Results: ', results)
    const foundUser = results[0]
    const passwordMatched  = await comparePassword(loginData.password, foundUser.hashedPassword);
    if(!passwordMatched) {
        throw new Error("invalid login details")
    }
    // generate a token

    try {
        // hashed Password from data
        delete foundUser.hashedPassword;
        const token = await generateToken(foundUser);
        return [foundUser, token];
    } catch (error) {
        throw new Error("failed to generate user token")
    }
}


export {
    loginUser,
    registerUser
}