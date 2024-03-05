import dbConnection from "../db/index.js";

/**
 * @deprecated Switch to `dbConnection.query`
 * @param {string} sql 
 * @param {(string | number)[]} params 
 * @returns {Promise<any>}
 */
export default async function query(sql, params) {
	return await dbConnection.query(sql, params)
}
