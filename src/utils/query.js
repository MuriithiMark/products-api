import dbConnection from "../db/index.js";

/**
 * @deprecated Switch to `dbConnection.query`
 * @param {string} sql 
 * @param {(string | number)[]} params 
 * @returns {Promise<any>}
 */
const query =  dbConnection.query

export default query;
