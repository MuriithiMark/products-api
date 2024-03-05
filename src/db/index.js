import mysql from "mysql2/promise";
import fs from "node:fs"
import path from "path"

const SQL_SCHEMAS = fs.readFileSync(path.join("src", "db", "schemas.sql"), { encoding: "utf8"});

const dbConnection = await mysql.createPool({
    host: 'localhost', // ?? process.env.HOST,
    user: 'developer', //process.env.USER,
    password: 'test-db', //process.env.PASSWORD,
    database: process.env.DATABASE,
})

try {
    const newDbQuery = `CREATE DATABASE IF NOT EXISTS products_test_db`;
    await dbConnection.query(newDbQuery);
    const usedDbQuery = `USE products_test_db`;
    await dbConnection.query(usedDbQuery);
    // write schemas here
    await dbConnection.query(SQL_SCHEMAS);
    
} catch (error) {
    console.error(error)
}

export default dbConnection;