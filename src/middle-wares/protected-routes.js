import { verifyToken } from "../utils/auth.js";

const protectedRoute = async (req, res, next) => {
    const auth_token = req.cookies.auth_token;
    if (!auth_token) {
        return res.status(401).send({ status: 'fail', message: 'unauthorized' }).end()
    }
    try {
        await verifyToken(auth_token);
    } catch (error) {
        console.error(error);
        return res.status(401).send({status: 'fail', message: error.message}).end()
    }
    next()
}

export default protectedRoute;