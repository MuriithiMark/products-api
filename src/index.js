import express from "express";
import dotenv from "dotenv";

import productsRouter from "./routes/products-router.js";

dotenv.config()

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json())

app.use("/products", productsRouter);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
