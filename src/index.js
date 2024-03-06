import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";

import productsRouter from "./routes/products-router.js";
import authRouter from "./routes/auth-router.js";
import protectedRoute from "./middle-wares/protected-routes.js";

dotenv.config()

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json())
app.use(cookieParser())
app.use(session({secret: "session -secretet"}));
app.use(express.static("public"))

app.use("/auth", authRouter)
app.use("/products", protectedRoute, productsRouter);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
