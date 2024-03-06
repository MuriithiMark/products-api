import mysql from "mysql2/promise";
import fs from "node:fs"
import path from "path"

const SCHEMAS_FOLDER = path.join("src", "db", "schemas");

const PRODUCTS_SCHEMA = fs.readFileSync(path.join(SCHEMAS_FOLDER, "products-schema.sql"), { encoding: "utf8" });
const USERS_SCHEMA = fs.readFileSync(path.join(SCHEMAS_FOLDER, "users-schema.sql"), { encoding: "utf8" })

const dbConnection = await mysql.createPool({
    host: 'localhost', // ?? process.env.HOST,
    user: 'developer', //process.env.USER,
    password: 'test-db', //process.env.PASSWORD,
    database: process.env.DATABASE,
})

try {
    // create database
    const newDbQuery = `CREATE DATABASE IF NOT EXISTS products_test_db`;
    await dbConnection.query(newDbQuery);

    // use database
    const usedDbQuery = `USE products_test_db`;
    await dbConnection.query(usedDbQuery);

    // write tables here
    await dbConnection.query(PRODUCTS_SCHEMA);
    await dbConnection.query(USERS_SCHEMA);

} catch (error) {
    console.error(error);
    throw error;
}

export default dbConnection;