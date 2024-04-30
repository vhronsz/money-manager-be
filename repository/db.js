const mysql = require("mysql2");

const create = () => {
    return mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "",
        database: "auth"
    })
};

//Provide method for executing search Query 
// query : string 
// param : array of object [] 
const searchQuery = async (query, param) => {
    const connection = create();
    return new Promise((resolve, reject) => {
        connection.query(query, [param], function (err, results) {
            let response;
            if (err) {
                reject(err);
            }
            response = results;
            connection.end();
            resolve(response);
        });
    });
}

module.exports = { searchQuery };