import { Router } from "express";
import { checkSchema } from "express-validator";

import {
    addProduct,
    deleteProduct,
    getProductById,
    getProducts,
    getProductsByCategory
} from "../db/resources/products.resource.js";
import {
    newProductsSchema,
    updateProductsSchema
} from "../utils/validations/products-schema.js";
import {
    checkForErrorsORData,
    retrieveProductId
} from "../middle-wares/index.js";

const productsRouter = Router()


productsRouter.get("/", async (req, res) => {
    try {
        const products = await getProducts()
        return res.status(200).send({ status: 'success', data: products }).end();
    } catch (error) {
        return res.status(500).send({ status: 'fail', message: error.message }).end()
    }
})

productsRouter.get("/:productId", retrieveProductId, async (req, res) => {
    const productId = req.productId;
    try {
        const products = await getProductById(productId);
        console.log(products)
        if (products.length === 0) {
            return res.status(404).send({ status: 'fail', message: 'no such product' });
        }
        return res.status(200).send({ status: 'success', data: products[0] }).end()
    } catch (error) {
        return res.send(500).send({ status: 'fail', message: error.message }).end()
    }
})

productsRouter.get("/categories/:categoryName", async (req, res) => {
    const categoryName = req.params.categoryName;
    try {
        const products = await getProductsByCategory(categoryName);
        if (products.length === 0) {
            return res.status(400).send({ status: 'fail', message: 'no such category' }).end();
        }
        return res.status(200).send({ status: 'success', data: products }).end();
    } catch (error) {
        return res.status(500).send({ status: 'fail', message: error.message }).end()
    }
})

productsRouter.post("/", checkSchema(newProductsSchema), checkForErrorsORData, async (req, res) => {
    const productData = req.data;
    try {
        const result = await addProduct(productData);
        console.log(result); // FIXME
        return res.status(201).send({ status: 'success', message: 'product created' }).end();
    } catch (error) {
        return res.status(500).send({ status: 'fail', message: error.message }).end()
    }
})

productsRouter.put("/", checkSchema(updateProductsSchema), checkForErrorsORData, (req, res) => {

})

productsRouter.patch("/", (req, res) => {
    const productId = req.productId;
})

productsRouter.delete("/:productId", retrieveProductId, async (req, res) => {
    const productId = req.productId;
    try {
        const result = await deleteProduct(productId);

        return res.status(200).send({ status: 'success', message: 'product deleted' }).end()
    } catch (error) {
        return res.status(500).send({ status: 'fail', message: error.message }).end()
    }
})

export default productsRouter;