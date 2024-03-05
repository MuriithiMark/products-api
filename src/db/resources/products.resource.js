import query from "../../utils/query.js";
import * as uuid from "uuid";

export async function getProducts() {
    const sqlQuery = `SELECT * FROM products`;
    try {
        const results = await query(sqlQuery)
        return results[0]
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getProductById(productId) {
    const sqlQuery = `SELECT * FROM products WHERE id = ?`;
    try {
        const results = await query(sqlQuery, [productId])
        return results[0]
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getProductsByCategory(categoryName) {
    const sqlQuery = `SELECT * FROM products WHERE category = ?`;
    try {
        const results = await query(sqlQuery, [categoryName])
        return results[0]
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function addProduct(product) {
    const productId = uuid.v4();
    const sqlQuery = `INSERT INTO products (id, name, category, description, imgUrl) VALUES (?, ?, ?, ?, ?)`;

    try {
        const results = await query(sqlQuery, [productId, product.name, product.category, product.description, product.imgUrl]);
        return results
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateProduct(product) {
    const foundProducts = await getProductById(product.id);
    if (foundProducts.length === 0) {
        throw new Error("no such product")
    }
    const updateQuery = `UPDATE products SET id = ?, name = ?, category = ?, description = ?, imgUrl = ? WHERE id = ?`;

    try {
        const results = await query(updateQuery, [product.id, product.name, product.category, product.description, product.imgUrl, foundProducts[0].id])
        return results
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function patchProduct(product) {

}

export async function deleteProduct(productId) {
    const deleteQuery = `DELETE FROM products WHERE id = ?`;
    try {
        const results = await query(deleteQuery, [productId])
        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}